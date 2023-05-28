import { FC, Fragment, ReactNode, useEffect, useRef } from 'react'
import styles from './FancyScrollSection.module.scss'
import { getElementOffsetRelativeToRoot } from '../../utils/boundingBoxHelpers'
import { map } from '../../utils/mathUtils'
import artistOBSVideo from '../../assets/artistobs.webm'
import eightsleep from '../../assets/eightsleep.webm'
import artfullyscripted from '../../assets/artfully scripted.webm'
import eoy from '../../assets/eoy.webm'
import waffle from '../../assets/waffle.webm'
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

			const scrollPercentage = map(scrollY, offsetStart, offsetStop, 0.25, 2)

			listRef.current.style.setProperty('--scroll-percentage', 100 * (1 - scrollPercentage) + '%')

			const innerWidth = window.innerWidth

			for (let i = 0; i < Array.from(list.children).length; i++) {
				const child = Array.from(list.children)[i]
				const li = child as HTMLLIElement
				const liBoundingRect = li.getBoundingClientRect()
				const width = liBoundingRect.width
				const xCenter = liBoundingRect.left + width / 2
				const xThrough = map(xCenter, -width, innerWidth + width, -1, 1)

				const amplitude = 600
				const yOffset = (Math.cos(xThrough) - 1) * -amplitude
				const rotation = Math.sin(-xThrough) * -Math.PI * 4

				li.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`
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
			{props.video ? <video src={props.video} muted autoPlay loop playsInline /> : null}
			<div className={styles.text}>
				<h3>{props.title}</h3>
				<h4>{props.description}</h4>
			</div>
		</Link>
	</li>
)