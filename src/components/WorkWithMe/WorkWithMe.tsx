import { FC } from 'react'
import styles from './WorkWithMe.module.scss'

export interface WorkWithMeProps {}

export const WorkWithMe: FC<WorkWithMeProps> = (props) => {
	return (
		<div className={styles.container}>
			<h2>Work with me</h2>
			<a href={'mailto:nxitco@gmail.com'}>nxitco@gmail.com</a>
		</div>
	)
}
