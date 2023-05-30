import { FC } from 'react'
import styles from './WorkWithMe.module.scss'
import { FadeInCenter } from '../FadeInCenter'

export interface WorkWithMeProps {}

export const WorkWithMe: FC<WorkWithMeProps> = (props) => {
	return (
		<div className={styles.container}>
			<FadeInCenter>
				<h2>Work with me</h2>
			</FadeInCenter>
			<FadeInCenter>
				<a href={'mailto:nxitco@gmail.com'}>nxitco@gmail.com</a>
			</FadeInCenter>
		</div>
	)
}
