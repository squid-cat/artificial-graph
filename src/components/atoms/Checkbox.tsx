import { css } from '@emotion/css'
import { FC } from 'react'

type Props = {
  id: number
  text?: string
}

const CheckboxStyle = css({
  margin: '0 10px',
})

const Checkbox: FC<Props> = (props) => {
  return (
    <label className={CheckboxStyle}>
      <input type='checkbox' value={props.id.toString()} name={props.id.toString()} />
      {props.text}
    </label>
  )
}

export default Checkbox
