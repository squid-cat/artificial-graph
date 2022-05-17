import { css } from '@emotion/css'
import React from 'react'

type Props = {
  title: string
}

const subtitleStyle = css({
  position: 'relative',
  display: 'inline-block',
  padding: '1rem 2rem 1rem 4rem',
  color: '#fff',
  borderRadius: '100vh 0 0 100vh',
  background: '#fa4141',
})

const SubTitle: React.FC<Props> = (props) => {
  return <h2 className={subtitleStyle}>{props.title}</h2>
}

export default SubTitle
