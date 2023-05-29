import * as THREE from 'three'
import { DataTexture, PerspectiveCamera } from 'three'
import { FC, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { GPUComputationRenderer, Variable } from 'three/examples/jsm/misc/GPUComputationRenderer'
import { BOUNDS, BOUNDS_HALF, WIDTH } from './BoidsGeo'
import {
	BoidUniforms,
	positionShaderUniforms,
	positionTextShader,
	velocityShaderUniforms,
	velocityTextureShader,
} from './Shaders'

let gpuCompute: GPUComputationRenderer
let velocityVariable: Variable
let positionVariable: Variable

let positionUniforms: positionShaderUniforms = {
	time: { value: 1.0 },
	delta: { value: 0.0 },
}

let velocityUniforms: velocityShaderUniforms = {
	time: { value: 1.0 },
	delta: { value: 0.0 },
	testing: { value: 1.0 },
	separationDistance: { value: 20.0 },
	alignmentDistance: { value: 20.0 },
	cohesionDistance: { value: 20.0 },
	freedomFactor: { value: 0.75 },
	predator: { value: new THREE.Vector3() },
}

export const boidUniforms: BoidUniforms = {
	texturePosition: { value: new DataTexture() },
	textureVelocity: { value: new DataTexture() },
	time: { value: 1.0 },
	delta: { value: 0.0 },
}

export const BoidsRunner: FC = () => {
	const { scene, camera, gl, size } = useThree()

	const mouseX = useRef(0)
	const mouseY = useRef(0)

	useEffect(() => {
		gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl)
		if (!gl.capabilities.isWebGL2) {
			gpuCompute.setDataType(THREE.HalfFloatType)
		}

		const dtPosition = gpuCompute.createTexture()
		const dtVelocity = gpuCompute.createTexture()
		setBoidPositions(dtPosition)
		setBoidVelocities(dtVelocity)

		velocityVariable = gpuCompute.addVariable('textureVelocity', velocityTextureShader, dtVelocity)
		positionVariable = gpuCompute.addVariable('texturePosition', positionTextShader, dtPosition)

		gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable])
		gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable])

		positionUniforms = positionVariable.material.uniforms as positionShaderUniforms
		velocityUniforms = velocityVariable.material.uniforms as velocityShaderUniforms

		positionUniforms['time'] = { value: 0.0 }
		positionUniforms['delta'] = { value: 0.0 }

		velocityUniforms['time'] = { value: 1.0 }
		velocityUniforms['delta'] = { value: 0.0 }
		velocityUniforms['testing'] = { value: 1.0 }

		velocityUniforms['separationDistance'] = { value: 20.0 }
		velocityUniforms['alignmentDistance'] = { value: 20.0 }
		velocityUniforms['cohesionDistance'] = { value: 20.0 }
		velocityUniforms['freedomFactor'] = { value: 0.75 }
		velocityUniforms['predator'] = { value: new THREE.Vector3() }

		velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(2)

		velocityVariable.wrapS = THREE.RepeatWrapping
		velocityVariable.wrapT = THREE.RepeatWrapping
		positionVariable.wrapS = THREE.RepeatWrapping
		positionVariable.wrapT = THREE.RepeatWrapping

		const error = gpuCompute.init()

		if (error !== null) {
			console.error(error)
		}
	}, [gl])

	useEffect(() => {
		const handleResize = () => {
			;(camera as PerspectiveCamera).aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			gl.setSize(size.width, size.height)
		}

		const handlePointerMove = (event: PointerEvent) => {
			event.preventDefault()
			mouseX.current = event.clientX
			mouseY.current = event.clientY
		}

		window.addEventListener('resize', handleResize)
		window.addEventListener('pointermove', handlePointerMove)

		return () => {
			window.removeEventListener('resize', handleResize)
			window.removeEventListener('pointermove', handlePointerMove)
		}
	}, [camera, gl, size.height, size.width])

	useFrame((state, delta) => {
		positionUniforms['time'].value = state.clock.elapsedTime
		positionUniforms['delta'].value = delta
		velocityUniforms['time'].value = state.clock.elapsedTime
		velocityUniforms['delta'].value = delta
		boidUniforms['time'].value = state.clock.elapsedTime
		boidUniforms['delta'].value = delta

		const windowHalfX = window.innerWidth / 2
		const windowHalfY = window.innerHeight / 2

		velocityUniforms['predator'].value.set(
			(0.5 * (mouseX.current - windowHalfX)) / windowHalfX,
			(-0.5 * (mouseY.current - windowHalfY)) / windowHalfY,
			0
		)

		gpuCompute.compute()

		boidUniforms['texturePosition'].value = gpuCompute.getCurrentRenderTarget(positionVariable)
			.texture as DataTexture

		boidUniforms['textureVelocity'].value = gpuCompute.getCurrentRenderTarget(velocityVariable)
			.texture as DataTexture

		gl.render(scene, camera)
	})

	return null
}

const PODS = 5
const POD_JITTER = 100
export const setBoidPositions = (texture: DataTexture) => {
	const data = texture.image.data

	const podLocations = []
	for (let i = 0; i < PODS; i++) {
		podLocations.push({
			x: Math.random() * BOUNDS - BOUNDS_HALF,
			y: Math.random() * BOUNDS - BOUNDS_HALF,
			z: Math.random() * BOUNDS - BOUNDS_HALF,
		})
	}

	for (let k = 0, kl = data.length; k < kl; k += 4) {
		const pod = Math.floor(Math.random() * PODS)

		// set location + jitter
		const x = podLocations[pod].x + Math.random() * POD_JITTER - POD_JITTER / 2
		const y = podLocations[pod].y + Math.random() * POD_JITTER - POD_JITTER / 2
		const z = podLocations[pod].z + Math.random() * POD_JITTER - POD_JITTER / 2

		data[k + 0] = x
		data[k + 1] = y
		data[k + 2] = z
		data[k + 3] = 1
	}
}

export const setBoidVelocities = (texture: DataTexture) => {
	const data = texture.image.data

	const podVelocities = []
	for (let i = 0; i < PODS; i++) {
		podVelocities.push({
			x: Math.random() - 0.5,
			y: Math.random() - 0.5,
			z: Math.random() - 0.5,
		})
	}

	for (let k = 0, kl = data.length; k < kl; k += 4) {
		const pod = Math.floor(Math.random() * PODS)

		// set velocity + randomness
		const x = podVelocities[pod].x * 10 + Math.random() * 0.5 - 0.25
		const y = podVelocities[pod].y * 10 + Math.random() * 0.5 - 0.25
		const z = podVelocities[pod].z * 10 + Math.random() * 0.5 - 0.25

		data[k + 0] = x
		data[k + 1] = y
		data[k + 2] = z
		data[k + 3] = 1
	}
}
