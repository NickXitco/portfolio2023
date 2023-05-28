import { FC, useEffect, useRef } from 'react'
import styles from './Performer.module.scss'
import { getElementOffsetRelativeToRoot } from '../../utils/boundingBoxHelpers'
import { map } from '../../utils/mathUtils'
import newsies from '../../assets/newsies.webm'
import elf from '../../assets/elf.webm'
import something_rotten from '../../assets/something_rotten.webm'
import vc from '../../assets/vc.webm'
import holidayinn from '../../assets/holiday inn.webm'
import cabaret from '../../assets/cabaret.webm'
import pippin from '../../assets/pippin.webm'
import { FancyScrollSection } from '../FancyScrollSection'

export interface PerformerProps {}

export const Performer: FC<PerformerProps> = (props) => {
	const containerRef = useRef<HTMLDivElement>(null)
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
		}

		window.addEventListener('scroll', scrollHandler, { passive: true })

		return () => {
			window.removeEventListener('scroll', scrollHandler)
		}
	}, [])

	return (
		<FancyScrollSection
			title={'Performer'}
			description={
				<>
					<p>
						I'm a pianist of 20 years, and have been slowly collecting an armada of instrumental skills over
						my life. I've been music directing and acting for several years now, with credits in all sorts
						of theatre in Baltimore and Austin.
					</p>
					<p>
						Keep scrolling to check out some of my projects, or look at my <a href={'google.com'}>resume</a>
						.
					</p>
				</>
			}
			cards={[
				{
					title: 'Newsies',
					description: 'Zilker Theatre Productions',
					link: '/project/newsies',
					video: newsies,
				},
				{
					title: 'Elf',
					description: 'Georgetown Palace Theatre',
					link: '/project/elf',
					video: elf,
				},
				{
					title: 'Vocal Chords',
					description: 'Johns Hopkins University',
					link: '/project/vc',
					video: vc,
				},
				{
					title: 'Something Rotten',
					description: 'Georgetown Palace Theatre',
					link: '/project/something_rotten',
					video: something_rotten,
				},
				{
					title: 'Holiday Inn',
					description: 'Georgetown Palace Theatre',
					link: '/project/holiday_inn',
					video: holidayinn,
				},
				{
					title: 'Cabaret',
					description: 'JHU Barnstormers',
					link: '/project/cabaret',
					video: cabaret,
				},
				{
					title: 'Pippin',
					description: 'JHU Barnstormers',
					link: '/project/pippin',
					video: pippin,
				},
			]}
		/>
	)
}