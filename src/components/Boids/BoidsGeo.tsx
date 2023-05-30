import { BufferAttribute, BufferGeometry, DoubleSide, Mesh, ShaderMaterial } from 'three'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { boidUniforms } from './BoidsRunner'
import { boidFragmentShader, boidVertexShader } from './Shaders'

export const NUM_BOIDS = 80
export const WIDTH = Math.floor(Math.sqrt(NUM_BOIDS))

export const BOUNDS = 600,
	BOUNDS_HALF = BOUNDS / 2

const SCALE = 0.15

class BoidGeometry extends BufferGeometry {
	constructor() {
		super()

		const trianglesPerBoid = 3
		const triangles = NUM_BOIDS * trianglesPerBoid
		const points = triangles * 3

		const vertices = new BufferAttribute(new Float32Array(points * 3), 3)
		const references = new BufferAttribute(new Float32Array(points * 2), 2)
		const boidVertex = new BufferAttribute(new Float32Array(points), 1)

		this.setAttribute('position', vertices)
		this.setAttribute('reference', references)
		this.setAttribute('boidVertex', boidVertex)

		let v = 0

		function pushVertices(verts: number[]) {
			for (let i = 0; i < verts.length; i += 3) {
				vertices.setXYZ(v, verts[i], verts[i + 1], verts[i + 2])
				v++
			}
		}

		const wingsSpan = 20

		const BODY_BACK = 20
		const BODY_TIP = 30
		const WING_TIP = 15
		for (let f = 0; f < NUM_BOIDS; f++) {
			// Body
			pushVertices([0, -0, -BODY_BACK, 0, 4, -BODY_BACK, 0, 0, BODY_TIP])

			// Wings
			pushVertices([0, 0, -WING_TIP, -wingsSpan, 0, 0, 0, 0, WING_TIP])
			pushVertices([0, 0, WING_TIP, wingsSpan, 0, 0, 0, 0, -WING_TIP])
		}

		for (let v = 0; v < triangles * 3; v++) {
			const triangleIndex = Math.floor(v / 3)
			const boidIndex = Math.floor(triangleIndex / trianglesPerBoid)
			const x = (boidIndex % WIDTH) / WIDTH
			const y = Math.floor(boidIndex / WIDTH) / WIDTH

			references.setXY(v, x, y)
			boidVertex.setX(v, v % 9)
		}

		this.scale(SCALE, SCALE, SCALE)
	}
}

export const BoidsGeo = () => {
	const { scene } = useThree()

	const material = useMemo(
		() =>
			new ShaderMaterial({
				uniforms: boidUniforms,
				vertexShader: boidVertexShader,
				fragmentShader: boidFragmentShader,
				side: DoubleSide,
				transparent: true,
				opacity: 0.1,
			}),
		[]
	)

	useEffect(() => {
		const geometry = new BoidGeometry()

		const boidMesh = new Mesh(geometry, material)
		boidMesh.rotation.y = Math.PI / 2 // face forward
		boidMesh.matrixAutoUpdate = false
		boidMesh.updateMatrix()

		scene.add(boidMesh)

		return () => {
			scene.remove(boidMesh)
			geometry.dispose()
			material.dispose()
		}
	}, [scene, material])

	return null
}
