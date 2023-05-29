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
						Keep scrolling to check out my work! Or click <a href={'google.com'}>here</a> for my resume!
					</p>
				</>
			}
			cards={[
				{
					title: 'The Artist Observatory',
					description: 'Every artist on Spotify',
					link: '/project/artist_obs',
					video: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/artistobs/artistobs.webm',
				},
				{
					title: 'Eight Sleep',
					description: 'Rebranding the future of sleep',
					link: '/project/eight-sleep',
					video: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/eightsleep/eightsleep.webm',
				},
				{
					title: 'Artfully Scripted',
					description: 'Posters that say thousands of words',
					link: '/project/artfully-scripted',
					video: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/artfully/artfully%20scripted.webm',
				},
				{
					title: 'Mission Sleep Fitness 2022',
					description: 'A year of sleep, recapped',
					link: '/project/eoy',
					video: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/eoy/eoy.webm',
				},
				{
					title: 'Waffle Solver',
					description: 'A one-day project about waffle',
					link: '/project/waffle',
					video: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/waffle/waffle.webm',
				},
			]}
		/>
	)
}
