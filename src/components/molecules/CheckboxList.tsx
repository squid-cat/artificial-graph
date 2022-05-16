import Checkbox from 'components/atoms/Checkbox'
import { FC } from 'react'
import { css } from '@emotion/css'

type Props = {
  data: {
    id: number
    text?: string
  }[]
}

const CheckboxListStyle = css({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
})

const CheckboxList: FC<Props> = (props) => {
  return (
    <div>
      <div className={CheckboxListStyle}>
        {props.data.map((item, index) => {
          return <Checkbox id={item.id} text={item.text} key={index} />
        })}
      </div>
    </div>
  )
}

export default CheckboxList
