import * as THREE from 'three'
import { createRef, FC, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { createOctree, getAllBoids, OctreeNode, searchRadius } from './Octree'
import { fisherYates } from '../../utils/fisherYates'

export type Boid = {
	position: THREE.Vector3
	velocity: THREE.Vector3
	acceleration: THREE.Vector3
	r: number
	maxSpeed: number
	maxForce: number
}

const createBoid = (): Boid => ({
	position: new THREE.Vector3(Math.random() * 1000 - 500, Math.random() * 1000 - 500, -Math.random() * 400 - 100),
	velocity: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
	acceleration: new THREE.Vector3(0, 0, 0),
	r: 2.0,
	maxSpeed: 2.0,
	maxForce: 0.05,
})

export type Flock = Boid[]

const createFlock = (count: number): Flock => {
	let flock: Flock = []
	for (let i = 0; i < count; i++) {
		flock.push(createBoid())
	}
	return flock
}

interface BoidsProps {
	count: number
}

export const Boids: FC<BoidsProps> = (props) => {
	const { camera } = useThree()

	const flockRef = useRef(createFlock(props.count))
	const meshRefs = useRef(flockRef.current.map(() => createRef<THREE.Mesh>()))

	const mouse = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0))

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			event.preventDefault()

			const tempMouse = new THREE.Vector2()
			tempMouse.x = (event.clientX / window.innerWidth) * 2 - 1
			tempMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

			const raycaster = new THREE.Raycaster()
			raycaster.setFromCamera(tempMouse, camera)

			const planeGeometry = new THREE.PlaneGeometry(10000, 10000)
			const planeMesh = new THREE.Mesh(planeGeometry)
			planeMesh.position.set(0, 0, -700)

			const intersects = raycaster.intersectObject(planeMesh, true)

			if (intersects.length > 0) {
				mouse.current.copy(intersects[0].point)
			}
		}

		window.addEventListener('mousemove', handleMouseMove, false)
		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [camera])

	useFrame(() => {
		const octree = createOctree(flockRef.current)
		flockRef.current = flockRef.current.map((boid, i) => {
			boid = applyFlockRules(boid, octree, mouse.current, camera.position)
			boid = updateBoid(boid)

			meshRefs.current[i].current!.position.copy(boid.position)
			meshRefs.current[i].current!.lookAt(meshRefs.current[i].current!.position.clone().add(boid.velocity))

			return boid
		})
	})

	return (
		<>
			{flockRef.current.map((_, i) => (
				<mesh key={i} ref={meshRefs.current[i]}>
					<coneBufferGeometry attach="geometry" args={[1, 2, 8]} />
					<meshBasicMaterial
						attach="material"
						color={'#5f5af5'}
						opacity={0.5}
						transparent={true}
						wireframe={true}
					/>
				</mesh>
			))}
		</>
	)
}

// Separation
// Method checks for nearby boids and steers away
const separate = (boid: Boid, flock: Flock) => {
	const desiredSeparation = 25.0
	const steer = new THREE.Vector3(0, 0, 0)
	let count = 0

	// For every boid in the system, check if it's too close
	for (let i = 0; i < flock.length; i++) {
		let d = boid.position.distanceTo(flock[i].position)

		// If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
		if (d > 0 && d < desiredSeparation) {
			// Calculate vector pointing away from neighbor
			let diff = boid.position.clone().sub(flock[i].position)
			diff.normalize()
			diff.divideScalar(d) // Weight by distance
			steer.add(diff)
			count++ // Keep track of how many
		}
	}

	// Average -- divide by how many
	if (count > 0) {
		steer.divideScalar(count)
	}

	// As long as the vector is greater than 0
	if (steer.length() > 0) {
		// Implement Reynolds: Steering = Desired - Velocity
		steer.normalize()
		steer.multiplyScalar(boid.maxSpeed)
		steer.sub(boid.velocity)
		steer.clampLength(0, boid.maxForce)
	}

	return steer
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
const align = (boid: Boid, flock: Flock) => {
	const neighbordist = 50
	const sum = new THREE.Vector3(0, 0, 0)
	let count = 0
	for (let i = 0; i < flock.length; i++) {
		let d = boid.position.distanceTo(flock[i].position)
		if (d > 0 && d < neighbordist) {
			sum.add(flock[i].velocity)
			count++
		}
	}
	if (count > 0) {
		sum.divideScalar(count)
		sum.normalize()
		sum.multiplyScalar(boid.maxSpeed)
		let steer = sum.sub(boid.velocity)
		steer.clampLength(0, boid.maxForce)
		return steer
	} else {
		return new THREE.Vector3(0, 0, 0)
	}
}

// For the average position of all nearby boids, calculate steering vector towards that position
const cohesion = (boid: Boid, flock: Flock) => {
	const neighbordist = 50
	const sum = new THREE.Vector3(0, 0, 0)
	let count = 0
	for (let i = 0; i < flock.length; i++) {
		let d = boid.position.distanceTo(flock[i].position)
		if (d > 0 && d < neighbordist) {
			sum.add(flock[i].position)
			count++
		}
	}
	if (count > 0) {
		sum.divideScalar(count)
		return seek(boid, sum)
	} else {
		return new THREE.Vector3(0, 0, 0)
	}
}

const seek = (boid: Boid, target: THREE.Vector3) => {
	const desired = target.clone().sub(boid.position) // A vector pointing from the position to the target
	desired.normalize()
	desired.multiplyScalar(boid.maxSpeed)
	const steer = desired.sub(boid.velocity)
	steer.clampLength(0, boid.maxForce)
	return steer
}

const avoidObstacle = (boid: Boid, linePoint1: THREE.Vector3, linePoint2: THREE.Vector3) => {
	const steer = new THREE.Vector3(0, 0, 0)

	const lineDirection = linePoint2.clone().sub(linePoint1).normalize()
	const vecFromLinePoint1ToBoid = boid.position.clone().sub(linePoint1)

	const projectionLength = vecFromLinePoint1ToBoid.dot(lineDirection)
	const projectionPoint = linePoint1.clone().add(lineDirection.multiplyScalar(projectionLength))

	const distanceToLine = boid.position.distanceTo(projectionPoint)

	const desiredSeparation = 50.0

	if (distanceToLine < desiredSeparation) {
		const diff = boid.position.clone().sub(projectionPoint)
		diff.normalize()
		diff.divideScalar(distanceToLine)
		steer.add(diff)
	}

	if (steer.length() > 0) {
		steer.normalize()
		steer.multiplyScalar(boid.maxSpeed)
		steer.sub(boid.velocity)
		steer.clampLength(0, boid.maxForce)
	}

	return steer
}
const applyForce = (boid: Boid, force: THREE.Vector3) => {
	const boidCopy = { ...boid }
	boidCopy.acceleration.add(force)
	return boidCopy
}

const updateBoid = (boid: Boid) => {
	// Update velocity
	boid.velocity.add(boid.acceleration)

	// Limit speed
	boid.velocity.clampLength(0, boid.maxSpeed)

	boid.position.add(boid.velocity)

	// Reset acceleration to 0 each cycle
	boid.acceleration.multiplyScalar(0)
	return boid
}

const applyBoundaryForce = (
	boid: Boid,
	minX: number,
	maxX: number,
	minY: number,
	maxY: number,
	minZ: number,
	maxZ: number
) => {
	const force = new THREE.Vector3(0, 0, 0)
	const padding = 100 // How close boids can get to the edge before being pushed back
	const pushForce = 0.1 // How hard boids are pushed back

	if (boid.position.x < minX + padding) force.x = pushForce
	else if (boid.position.x > maxX - padding) force.x = -pushForce

	if (boid.position.y < minY + padding) force.y = pushForce
	else if (boid.position.y > maxY - padding) force.y = -pushForce

	if (boid.position.z < minZ + padding) force.z = pushForce
	else if (boid.position.z > maxZ - padding) force.z = -pushForce

	return applyForce(boid, force)
}

const MAX_NEIGHBORS = 20
const applyFlockRules = (boid: Boid, octree: OctreeNode, linePoint1: THREE.Vector3, linePoint2: THREE.Vector3) => {
	const radius = 50
	const neighbors: Flock = searchRadius(octree, boid.position, radius)

	// shuffle and slice neighbors to be at most MAX_NEIGHBORS
	const shuffled = fisherYates(neighbors)
	const flock = shuffled.slice(0, MAX_NEIGHBORS)

	// boid = applyForce(boid, separate(boid, flock).multiplyScalar(1.2))
	// boid = applyForce(boid, align(boid, flock).multiplyScalar(1.3))
	// boid = applyForce(boid, cohesion(boid, flock).multiplyScalar(1.0))
	boid = applyForce(boid, avoidObstacle(boid, linePoint1, linePoint2))
	boid = applyBoundaryForce(boid, -400, 400, -400, 400, -600, 0)

	return boid
}
