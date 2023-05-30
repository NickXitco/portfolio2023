import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectView.module.scss'
import { Project } from '../../assets/projects'
import cx from 'classnames'
import { Img } from '../Img'

export interface ProjectViewProps {
	project?: Project
	visible: boolean
}

export const ProjectView: FC<ProjectViewProps> = (props) => {
	useEffect(() => {
		if (props.visible) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [props.visible])

	return (
		<div
			id={'project-view'}
			className={styles.container}
			aria-hidden={!props.visible}
			aria-expanded={props.visible}
			style={{
				opacity: props.visible ? 1 : 0,
				visibility: props.visible ? 'visible' : 'hidden',
			}}
		>
			<div className={styles.inner_container}>
				<Link to={'/'} className={styles.close_button}>
					<svg viewBox="0 0 32 32">
						<path
							fill="none"
							stroke="#FFF"
							strokeLinecap="round"
							strokeMiterlimit="10"
							strokeWidth="4"
							d="M5.8 26.2L26.2 5.8"
						></path>
						<path
							fill="none"
							stroke="#FFF"
							strokeLinecap="round"
							strokeMiterlimit="10"
							strokeWidth="4"
							d="M5.8 5.8L26.2 26.2"
						></path>
					</svg>
				</Link>

				{props.project && (
					<div className={styles.main_grid}>
						<div className={styles.images}>
							<ImageGrid items={props.project.imageGridItems} />
						</div>
						<div className={styles.text_content}>
							<h2>{props.project.title}</h2>
							<ul className={styles.items}>
								{props.project.listItems.map((item, index) => (
									<li key={index}>
										<strong>{item.name}:</strong> {item.value}
									</li>
								))}
							</ul>
							{props.project.about && (
								<div className={styles.about_the_project}>
									<h3>{props.project.description}</h3>
									<div className={styles.about_inner}>{props.project.about}</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			<Link to={'/'} className={styles.bg_link} tabIndex={-1} />
		</div>
	)
}

export interface ImageGridItemProps {
	src: string
	alt: string
	thumb?: string
	video?: boolean
}

export interface ImageGridProps {
	items: ImageGridItemProps[]
}

const ImageGrid: FC<ImageGridProps> = (props) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const activeItem = props.items[activeIndex]
	return (
		<div className={styles.image_grid}>
			<div className={cx(styles.active, { [styles.single_item]: props.items.length === 1 })}>
				{activeItem.video ? (
					<video
						src={activeItem.src}
						muted
						autoPlay
						loop
						playsInline
						disableRemotePlayback
						disablePictureInPicture
					/>
				) : (
					<Img src={activeItem.src} alt={activeItem.alt} dprHeight={600} objectFit={'cover'} />
				)}
			</div>
			{props.items.length > 1 &&
				props.items.map((item, index) => (
					<button
						key={index}
						className={styles.thumb}
						style={{
							filter: index === activeIndex ? 'brightness(1)' : '',
						}}
						onClick={() => setActiveIndex(index)}
						aria-label={`View ${item.alt}`}
					>
						<Img src={item.thumb || item.src} alt={item.alt} dprHeight={300} objectFit={'cover'} />
					</button>
				))}
		</div>
	)
}
