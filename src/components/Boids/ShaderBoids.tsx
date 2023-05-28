import {
	BufferAttribute,
	BufferGeometry,
	Color,
	DataTexture,
	DoubleSide,
	Mesh,
	MeshBasicMaterial,
	ShaderMaterial,
	SphereGeometry,
	Vector3,
} from 'three'
import { useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { boidUniforms } from './Boids'

export type positionShaderUniforms = {
	time: { value: number }
	delta: { value: number }
}

export const positionShader = `

    uniform float time;
    uniform float delta;
    
    void main() {

        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec4 tmpPos = texture2D( texturePosition, uv );
        vec3 position = tmpPos.xyz;
        vec3 velocity = texture2D( textureVelocity, uv ).xyz;

        float phase = tmpPos.w;

        phase = mod( ( phase + delta +
                length( velocity.xz ) * delta * 3. +
                max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

        gl_FragColor = vec4( position + velocity * delta * 15. , phase );
    }
`

export type velocityShaderUniforms = {
	time: { value: number }
	testing: { value: number }
	delta: { value: number }
	separationDistance: { value: number }
	alignmentDistance: { value: number }
	cohesionDistance: { value: number }
	freedomFactor: { value: number }
	predator: { value: Vector3 }
}
export const velocityShader = `
            uniform float time;
            uniform float testing;
            uniform float delta; // about 0.016
            uniform float separationDistance; // 20
            uniform float alignmentDistance; // 40
            uniform float cohesionDistance; //
            uniform float freedomFactor;
            uniform vec3 predator;

            const float width = resolution.x;
            const float height = resolution.y;

            const float PI = 3.141592653589793;
            const float PI_2 = PI * 2.0;
            // const float VISION = PI * 0.55;

            float zoneRadius = 40.0;
            float zoneRadiusSquared = 1600.0;

            float separationThresh = 0.45;
            float alignmentThresh = 0.65;

            const float UPPER_BOUNDS = BOUNDS;
            const float LOWER_BOUNDS = -UPPER_BOUNDS;

            const float SPEED_LIMIT = 9.0;

            float rand( vec2 co ){
                return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
            }

            void main() {

                zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
                separationThresh = separationDistance / zoneRadius;
                alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
                zoneRadiusSquared = zoneRadius * zoneRadius;


                vec2 uv = gl_FragCoord.xy / resolution.xy;
                vec3 boidPosition, boidVelocity;

                vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
                vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

                float dist;
                vec3 dir; // direction
                float distSquared;

                float separationSquared = separationDistance * separationDistance;
                float cohesionSquared = cohesionDistance * cohesionDistance;

                float f;
                float percent;

                vec3 velocity = selfVelocity;

                float limit = SPEED_LIMIT;

                dir = predator * UPPER_BOUNDS - selfPosition;
                dir.z = 0.;
                // dir.z *= 0.6;
                dist = length( dir );
                distSquared = dist * dist;

                float preyRadius = 150.0;
                float preyRadiusSq = preyRadius * preyRadius;


                // move boids away from predator
                if ( dist < preyRadius ) {

                    f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
                    velocity += normalize( dir ) * f;
                    limit += 5.0;
                }

                // Attract flocks to the center
                vec3 central = vec3( 0., 0., 0. );
                dir = selfPosition - central;
                dist = length( dir );

                dir.y *= 2.5;
                velocity -= normalize( dir ) * delta * 5.;

                for ( float y = 0.0; y < height; y++ ) {
                    for ( float x = 0.0; x < width; x++ ) {

                        vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
                        boidPosition = texture2D( texturePosition, ref ).xyz;

                        dir = boidPosition - selfPosition;
                        dist = length( dir );

                        if ( dist < 0.0001 ) continue;

                        distSquared = dist * dist;

                        if ( distSquared > zoneRadiusSquared ) continue;

                        percent = distSquared / zoneRadiusSquared;

                        if ( percent < separationThresh ) { // low

                            // Separation - Move apart for comfort
                            f = ( separationThresh / percent - 1.0 ) * delta;
                            velocity -= normalize( dir ) * f;

                        } else if ( percent < alignmentThresh ) { // high

                            // Alignment - fly the same direction
                            float threshDelta = alignmentThresh - separationThresh;
                            float adjustedPercent = ( percent - separationThresh ) / threshDelta;

                            boidVelocity = texture2D( textureVelocity, ref ).xyz;

                            f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
                            velocity += normalize( boidVelocity ) * f;

                        } else {

                            // Attraction / Cohesion - move closer
                            float threshDelta = 1.0 - alignmentThresh;
                            float adjustedPercent;
                            if( threshDelta == 0. ) adjustedPercent = 1.;
                            else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

                            f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

                            velocity += normalize( dir ) * f;

                        }

                    }

                }

                // Speed Limits
                if ( length( velocity ) > limit ) {
                    velocity = normalize( velocity ) * limit;
                }

                gl_FragColor = vec4( velocity, 1.0 );

            }
`

export type BoidUniforms = {
	texturePosition: { value: DataTexture }
	textureVelocity: { value: DataTexture }
	time: { value: number }
	delta: { value: number }
}

export const boidVS = `
            attribute vec2 reference;
            attribute float boidVertex;

            uniform sampler2D texturePosition;
            uniform sampler2D textureVelocity;

            varying vec4 vColor;
            varying float z;

            uniform float time;

            void main() {

                vec4 tmpPos = texture2D( texturePosition, reference );
                vec3 pos = tmpPos.xyz;
                vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);

                vec3 newPosition = position;

                if ( boidVertex == 4.0 || boidVertex == 7.0 ) {
                    // flap wings
                    newPosition.y = sin( tmpPos.w ) * 5.;
                }

                newPosition = mat3( modelMatrix ) * newPosition;


                velocity.z *= -1.;
                float xz = length( velocity.xz );
                float xyz = 1.;
                float x = sqrt( 1. - velocity.y * velocity.y );

                float cosry = velocity.x / xz;
                float sinry = velocity.z / xz;

                float cosrz = x / xyz;
                float sinrz = velocity.y / xyz;

                mat3 maty =  mat3(
                    cosry, 0, -sinry,
                    0    , 1, 0     ,
                    sinry, 0, cosry

                );

                mat3 matz =  mat3(
                    cosrz , sinrz, 0,
                    -sinrz, cosrz, 0,
                    0     , 0    , 1
                );

                newPosition =  maty * matz * newPosition;
                newPosition += pos;

                z = newPosition.z;

                gl_Position = projectionMatrix *  viewMatrix  * vec4( newPosition, 1.0 );
            }
`

export const boidFS = `
            varying vec4 vColor;
            varying float z;

            uniform vec3 color;

            void main() {
                gl_FragColor = vec4( 0.2, 0.4, 1.0, 1.0 );
                gl_FragColor.a = 0.25;
            }
`

export const NUM_BOIDS = 400
export const WIDTH = Math.floor(Math.sqrt(NUM_BOIDS))

export const BOUNDS = 800,
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

		for (let f = 0; f < NUM_BOIDS; f++) {
			// Body
			pushVertices([0, -0, -20, 0, 4, -20, 0, 0, 30])

			// Wings
			pushVertices([0, 0, -15, -wingsSpan, 0, 0, 0, 0, 15])
			pushVertices([0, 0, 15, wingsSpan, 0, 0, 0, 0, -15])
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
				vertexShader: boidVS,
				fragmentShader: boidFS,
				side: DoubleSide,
				transparent: true,
				opacity: 0.1,
			}),
		[]
	)

	useEffect(() => {
		const geometry = new BoidGeometry()

		const boidMesh = new Mesh(geometry, material)
		//boidMesh.rotation.y = Math.PI / 2
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
