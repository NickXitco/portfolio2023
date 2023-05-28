import { FC, useEffect } from 'react'
import styles from './Homepage.module.scss'
import { AboutMe } from '../AboutMe'
import { Development } from '../Development'
import { Performer } from '../Performer'
import { WorkWithMe } from '../WorkWithMe'
import { Home } from '../Home'
import { Section, setCurrentSection } from '../../reducers/CurrentSection'
import { getVisibleAmount } from '../../utils/boundingBoxHelpers'
import { useDispatch } from 'react-redux'

export interface HomepageProps {}

export const Homepage: FC<HomepageProps> = (props) => {
	const appDispatch = useDispatch()
	useEffect(() => {
		const scrollHandler = () => {
			let mostVisibleSection: Section = 'home'
			let mostVisibleSectionPixels = 0

			const sections: Section[] = ['home', 'about', 'developer', 'performer', 'workwithme']

			for (const section of sections) {
				const _section = document.getElementById(section)
				if (!_section) continue
				const amount = getVisibleAmount(_section)
				if (amount > mostVisibleSectionPixels) {
					mostVisibleSection = section
					mostVisibleSectionPixels = amount
				}
			}

			appDispatch(setCurrentSection(mostVisibleSection))
		}

		window.addEventListener('scroll', scrollHandler, { passive: true })

		return () => {
			window.removeEventListener('scroll', scrollHandler)
		}
	}, [appDispatch])

	return (
		<div className={styles.container}>
			<section id={'home'}>
				<Home />
			</section>
			<section id={'about'}>
				<AboutMe />
			</section>
			<section id={'developer'}>
				<Development />
			</section>
			<section id={'performer'}>
				<Performer />
			</section>
			<section id={'workwithme'}>
				<WorkWithMe />
			</section>
		</div>
	)
}
