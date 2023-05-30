import { FC } from 'react'
import styles from './AboutMe.module.scss'
import { Img } from '../Img'
import cx from 'classnames'
import { FadeInCenter } from '../FadeInCenter'

export interface AboutMeProps {}

export const AboutMe: FC<AboutMeProps> = (props) => {
	return (
		<div id={'about'} className={cx(styles.container)}>
			<div className={styles.about_me}>
				<div className={styles.headshot_wrapper}>
					<Img
						src={'https://nickxitcoportfolio.imgix.net/headshot.jpg?auto=format'}
						alt={'Me! Nick!'}
						dprHeight={1000}
						objectFit={'cover'}
					/>
				</div>

				<div className={styles.about_me_text}>
					<FadeInCenter>
						<h2>About Me</h2>
					</FadeInCenter>
					<FadeInCenter>
						<p>
							I'm Nick, a Developer and Performing Artist whose passion is building amazing experiences
							that make people's lives better. I love distilling the most complex problems into elegant
							designs and solutions, and put people first in everything I do.
						</p>
					</FadeInCenter>
					<FadeInCenter>
						<p>
							Currently, I'm a Full-Stack Developer at <a href="https://eightsleep.com">Eight Sleep</a>,
							where I'm building the future of sleep. After-hours, I work as an actor, music director, and
							pit musician across theaters in the greater-Austin area.
						</p>
					</FadeInCenter>
					<FadeInCenter>
						<p>
							Originally hailing from San Diego, I studied music and computer science at Johns Hopkins in
							Baltimore, and am now perched in Austin, ready for the next adventure!
						</p>
					</FadeInCenter>
				</div>
			</div>
		</div>
	)
}
