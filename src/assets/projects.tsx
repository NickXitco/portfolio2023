import { ImageGridItemProps } from '../components/ProjectView'
import { ReactNode } from 'react'

export interface Project {
	id: string
	title: string
	description: string

	imageGridItems: ImageGridItemProps[]

	listItems: {
		name: string
		value: ReactNode
	}[]

	about?: ReactNode
}

export const projects: Project[] = [
	{
		id: 'newsies',
		title: 'Newsies',
		description: 'Zilker Theatre Productions',
		imageGridItems: [
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/newsies/newsies.webm',
				alt: 'Placeholder',
				video: true,
				thumb: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/newsies/proshot_thumbnail',
			},
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/newsies/newsies1',
				alt: 'Me singing Seize the Day',
			},
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/newsies/newsies2',
				alt: 'The finial tableau of the show',
			},
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/newsies/newsies5',
				alt: 'Me looking all sad during Carrying the Banner',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: 2022,
			},
			{
				name: 'Role',
				value: 'Ike, u/s Spot Conlon',
			},
			{
				name: 'Company',
				value: <a href={'https://www.zilker.org'}>Zilker Theatre Productions</a>,
			},
			{
				name: 'Director',
				value: 'Joey Banks',
			},
			{
				name: 'Music Director',
				value: 'Beth Everett',
			},
			{
				name: 'Choreographer',
				value: 'Chris Shin',
			},
		],
	},
	{
		id: 'artist_obs',
		title: 'The Artist Observatory',
		description: 'Every artist on Spotify',
		imageGridItems: [
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/artistobs/artistobs.webm',
				alt: 'A video exploring the Artist Observatory',
				video: true,
				thumb: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/artistobs/obsthumb',
			},
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/artistobs/artist_obs1.jpg',
				alt: '',
			},
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/artistobs/artistobs2',
				alt: '',
			},
			{
				src: 'https://storage.googleapis.com/nick-xitco-portfolio-assets/artistobs/artistobs3',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: '2021 - Present',
			},
			{
				name: 'Role',
				value: 'Designer, Full Stack Developer',
			},
			{
				name: 'Stack',
				value: 'React, TypeScript, Node.js, Express, ArangoDB, Three.js, Python',
			},
		],
		about: (
			<>
				<p>
					The Artist Observatory began as some scribblings on a whiteboard, wondering if every artist on
					Spotify could be connected through their related artists. From there it grew into a gargantuan
					project that I have been working on for the past few years, first as my Master's thesis and now as a
					passion project.
				</p>
				<p>
					The website allows you to view every artist on Spotify, with each artist being represented by a
					glowing node in a 3D space. You can click on an artist to view their related artists, and click on
					those artists to view their related artists, and so on. You can also search for artists by name, and
					the graph will recenter on the artist you searched for. You can view genres, listen to music through
					the website, find the shortest path between two artists, and more.
				</p>

				<p>
					The project has been foundational in my growth as a developer, and is constantly evolving as I learn
					new things. It's bursting at the seams with complex data structures, shaders, visualization
					algorithms, and more. I'm very proud of it, and I hope you enjoy it!
				</p>

				<p>
					The Artist Observatory is still in development (hoping to finish by the end of Summer 2023), but you
					can check out the current version at{' '}
					<a href={'https://artistobsclient.uc.r.appspot.com/'}>https://artistobsclient.uc.r.appspot.com/</a>
				</p>
			</>
		),
	},
]

export const findProject = (id: string) => {
	return projects.find((project) => project.id === id)
}
