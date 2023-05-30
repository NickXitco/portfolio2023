import { FC } from 'react'
import { FancyScrollSection } from '../FancyScrollSection'

export interface DevelopmentProps {}

export const Development: FC<DevelopmentProps> = (props) => {
	return (
		<FancyScrollSection
			title={'Developer'}
			description={
				<>
					<p>
						My primary tools of trade are <strong>Typescript</strong> & <strong>React</strong>, but I love
						exploring new languages, tools, and libraries in my free time.
					</p>
					<p>
						Keep scrolling to check out my work! Or check out{' '}
						<a href={'https://storage.googleapis.com/nick-xitco-portfolio-assets/Resume%20May%202023.pdf'}>
							my resume
						</a>
						!
					</p>
				</>
			}
			cards={[
				{
					title: 'The Artist Observatory',
					description: 'Every artist on Spotify',
					link: '/project/artist_obs',
					video: 'https://nickxitcoportfolio.imgix.net/artistobs/artistobs.webm',
				},
				{
					title: 'Eight Sleep',
					description: 'Rebranding the future of sleep',
					link: '/project/eight-sleep',
					video: 'https://nickxitcoportfolio.imgix.net/eightsleep/eightsleep.webm',
				},
				{
					title: 'Artfully Scripted',
					description: 'Posters that say thousands of words',
					link: '/project/artfully-scripted',
					video: 'https://nickxitcoportfolio.imgix.net/artfully/artfully%20scripted.webm',
				},
				{
					title: 'Mission Sleep Fitness',
					description: 'A year of sleep, recapped',
					link: '/project/eoy',
					video: 'https://nickxitcoportfolio.imgix.net/eoy/eoy.webm',
				},
				{
					title: 'Waffle Solver',
					description: 'A one-day project about waffle',
					link: '/project/waffle',
					video: 'https://nickxitcoportfolio.imgix.net/waffle/waffle.webm',
				},
			]}
		/>
	)
}
