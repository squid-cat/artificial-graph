import Head from 'next/head'
import React from 'react'
import styles from '../../styles/Home.module.css'

type Props = {
  children: React.ReactNode
}

const DefaultLayout: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>総人口推移グラフページ</title>
        <meta name='description' content='都道府県別の総人口推移グラフを表示' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>{props.children}</main>
    </div>
  )
}

export default DefaultLayout
