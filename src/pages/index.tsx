import { IDataFormat, IGetPrefArtificialList, IGetPrefList, IGraphData, IPref } from 'types'
import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import DefaultLayout from 'components/templates/DefaultLayout'
import CheckboxList from 'components/molecules/CheckboxList'
import PrefectureChart from 'components/organisms/PrefectureChart'
import { css } from '@emotion/css'
import { useMediaQueryContext } from 'components/organisms/MediaQueryProvider'

const Home: NextPage = () => {
  const { isMobileSite, isTabletSite, isPcSite } = useMediaQueryContext()
  const [prefList, setPrefList] = useState<IPref[]>([])
  const [selectedPrefList, setSelectedPrefList] = useState<IPref[]>([])
  const [graphDataList, setGraphDataList] = useState<IGraphData>([])
  const [data, setData] = useState<Array<IDataFormat>>([])

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
    const dataOutout: Array<IDataFormat> = []
    graphDataList.forEach((item) => {
      const searchYear = dataOutout.find((aIn) => aIn.year === item.year)
      if (searchYear === undefined) {
        dataOutout.push({ year: item.year })
      }
      const indexYear = dataOutout.findIndex((aIn) => aIn.year === item.year)
      dataOutout[indexYear][item.prefId] = item.value
    })
    setData(dataOutout)
  }, [graphDataList])

  const getPrefData = (prefId: number) => {
    // データが既にある場合はgetしない
    if (graphDataList.findIndex((gd) => gd.prefId === prefId) !== -1) return

    // 人口の取得
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
        const newGraphData: IGraphData = [...graphDataList]
        res.data.result.data[0].data.forEach((item) => {
          newGraphData.push({
            prefId: prefId,
            prefName: prefList?.find((pd) => pd.prefCode === prefId)?.prefName || '',
            year: item.year,
            value: item.value,
          })
        })
        setGraphDataList(newGraphData)
      })
      .catch((err) => {})
  }

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      getPrefData(Number(e.target.name))
      const addPref: IPref | undefined = prefList.find(
        (pd) => pd.prefCode.toString() === (e.target.name ? e.target.name : ''),
      )
      if (addPref) {
        setSelectedPrefList([...selectedPrefList, addPref])
      }
    } else {
      const nextPrefList = [...selectedPrefList]
      const removeIndex = nextPrefList.findIndex(
        (pd) => pd.prefCode.toString() === (e.target.name ? e.target.name : ''),
      )
      if (removeIndex !== -1) {
        nextPrefList.splice(removeIndex, 1)
      }
      setSelectedPrefList(nextPrefList)
    }
  }

  return (
    <DefaultLayout>
      <div>
        <h2>表示する都道府県</h2>
        <CheckboxList
          data={
            prefList?.map((pref) => {
              return { id: pref.prefCode, text: pref.prefName ? pref.prefName : '' }
            }) || []
          }
          onClick={handleOnClick}
          width={isMobileSite ? '300px' : isTabletSite ? '520px' : '960px'}
        />
      </div>

      <div className={css({ marginTop: '30px' })}>
        <h2>総人口推移グラフ</h2>
        <PrefectureChart
          selectedPrefList={selectedPrefList}
          prefectureData={graphDataList}
          td={data}
          width={isMobileSite ? 290 : isTabletSite ? 400 : 960}
          height={isMobileSite ? 240 : isTabletSite ? 300 : 400}
        />
      </div>
    </DefaultLayout>
  )
}

export default Home
