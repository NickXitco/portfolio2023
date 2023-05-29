import { FC, LegacyRef, PropsWithRef } from 'react'
import styles from './AboutMe.module.scss'
import headshot from '../../assets/headshot.jpg'

export interface AboutMeProps {}

export const AboutMe: FC<AboutMeProps> = (props) => {
	return (
		<div id={'about'} className={'section_wrapper'}>
			<div className={styles.about_me}>
				<div className={styles.headshot_wrapper}>
					<img
						src={'https://storage.googleapis.com/nick-xitco-portfolio-assets/headshot.jpg'}
						alt={'Me! Nick!'}
					/>
				</div>

				<div className={styles.about_me_text}>
					<h2>About Me</h2>
					<p>
						I'm Nick, a Developer and Performing Artist whose passion is building amazing experiences that
						make people's lives better. I love distilling the most complex problems into elegant designs and
						solutions, and put people first in everything I do.
					</p>

					<p>
						Currently, I'm a Full-Stack Developer at <a href="https://eightsleep.com">Eight Sleep</a>, where
						I'm building the future of sleep. After-hours, I work as an actor, music director, and pit
						musician across theaters in the greater-Austin area.
					</p>

					<p>
						Originally hailing from San Diego, I studied music and computer science at Johns Hopkins in
						Baltimore, and am now perched in Austin, ready for the next adventure!
					</p>
				</div>
			</div>
		</div>
	)
}
