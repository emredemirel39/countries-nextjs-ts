import { NextPage } from 'next'
import React, { Fragment, ReactNode } from 'react'
import Header from './Header'

interface IProps {
    children : ReactNode
}

const Layout:NextPage<IProps> = ({children}) => {
  return (
    <Fragment>
       <Header />
        {children}
    </Fragment>
  )
}

export default Layout