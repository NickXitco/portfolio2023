import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export interface FadeInCenterProps extends PropsWithChildren {}

export const FadeInCenter: FC<FadeInCenterProps> = (props) => {
	const [visible, setVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const lowFPS = useSelector((state: RootState) => state.lowFPS)

	useEffect(() => {
		const scrollHandler = () => {
			if (!ref.current) return
			const top = ref.current.getBoundingClientRect().top
			const threeQuarters = window.innerHeight * 0.75

			setVisible(top < threeQuarters)
		}

		window.addEventListener('scroll', scrollHandler, { passive: true })
		return () => {
			window.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	if (lowFPS.value) {
		return <>{props.children}</>
	}

	return (
		<div
			ref={ref}
			style={{
				transition: 'all 0.5s ease-in-out',
				opacity: visible ? 1 : 0,
				transform: visible ? 'translate3d(0,0,0)' : 'translate3d(0,2rem,0)',
			}}
		>
			{props.children}
		</div>
	)
}
