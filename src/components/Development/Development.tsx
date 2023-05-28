import { FC } from 'react'
import artistOBSVideo from '../../assets/artistobs.webm'
import eightsleep from '../../assets/eightsleep.webm'
import artfullyscripted from '../../assets/artfully scripted.webm'
import waffle from '../../assets/waffle.webm'
import eoy from '../../assets/eoy.webm'
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
					video: artistOBSVideo,
				},
				{
					title: 'Eight Sleep',
					description: 'Rebranding the future of sleep',
					link: '/project/eight-sleep',
					video: eightsleep,
				},
				{
					title: 'Artfully Scripted',
					description: 'Posters that say thousands of words',
					link: '/project/artfully-scripted',
					video: artfullyscripted,
				},
				{
					title: 'Mission Sleep Fitness 2022',
					description: 'A year of sleep, recapped',
					link: '/project/eoy',
					video: eoy,
				},
				{
					title: 'Waffle Solver',
					description: 'A one-day project about waffle',
					link: '/project/waffle',
					video: waffle,
				},
			]}
		/>
	)
}
