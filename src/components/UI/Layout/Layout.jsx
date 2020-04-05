import React from 'react'
import Container from 'react-bootstrap/Container'

import Header from '../Header/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container as='main' className='py-5'>
        {children}
      </Container>
    </>
  )
}

export default Layout
