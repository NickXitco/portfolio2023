import { Boid } from './Boids'
import * as THREE from 'three'

const CAPACITY = 8
export const createOctree = (boids: Boid[]) => {
	// get maximal bounding box
	const box = new THREE.Box3()
	for (const boid of boids) {
		box.expandByPoint(boid.position)
	}

	// create octree
	const octree: OctreeNode = {
		boids: [],
		children: [],
		boundingBox: box,
	}

	// insert boids
	for (const boid of boids) {
		insertBoid(boid, octree)
	}

	return octree
}

export type OctreeNode = {
	boids: Boid[]
	children: OctreeNode[]
	boundingBox: THREE.Box3
}

const insertBoid = (boid: Boid, node: OctreeNode) => {
	if (node.children.length > 0) {
		for (const child of node.children) {
			if (child.boundingBox.containsPoint(boid.position)) {
				insertBoid(boid, child)
				return
			}
		}
	}

	node.boids.push(boid)
	if (node.boids.length > CAPACITY) {
		subdivide(node)
	}
}

const subdivide = (node: OctreeNode) => {
	const { boundingBox } = node
	const { min, max } = boundingBox
	const center = boundingBox.getCenter(new THREE.Vector3())

	const children: OctreeNode[] = []
	for (let x = 0; x < 2; x++) {
		for (let y = 0; y < 2; y++) {
			for (let z = 0; z < 2; z++) {
				const child = {
					boids: [],
					children: [],
					boundingBox: new THREE.Box3(),
				}
				child.boundingBox.min.set(
					x === 0 ? min.x : center.x,
					y === 0 ? min.y : center.y,
					z === 0 ? min.z : center.z
				)
				child.boundingBox.max.set(
					x === 0 ? center.x : max.x,
					y === 0 ? center.y : max.y,
					z === 0 ? center.z : max.z
				)
				children.push(child)
			}
		}
	}

	node.children = children

	for (const item of node.boids) {
		insertBoid(item, node)
	}

	node.boids = []
}

export const getAllBoids = (node: OctreeNode, boids: Boid[] = []) => {
	boids.push(...node.boids)
	for (const child of node.children) {
		getAllBoids(child, boids)
	}
	return boids
}

export const searchRadius = (node: OctreeNode, position: THREE.Vector3, radius: number, boids: Boid[] = []) => {
	if (node.boundingBox.distanceToPoint(position) > radius) {
		return boids
	}

	boids.push(...node.boids)
	for (const child of node.children) {
		searchRadius(child, position, radius, boids)
	}
	return boids
}
