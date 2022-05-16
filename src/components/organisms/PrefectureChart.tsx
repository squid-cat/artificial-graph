import { FC, useEffect } from 'react'
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { IGraphData, IPref } from 'types'

type Props = {
  selectedPrefList: IPref[]
  prefectureData: IGraphData
}

const PrefectureChart: FC<Props> = (props) => {
  type dataFormat = {
    year: number
    [key: string]: number
  }
  const dataOutout: Array<dataFormat> = []

  // グラフで使用する形に変更
  props.prefectureData.forEach((item) => {
    const searchYear = dataOutout.find((aIn) => aIn.year === item.year)
    if (searchYear === undefined) {
      dataOutout.push({ year: item.year })
    }
    const indexYear = dataOutout.findIndex((aIn) => aIn.year === item.year)
    dataOutout[indexYear][item.prefId] = item.value
  })

  return (
    <>
      {props.selectedPrefList.length !== 0 && (
        <LineChart width={800} height={400} data={dataOutout}>
          <XAxis dataKey='year' />
          <YAxis />
          <Tooltip></Tooltip>
          {props.selectedPrefList.map((pd, index) => {
            return <Line dataKey={pd.prefCode} name={pd.prefName} key={index} />
          })}
        </LineChart>
      )}
    </>
  )
}

export default PrefectureChart
