import { FC } from 'react'
import { FancyScrollSection } from '../FancyScrollSection'
import { FadeInCenter } from '../FadeInCenter'
import { findProject } from '../../assets/projects'

export interface DevelopmentProps {}

export const Development: FC<DevelopmentProps> = (props) => {
	return (
		<FancyScrollSection
			title={'Developer'}
			description={
				<>
					<FadeInCenter>
						<p>
							My primary tools of trade are <strong>Typescript</strong> & <strong>React</strong>, but I
							love exploring new languages, tools, and libraries in my free time.
						</p>
					</FadeInCenter>
					<FadeInCenter>
						<p>
							Keep scrolling to check out my work! Or check out{' '}
							<a
								href={
									'https://storage.googleapis.com/nick-xitco-portfolio-assets/Resume%20May%202023.pdf'
								}
							>
								my resume
							</a>
							!
						</p>
					</FadeInCenter>
				</>
			}
			cards={[
				{
					title: 'The Artist Observatory',
					description: 'Every artist on Spotify',
					link: '/project/artist_obs',
					video: findProject('artist_obs')!.imageGridItems[0].src,
					thumb: findProject('artist_obs')!.imageGridItems[0].thumb,
				},
				{
					title: 'Eight Sleep',
					description: 'Rebranding the future of sleep',
					link: '/project/eight-sleep',
					video: findProject('eight-sleep')!.imageGridItems[0].src,
					thumb: findProject('eight-sleep')!.imageGridItems[0].thumb,
				},
				{
					title: 'Artfully Scripted',
					description: 'Posters that say thousands of words',
					link: '/project/artfully-scripted',
					video: findProject('artfully-scripted')!.imageGridItems[0].src,
					thumb: findProject('artfully-scripted')!.imageGridItems[0].thumb,
				},
				{
					title: 'Mission Sleep Fitness',
					description: 'A year of sleep, recapped',
					link: '/project/eoy',
					video: findProject('eoy')!.imageGridItems[0].src,
					thumb: findProject('eoy')!.imageGridItems[0].thumb,
				},
				{
					title: 'Waffle Solver',
					description: 'A one-day project about waffle',
					link: '/project/waffle',
					video: findProject('waffle')!.imageGridItems[0].src,
					thumb: findProject('waffle')!.imageGridItems[0].thumb,
				},
			]}
		/>
	)
}
