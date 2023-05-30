import { FC, Fragment, ReactNode, useEffect, useRef } from 'react'
import styles from './FancyScrollSection.module.scss'
import { getElementOffsetRelativeToRoot } from '../../utils/boundingBoxHelpers'
import { map } from '../../utils/mathUtils'
import { Link } from 'react-router-dom'

export interface FancyScrollSectionProps {
	title: ReactNode
	description: ReactNode
	cards: FancyCardProps[]
}

export const FancyScrollSection: FC<FancyScrollSectionProps> = (props) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLUListElement>(null)

	useEffect(() => {
		const scrollHandler = () => {
			const scrollY = window.scrollY
			const container = containerRef.current
			const list = listRef.current
			if (!container || !list) return

			const offsetStart = getElementOffsetRelativeToRoot(container)
			const offsetStop = offsetStart + container.offsetHeight + window.innerHeight

			const offsetPercentage = map(scrollY, offsetStart, offsetStop, 0.25, 2)

			const PARALLAX_AMPLITUDE = 300
			const parallax = PARALLAX_AMPLITUDE * map(scrollY, offsetStart, offsetStop, -0.5, 1)

			listRef.current.style.setProperty('--scroll-percentage', 100 * (1 - offsetPercentage) + '%')

			const innerWidth = window.innerWidth

			for (let i = 0; i < Array.from(list.children).length; i++) {
				const child = Array.from(list.children)[i]
				const li = child as HTMLLIElement
				const liBoundingRect = li.getBoundingClientRect()
				const width = liBoundingRect.width
				const xCenter = liBoundingRect.left + width / 2
				const xThrough = map(xCenter, -width, innerWidth + width, -1, 1)

				const amplitude = 1000
				const yOffset = (Math.cos(xThrough) - 1) * -amplitude
				const rotationModifier = 18600 / (window.innerWidth + 1000) + 2.5
				const rotation = Math.sin(-xThrough) * -Math.PI * rotationModifier

				li.style.transform = `translateY(${yOffset + parallax}px) rotate(${rotation}deg)`
			}
		}

		window.addEventListener('scroll', scrollHandler, { passive: true })

		return () => {
			window.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.main_text} ref={textRef}>
				<h2>{props.title}</h2>
				{props.description}
			</div>
			<div className={styles.super_fancy_window}>
				<ul className={styles.super_fancy_card_list} ref={listRef}>
					{props.cards.map((card, index) => {
						return (
							<Fragment key={index}>
								<FancyCard {...card} />
							</Fragment>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

interface FancyCardProps {
	title: string
	description: string
	video?: string
	picture?: string
	link: string
}

const FancyCard: FC<FancyCardProps> = (props) => (
	<li className={styles.card}>
		<Link to={props.link}>
			{props.picture ? <img src={props.picture} alt={props.title} /> : null}
			{props.video ? <video src={props.video + '?fm=mp4&res=low'} muted autoPlay loop playsInline /> : null}
			<div className={styles.text}>
				<h3>{props.title}</h3>
				<h4>{props.description}</h4>
			</div>
		</Link>
	</li>
)
