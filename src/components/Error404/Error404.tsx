
import { FC } from 'react'
import styles from './Error404.module.scss'
export interface Error404Props {}

export const Error404: FC<Error404Props> = (props) => {
  return (
    <div className={styles.container}>
      <h2>Error404</h2>
    </div>
  );
}; 
