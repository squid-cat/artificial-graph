import { IGetPrefArtificialList, IGetPrefList, IPref } from 'types'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import DefaultLayout from 'components/templates/DefaultLayout'

const Home: NextPage = () => {
  const [prefList, setPrefList] = useState<IPref[]>()
  const [prefArtificialList, setPrefArtificialList] = useState<IPref[]>()

  // 都道府県一覧の取得
  useEffect(() => {
    axios
      .get<IGetPrefList>('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_APIKEY
            ? process.env.NEXT_PUBLIC_RESAS_APIKEY
            : '',
        },
      })
      .then((res) => {
        setPrefList(res.data.result)
      })
      .catch((err) => {})
  }, [])

  useEffect(() => {
    axios
      .get<IGetPrefArtificialList>(
        'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1',
        {
          headers: {
            'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_APIKEY
              ? process.env.NEXT_PUBLIC_RESAS_APIKEY
              : '',
          },
        },
      )
      .then((res) => {})
      .catch((err) => {})
  }, [])

  return (
    <DefaultLayout>
      {/* <div>
        {prefList?.map((pref) => {
          return <div>{pref.prefName}</div>
        })}
      </div> */}
      {/* <h1 className={styles.title}>
        Welcome to <a href='https://nextjs.org'>Next.js!</a>
      </h1>

      <p className={styles.description}>
        Get started by editing <code className={styles.code}>pages/index.tsx</code>
      </p>

      <div className={styles.grid}>
        <a href='https://nextjs.org/docs' className={styles.card}>
          <h2>Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href='https://nextjs.org/learn' className={styles.card}>
          <h2>Learn &rarr;</h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a href='https://github.com/vercel/next.js/tree/canary/examples' className={styles.card}>
          <h2>Examples &rarr;</h2>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          className={styles.card}
        >
          <h2>Deploy &rarr;</h2>
          <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
        </a>
      </div> */}
    </DefaultLayout>
  )
}

export default Home
