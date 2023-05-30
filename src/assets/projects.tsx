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
		description: 'Reviews',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/newsies/newsies.webm',
				alt: '',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/newsies/proshot_thumbnail',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/newsies/newsies1',
				alt: 'Me singing Seize the Day',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/newsies/newsies2',
				alt: 'The finial tableau of the show',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/newsies/newsies5',
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
		about: (
			<>
				<p>
					<a href={'https://www.austinchronicle.com/arts/2022-07-15/review-disneys-newsies/'}>
						The Broadway strike musical occupies Zilker Hillside Theatre spectacularly
					</a>
				</p>
				<p>
					<a
						href={
							'https://thedailytexan.com/2022/07/14/zilker-summer-musical-returns-to-zilker-park-with-newsies/'
						}
					>
						Zilker Summer Musical returns to Zilker Park with ‘Newsies’
					</a>
				</p>
				<p>
					<a
						href={
							'https://cbsaustin.com/news/local/familyfun-zilker-theatre-productions-returns-to-the-hillside-with-high-stepping-newsies'
						}
					>
						#FAMILYFUN: Zilker Theatre Productions returns to the Hillside with high-stepping Newsies
					</a>
				</p>
			</>
		),
	},
	{
		id: 'elf',
		title: 'Elf',
		description: 'Reviews',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/elf/elf.webm',
				alt: '',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/elf/elfthumb.png',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/elf/elf1.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/elf/elf2.jpeg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/elf/elf3.jpg',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: 2021,
			},
			{
				name: 'Role',
				value: 'Buddy',
			},
			{
				name: 'Company',
				value: <a href={'https://www.georgetownpalace.com/'}>Georgetown Palace Theatre</a>,
			},
			{
				name: 'Director/Choreographer',
				value: 'Richard Cerato',
			},
			{
				name: 'Music Director',
				value: 'David Blackburn',
			},
		],
		about: (
			<>
				<p>
					<a href={'https://issuu.com/fidelispublish/docs/mj_12_21_web/s/14284300'}>
						WORTH THE DRIVE Elf: The Musical
					</a>
				</p>
			</>
		),
	},
	{
		id: 'vc',
		title: 'Vocal Chords',
		description: 'Johns Hopkins University',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/vc/vc.webm',
				alt: '',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/vc/vcthumb.png',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/vc/vc1.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/vc/vc3.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/vc/vc2.jpg',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: '2016-2021',
			},
			{
				name: 'Role',
				value: 'Music Director',
			},
		],
	},
	{
		id: 'something_rotten',
		title: 'Something Rotten',
		description: 'Reviews',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/somethingrotten/something_rotten.webm',
				alt: '',
				video: true,
			},
		],
		listItems: [
			{
				name: 'Year',
				value: 2022,
			},
			{
				name: 'Role',
				value: 'Nigel Bottom',
			},
			{
				name: 'Company',
				value: <a href={'https://www.georgetownpalace.com/'}>Georgetown Palace Theatre</a>,
			},
			{
				name: 'Director',
				value: 'Ron Watson',
			},
			{
				name: 'Music Director',
				value: 'Sabrina Mari Uriegas',
			},
			{
				name: 'Choreographer',
				value: 'Judy Thompson Price',
			},
		],
		about: (
			<>
				<p>
					<a
						href={
							'https://www.broadwayworld.com/austin/article/BWW-Review-SOMETHING-ROTTEN-Georgetown-Palace-Creates-Musical-Magic-20220510'
						}
					>
						Review: SOMETHING ROTTEN! - Georgetown Palace Creates Musical Magic
					</a>
				</p>
				<p>
					<a
						href={
							'https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/278809303_10110513647892264_3384050884566483018_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=D_iE9OSkm7QAX9CcGg5&_nc_ht=scontent-dfw5-2.xx&oh=00_AfDNZsn9U0uaj8StHT_qJPif138EO4shppkkNp5szgVXRw&oe=647ADEFD'
						}
					>
						'Something Rotten' is something special
					</a>
				</p>
			</>
		),
	},
	{
		id: 'holiday_inn',
		title: 'Holiday Inn',
		description: 'Reviews',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/holiday/holiday%20inn.webm',
				alt: '',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/holiday/holiday%20inn%20thumb.png',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/holiday/holidayinn3.webp',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/holiday/holidayinn2.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/holiday/holidayinn1.jpg',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: 2022,
			},
			{
				name: 'Role',
				value: 'Music Director',
			},
			{
				name: 'Company',
				value: <a href={'https://www.georgetownpalace.com/'}>Georgetown Palace Theatre</a>,
			},
			{
				name: 'Director',
				value: 'Kristen Rogers',
			},
			{
				name: 'Choreographer',
				value: 'Jesee Smart',
			},
		],
		about: (
			<>
				<p>
					<a href={'https://sunnewsaustin.com/2022/12/10/a-holiday-delight-in-georgetown/'}>
						A Holiday Delight in Georgetown
					</a>
				</p>{' '}
				<p>
					<a
						href={
							'https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/316273989_10228141333700014_4023910740144202275_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Lt4C2VUnSSoAX-8r_c0&_nc_ht=scontent-dfw5-2.xx&oh=00_AfCFDGy-_mCNwhDQQvjqNn0SzfCDUIfC8ikaqQdkpuAR0A&oe=647A3FA5'
						}
					>
						The Palace Presents 'Holiday Inn', the Musical
					</a>
				</p>
			</>
		),
	},
	{
		id: 'cabaret',
		title: 'Cabaret',
		description: 'Reviews',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/cabaret/cabaret.webm',
				alt: '',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/cabaret/kabaretthumb.png',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/cabaret/cabaret1.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/cabaret/cabaret2.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/cabaret/cabaret3.jpg',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: 2019,
			},
			{
				name: 'Role',
				value: 'Assistant Music Director, Publicity Manager',
			},
			{
				name: 'Company',
				value: <a href={'https://linktr.ee/jhubarnstormers'}>JHU Barnstormers</a>,
			},
			{
				name: 'Director/Choreographer',
				value: 'Max Hunter',
			},
			{
				name: 'Music Director',
				value: 'Matthew Dohm',
			},
		],
		about: (
			<>
				<p>
					<a href={'https://hub.jhu.edu/magazine/2019/summer/cabaret-barnstormers-100th-anniversary/'}>
						BEHIND THE SCENES OF 'CABARET'
					</a>
				</p>{' '}
				<p>
					<a
						href={
							'https://www.jhunewsletter.com/article/2019/04/berlin-comes-to-baltimore-in-barnstormers-cabaret'
						}
					>
						Berlin comes to Baltimore in Barnstormers' Cabaret
					</a>
				</p>
			</>
		),
	},
	{
		id: 'pippin',
		title: 'Pippin',
		description: 'Reviews',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/pippin/pippin.webm',
				alt: '',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/pippin/pippin%20thumb.png',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/pippin/pippin1.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/pippin/pippin2.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/pippin/pippin3.jpg',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: 2018,
			},
			{
				name: 'Role',
				value: 'Assistant Music Director, Ensemble, Publicity Manager',
			},
			{
				name: 'Company',
				value: <a href={'https://linktr.ee/jhubarnstormers'}>JHU Barnstormers</a>,
			},
			{
				name: 'Director/Choreographer',
				value: 'Claire Edmonds',
			},
			{
				name: 'Music Director',
				value: 'Erich Rausch',
			},
		],
		about: (
			<>
				<p>
					<a href={'https://hub.jhu.edu/2018/04/11/pippin-barnstormers-review/'}>
						In Barnstormers' 'Pippin,' something dark lurks beneath boisterous surface
					</a>
				</p>
				<p>
					<a
						href={
							'https://www.jhunewsletter.com/article/2018/04/barnstormers-bring-their-unique-energy-to-pippin'
						}
					>
						Barnstormers bring their unique energy to Pippin
					</a>
				</p>
			</>
		),
	},
	{
		id: 'artist_obs',
		title: 'The Artist Observatory',
		description: 'Every artist on Spotify',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/artistobs/artistobs.webm',
				alt: 'A video exploring the Artist Observatory',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/artistobs/obsthumb',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/artistobs/artist_obs1.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/artistobs/artistobs2',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/artistobs/artistobs3',
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
				value: 'React, TypeScript, Node.js, Express, ArangoDB, Three.js, Python, C++',
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
	{
		id: 'eight-sleep',
		title: 'Eight Sleep',
		description: 'Rebranding the future of sleep',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/eightsleep/eightsleep.webm',
				alt: "A video exploring Eight Sleep's new brand",
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/eightsleep/homepagethumb.jpg',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/eightsleep/eightsleepvideo2.webm',
				alt: '',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/eightsleep/clockthumb.png',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/eightsleep/shoppage',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/eightsleep/share',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: '2022 - Present',
			},
			{
				name: 'Role',
				value: 'Full Stack Developer',
			},
			{
				name: 'Stack',
				value: 'React, TypeScript, Node.js, Next.js, Shopify, S3, Three.js, Python, React Native, Postgres, MongoDB',
			},
		],
		about: (
			<>
				<p>
					I joined Eight Sleep at the beginning of 2022 as a Full Stack developer. Since then, I've grown into
					become the company's main Brand and Growth developer, working on a variety of projects across the
					company, such as:
				</p>
				<ul>
					<li>
						Redesigning the entire website to a new level of polish and clarity, increasing CVR by 48% over
						multiple initiatives and tests
					</li>
					<li>
						Developed multiple in-app campaigns, including our in-app share feature, which generates dynamic
						and personalized shareable images
					</li>
					<li>
						Our in-app Year In Sleep campaign, which was a Spotify-wrapped style campaign that took each
						user through a tour of their data with engaging and personalized animations
					</li>
					<li>
						Creating our Design Library and Storybook, which has helped organized and optimized the
						brainstorm to production pipeline
					</li>
					<li>
						Developing multiple engaging landing pages for external partnerships, including the Mercedes-AMG
						Petronas F1 team, Andrew Huberman, Tim Ferris, Linus Tech Tips, and more!
					</li>
					<li>Optimizing our CI/CD pipeline to decrease build times by 65%</li>
				</ul>
				<p>
					Check us out at <a href={'https://www.eightsleep.com/'}>https://www.eightsleep.com/</a>
				</p>
			</>
		),
	},
	{
		id: 'artfully-scripted',
		title: 'Artfully Scripted',
		description: 'Posters that say thousands of words',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/artfully/artfully%20scripted.webm',
				alt: 'A video exploring the Etsy Shop',
				video: true,
				thumb: 'https://nickxitcoportfolio.imgix.net/artfully/as_thumb.jpg',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/artfully/Main%20Mockup.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/artfully/Etsy%20Tilt%20Shift.jpg',
				alt: '',
			},
			{
				src: 'https://nickxitcoportfolio.imgix.net/artfully/Lifestyle%2030102030405060708091011121314151617181920.jpg',
				alt: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: '2023',
			},
			{
				name: 'Role',
				value: 'Designer, Developer, Owner',
			},
			{
				name: 'Stack',
				value: 'React, TypeScript, Python, Photoshop',
			},
		],
		about: (
			<>
				<p>
					In high school, I started making posters for friends, where I would take the text of a book and
					color all the characters in the text to create an image from the book. I continued doing it manually
					through college, but I always wanted to automate the process. I finally got around to it in 2021,
					and in the beginning of May 2023, I launched my Etsy shop, Artfully Scripted, where I sell and ship
					posters of books, movies, and more. I'm very proud of it, and I hope you enjoy it!
				</p>
				<p>
					In the past month, the shop has done over $1,500 in sales with over 50 orders already! I print and
					pack all the posters at home, and it's been a great side activity for the summer.
				</p>
				<p>
					Check the shop out at{' '}
					<a href={'https://www.etsy.com/shop/ArtfullyScriptedCo'}>
						https://www.etsy.com/shop/ArtfullyScriptedCo
					</a>
				</p>
			</>
		),
	},
	{
		id: 'eoy',
		title: 'Mission Sleep Fitness',
		description: 'A year of sleep, recapped',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/eoy/eoy.webm',
				alt: '',
				video: true,
				thumb: '',
			},
		],
		listItems: [
			{
				name: 'Year',
				value: '2022',
			},
			{
				name: 'Role',
				value: 'Full Stack Developer',
			},
			{
				name: 'Stack',
				value: 'React, TypeScript, React Native, Three.js',
			},
		],
		about: (
			<>
				<p>
					At the end of 2022, Eight Sleep wanted to recap the year for our users in a fun and engaging way. We
					decided to create a Spotify-wrapped style campaign that took each user through a tour of their data
					with engaging and personalized animations. I led the entire development process end-to-end. The
					campaign was a huge success, increasing our number of shares from 2021 by over 2500%!
				</p>
				<p>
					We garnered organic impressions from thousands of users, included Maisie Williams! Check out some
					testimonials:
				</p>

				<ul>
					<li>
						<a href={'https://twitter.com/WisMateusz/status/1600887271934152712'}>
							This is galactic! 🪐 @m_franceschetti & the entire @eightsleep team make not only the best
							sleep experience but also the top user experience.
						</a>
					</li>
					<li>
						<a href={'https://twitter.com/doctor_darsh/status/1602474650059132928'}>
							@eightsleep with seriously the coolest way to present my sleep data!
						</a>
					</li>
					<li>
						<a href={'https://t.co/qOEqmDT0gq'}>
							As a data guy, I love that @eightsleep did a year in review on my sleep habits based on the
							data it gathered throughout the year. Very well done and the presentation was cool in the
							app.
						</a>
					</li>
					<li>
						<a href={'https://t.co/LWP2OYuDXR'}>
							Shout out to the awesome team at @eightsleep for building this cool 2022 recap story, with
							neat insights! Love it.
						</a>
					</li>
				</ul>
			</>
		),
	},
	{
		id: 'waffle',
		title: 'Waffle Solver',
		description: 'A one-day project about waffle',
		imageGridItems: [
			{
				src: 'https://nickxitcoportfolio.imgix.net/waffle/waffle.webm',
				alt: '',
				video: true,
			},
		],
		listItems: [
			{
				name: 'Year',
				value: '2023',
			},
			{
				name: 'Role',
				value: 'Developer, Designer',
			},
			{
				name: 'Stack',
				value: 'React, TypeScript',
			},
		],
		about: (
			<>
				<p>
					In wanting to try out some one-day projects, I set out to write a solver for the game{' '}
					<a href={'https://wafflegame.net/'}>Waffle</a>, a Wordle-clone where six different words intersect
					in a waffle-shape, and you have to solve the entire board at once by swapping letters. It was a fun
					challenge, and nice to get a project done in a day.
				</p>
				<p>
					Check out the project at{' '}
					<a href={'https://wafflesolver.uc.r.appspot.com/'}>https://wafflesolver.uc.r.appspot.com/</a>{' '}
					(probably has a few bugs).
				</p>
			</>
		),
	},
]

export const findProject = (id: string) => {
	return projects.find((project) => project.id === id)
}
