import { css } from '@emotion/css'
import Head from 'next/head'
import React from 'react'

type Props = {
  title: string
  description: string
  iconHref: string
}

const headerStyle = css({
  display: 'flex',
  height: '100px',
  fontSize: '30px',
  fontWeight: 'bold',
  justifyContent: 'center',
  alignItems: 'center',
  background:
    'linear-gradient(to right, rgba(255,214,94,0.0) 0%,rgba(255,214,94,0.6) 50%,rgba(254,191,4,0.0) 100%)',
  filter:
    "progid:DXImageTransform.Microsoft.gradient( startColorstr='#4dffd65e', endColorstr='#0dfebf04',GradientType=0 )",
})

const Header: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
        <link rel='icon' href={props.iconHref} />
      </Head>

      <header>
        <div className={headerStyle}>{props.title}</div>
      </header>
    </>
  )
}

export default Header
