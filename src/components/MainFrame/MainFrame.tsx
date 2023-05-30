import { FC, PropsWithChildren, useEffect, useState } from 'react'
import styles from './MainFrame.module.scss'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { Canvas, useFrame } from '@react-three/fiber'
import { ShaderMaterial } from 'three'
import { Plane } from '@react-three/drei'
import { Section } from '../../reducers/CurrentSection'
import { BoidsGeo, BoidsRunner } from '../Boids'

export interface MainFrameProps extends PropsWithChildren {}

export const MainFrame: FC<MainFrameProps> = (props) => {
	const currentSection = useSelector((state: RootState) => state.currentSection)

	return (
		<div className={styles.container}>
			{props.children}
			<nav className={styles.nav}>
				<ul>
					<li>
						<a href={'https://github.com/NickXitco'}>Github</a>
					</li>
					<li>
						<a href={'https://www.linkedin.com/in/nick-xitco-842277169/'}>LinkedIn</a>
					</li>
					<li>
						<a href={'#workwithme'}>email</a>
					</li>
					<li>
						<a href={'#home'}>top</a>
					</li>
				</ul>
			</nav>
			<div className={styles.floater}>
				<div
					className={styles.canvas}
					style={{
						filter: getFilter(currentSection.value),
					}}
				>
					<img
						aria-hidden={'true'}
						src={'https://nickxitcoportfolio.imgix.net/grain.png'}
						alt={''}
						className={styles.grain_texture}
					/>
					<Canvas camera={{ position: [0, 0, 350], fov: 75, near: 1, far: 3000 }}>
						<SwimmingPool />
						<fog attach="fog" args={[0xffffff, 100, 1000]} />
						<BoidsRunner />
						<BoidsGeo />
					</Canvas>
				</div>
			</div>
		</div>
	)
}

const getFilter = (hoveredLink: Section) => {
	switch (hoveredLink) {
		case 'about':
			return 'brightness(0.7) hue-rotate(60deg)'
		case 'developer':
			return 'brightness(0.7) hue-rotate(-20deg) saturate(0.5)'
		case 'performer':
			return 'brightness(0.75) hue-rotate(5deg)'
		case 'workwithme':
			return 'brightness(0.7) hue-rotate(-50deg)'
		case 'home':
		default:
			return 'brightness(0.7) hue-rotate(0deg)'
	}
}

const GradientShader = {
	uniforms: {
		time: { value: 1.0 },
	},
	vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    
    float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
	vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
	vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
	
	float noise(vec3 p){
	    vec3 a = floor(p);
	    vec3 d = p - a;
	    d = d * d * (3.0 - 2.0 * d);
	
	    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
	    vec4 k1 = perm(b.xyxy);
	    vec4 k2 = perm(k1.xyxy + b.zzww);
	
	    vec4 c = k2 + a.zzzz;
	    vec4 k3 = perm(c);
	    vec4 k4 = perm(c + 1.0);
	
	    vec4 o1 = fract(k3 * (1.0 / 41.0));
	    vec4 o2 = fract(k4 * (1.0 / 41.0));
	
	    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
	    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
	
	    return o4.y * d.y + o4.x * (1.0 - d.y);
	}

    void main() {
	    // Get the texture coordinates
	    vec2 uv = vUv;

		float timeScaled = time / 5.0;
	    float r = noise(vec3(uv, timeScaled));
	    float g = noise(vec3(uv + 1.0, timeScaled));
	    float b = 1.0;
 	    	    
	    gl_FragColor = vec4(r, g, b, 1.0);
    }
  `,
}

export const SWIMMING_POOL_Z = -700
const SWIMMING_POOL_WIDTH = 4000
const SwimmingPool = () => {
	const [shaderMaterial, setShaderMaterial] = useState<ShaderMaterial>()

	useEffect(() => {
		setShaderMaterial(new ShaderMaterial(GradientShader))
	}, [])

	useFrame(({ clock }) => {
		if (shaderMaterial) {
			shaderMaterial.uniforms.time.value = clock.getElapsedTime() % 10000
		}
	})

	return shaderMaterial ? (
		<Plane
			args={[SWIMMING_POOL_WIDTH, SWIMMING_POOL_WIDTH, 10, 10]}
			material={shaderMaterial}
			position={[0, 0, SWIMMING_POOL_Z]}
		/>
	) : null
}
