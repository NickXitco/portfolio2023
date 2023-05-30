import { FC, useEffect, useId, useState } from 'react'
import styles from './Img.module.scss'
import cx from 'classnames'

export interface Source {
	src: string
	mediaQuery: string
	dprHeight?: number
}

export interface ImgProps {
	src: string
	alt: string

	/** An optional array of image sources (used mobile vs. desktop images, etc.) */
	sources?: Source[]

	/** Optional parameter to eager vs lazy-load the image. Lazy load is default.
	 * This should be changed to eager? at the earliest opportunity. */
	lazy?: boolean

	className?: string
	id?: string
	onClick?: () => void

	/** The estimated max-height of this image.
	 * This is used for DPR calculations, and while it is optional, it is highly recommended for proper image handling.
	 * This will default to 1000 if left unset. */
	dprHeight?: number

	/**
	 * Discuss whether this is necessary
	 */
	simple?: boolean

	href?: string

	objectFit?:
		| 'contain'
		| 'cover'
		| 'fill'
		| 'none'
		| 'scale-down'
		| 'inherit'
		| 'initial'
		| 'revert'
		| 'revert-layer'
		| 'unset'

	/**
	 * Rarely used height prop kept for backwards compatibility
	 */
	height?: number

	unoptimized?: boolean
}

const DEVICE_PIXEL_RATIOS = [1, 2, 3, 4]
const DEFAULT_DPR_HEIGHT = 300

function getSrcSet(src: string, dprHeight: number | undefined) {
	const sources = []

	for (const dpr of DEVICE_PIXEL_RATIOS) {
		sources.push(src + `?auto=format&h=${dprHeight}&dpr=${dpr} ${dpr}x`)
	}

	return sources.join(',\n')
}

export const Img: FC<ImgProps> = (props) => {
	const [isMounted, setIsMounted] = useState(false)
	const id = useId()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true)
		}
	}, [])

	const windowHeight = isMounted ? Math.max(1000, Math.round(window.innerHeight * 0.8)) : DEFAULT_DPR_HEIGHT

	const generateSources = () => {
		if (!props.sources || !props.sources.length) return null

		return props.sources.map((source) => (
			<source
				key={source.mediaQuery + props.src}
				media={source.mediaQuery}
				srcSet={props.unoptimized ? source.src : getSrcSet(source.src, source.dprHeight || windowHeight)}
			/>
		))
	}
	const renderSimpleImg = () => {
		const loadingType = props.lazy === undefined || props.lazy ? 'lazy' : 'eager'
		return (
			<img
				className={cx(styles.img, { [props.className as string]: props.simple })}
				src={props.src}
				alt={props.alt}
				loading={loadingType}
				id={props.id}
				srcSet={props.unoptimized ? props.src : getSrcSet(props.src, props.dprHeight || windowHeight)}
				style={{ objectFit: props.objectFit || 'cover' }}
			/>
		)
	}

	const _id = `img-link-for-${id}`

	return (
		<picture onClick={props.onClick} className={props.className}>
			{generateSources()}
			{props.href ? (
				<a href={props.href} id={_id}>
					{renderSimpleImg()}
				</a>
			) : (
				renderSimpleImg()
			)}
		</picture>
	)
}
