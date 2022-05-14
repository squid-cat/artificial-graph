import { FC } from 'react'

type Props = {
  id: number
  text?: string
}

const Checkbox: FC<Props> = (props) => {
  return (
    <div>
      <label>
        <input type='checkbox' id={props.id.toString()} name={props.id.toString()} />
        <div>{props.text}</div>
      </label>
    </div>
  )
}

export default Checkbox
