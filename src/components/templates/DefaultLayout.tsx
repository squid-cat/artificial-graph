import Header from 'components/organisms/Header'
import React from 'react'
import styles from '../../styles/Home.module.css'

type Props = {
  children: React.ReactNode
  title?: string
  description?: string
  iconHref?: string
}

const DefaultLayout: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Header
        title={props.title || ''}
        description={props.description || ''}
        iconHref={props.iconHref || './images/icon.png'}
      />
      <main className={styles.main}>{props.children}</main>
    </div>
  )
}

export default DefaultLayout
