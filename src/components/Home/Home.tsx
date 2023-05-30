import { FC } from 'react'
import styles from './Home.module.scss'
import { Signature } from '../../assets/Signature'
import cx from 'classnames'

export interface HomeProps {}

export const Home: FC<HomeProps> = (props) => {
	return (
		<div className={cx(styles.container)}>
			<header className={styles.header}>
				<h1>
					<a href={'#about'}>
						Nick
						<br /> <span>Xitco</span>
					</a>
				</h1>
				<Signature />
			</header>
			<div className={styles.text}>
				<h2 className={styles.subtitle}>
					<a href={'#developer'}>Developer</a> & <a href={'#performer'}>Performer</a> based out of Austin
				</h2>
				<p className={styles.subsubtitle}>currently at Eight Sleep</p>
			</div>
		</div>
	)
}
