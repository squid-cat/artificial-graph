import { IGetPrefArtificialList, IGetPrefList, IGraphData, IPref } from 'types'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import DefaultLayout from 'components/templates/DefaultLayout'
import CheckboxList from 'components/molecules/CheckboxList'
import PrefectureChart from 'components/organisms/PrefectureChart'
import { css } from '@emotion/css'

const Home: NextPage = () => {
  const [prefList, setPrefList] = useState<IPref[]>([])
  const [selectedPrefList, setSelectedPrefList] = useState<IPref[]>([])
  const [graphDataList, setGraphDataList] = useState<IGraphData>([])

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
    /* const testInput: IGraphData = [
      { prefId: 1, prefName: '北海道', year: 2000, value: 25000 },
      { prefId: 1, prefName: '北海道', year: 2005, value: 24000 },
      { prefId: 1, prefName: '北海道', year: 2010, value: 22000 },
      { prefId: 1, prefName: '北海道', year: 2015, value: 20000 },
      { prefId: 2, prefName: '青森県', year: 2000, value: 21000 },
      { prefId: 2, prefName: '青森県', year: 2005, value: 25000 },
      { prefId: 2, prefName: '青森県', year: 2010, value: 22000 },
      { prefId: 2, prefName: '青森県', year: 2015, value: 28000 },
    ] */
    const prefId = 1
    axios
      .get<IGetPrefArtificialList>(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefId}`,
        {
          headers: {
            'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_APIKEY
              ? process.env.NEXT_PUBLIC_RESAS_APIKEY
              : '',
          },
        },
      )
      .then((res) => {
        const newGraphData: IGraphData = []
        res.data.result.data[0].data.forEach((item) => {
          newGraphData.push({
            prefId: prefId,
            prefName: prefList?.find((pd) => pd.prefCode === prefId)?.prefName || '',
            year: item.year,
            value: item.value,
          })
        })
        setGraphDataList(newGraphData)
        if (prefList[0]) {
          setSelectedPrefList([prefList[0]])
        }
      })
      .catch((err) => {})
  }, [prefList])

  return (
    <DefaultLayout>
      <CheckboxList
        data={
          prefList?.map((pref) => {
            return { id: pref.prefCode, text: pref.prefName ? pref.prefName : '' }
          }) || []
        }
      />
      <div className={css({ marginTop: '20px' })}>
        <PrefectureChart selectedPrefList={selectedPrefList} prefectureData={graphDataList} />
      </div>
    </DefaultLayout>
  )
}

export default Home
