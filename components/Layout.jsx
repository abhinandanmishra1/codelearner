import React, { Children } from 'react'
import { Header } from './'
// We always to show the header that's why wrapping it here

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        {children}
    </>
  )
}

export default Layout