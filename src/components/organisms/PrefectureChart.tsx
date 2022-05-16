import { FC } from 'react'
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { IDataFormat, IGraphData, IPref } from 'types'

type Props = {
  selectedPrefList: IPref[]
  prefectureData: IGraphData
  td?: Array<IDataFormat>
}

const PrefectureChart: FC<Props> = (props) => {
  return (
    <>
      {props.selectedPrefList.length !== 0 && props.td?.length !== 0 && (
        <LineChart width={800} height={400} data={props.td}>
          <XAxis dataKey='year' unit='年' />
          <YAxis />
          <Tooltip></Tooltip>
          {props.selectedPrefList.map((pd, index) => {
            return <Line dataKey={pd.prefCode} name={pd.prefName} key={index} unit='人' />
          })}
        </LineChart>
      )}
    </>
  )
}

export default PrefectureChart
