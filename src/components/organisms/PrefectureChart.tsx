import SubTitle from 'components/atoms/SubTitle'
import { FC } from 'react'
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { IDataFormat, IGraphData, IPref } from 'types'

type Props = {
  selectedPrefList: IPref[]
  prefectureData: IGraphData
  td?: Array<IDataFormat>
  width: number
  height: number
}

const PrefectureChart: FC<Props> = (props) => {
  return (
    <>
      {props.selectedPrefList.length !== 0 && props.td?.length !== 0 && (
        <>
          <SubTitle title='総人口推移グラフ' />
          <LineChart width={props.width} height={props.height} data={props.td}>
            <XAxis dataKey='year' unit='年' />
            <YAxis />
            <Tooltip></Tooltip>
            {props.selectedPrefList.map((pd, index) => {
              return <Line dataKey={pd.prefCode} name={pd.prefName} key={index} unit='人' />
            })}
          </LineChart>
        </>
      )}
    </>
  )
}

export default PrefectureChart
