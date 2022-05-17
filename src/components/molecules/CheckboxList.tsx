import Checkbox from 'components/atoms/Checkbox'
import { FC } from 'react'
import { css } from '@emotion/css'

type Props = {
  data: {
    id: number
    text?: string
  }[]
  width: string
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckboxList: FC<Props> = (props) => {
  const CheckboxListStyle = css({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: props.width,
  })

  return (
    <div>
      <div className={CheckboxListStyle}>
        {props.data.map((item, index) => {
          return <Checkbox id={item.id} text={item.text} key={index} onClick={props.onClick} />
        })}
      </div>
    </div>
  )
}

export default CheckboxList
