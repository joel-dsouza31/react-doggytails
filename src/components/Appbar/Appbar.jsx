import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'

import AuthContext from '../../lib/auth-context'

import CustomNavLink from '../UI/CustomNavLink/CustomNavLink'
import logo from '../../assets/img/logo.png'

import classes from './Appbar.module.scss'

const getAppName = (appNameText) => {
  let appName = []
  let i = 0
  for (const alphabet of appNameText) {
    appName.push(<span key={i}>{alphabet}</span>)
    i++
  }
  return appName
}

const Appbar = () => {
  const { isCheckingAuth, isAuthenticated, logout, isAdmin } = useContext(
    AuthContext
  )
  const history = useHistory()

  const handleClick = () => {
    logout()
    history.push('/auth')
  }

  const protectedNavLinks = isCheckingAuth ? (
    <Nav.Link disabled className={classes.navLink}>
      <Spinner animation='grow' size='sm' className='mr-1' />
      Authenticating
    </Nav.Link>
  ) : isAuthenticated ? (
    <>
      {!isAdmin && (
        <CustomNavLink to='/my-profile' className={classes.navLink}>
          My Profile
        </CustomNavLink>
      )}
      <Nav.Link onClick={handleClick} className={classes.navLink}>
        Logout
      </Nav.Link>
    </>
  ) : (
    <CustomNavLink to='/auth' className={classes.navLink}>
      Sign in / Sign up
    </CustomNavLink>
  )

  return (
    <Navbar
      bg='primary'
      variant='dark'
      expand='md'
      collapseOnSelect
      className={`${classes.elevate} py-3 shadow`}>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <Image alt='logo' src={logo} height='50' />
          <span
            className={`${classes.brandText} align-bottom ${classes.wavetext}`}>
            {getAppName('DoggyTails')}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className={classes.navGrid}>
            <CustomNavLink to='/' exact className={classes.navLink}>
              Home
            </CustomNavLink>
            {!isAdmin && (
              <>
                <CustomNavLink to='/adopt' className={classes.navLink}>
                  Adopt
                </CustomNavLink>
                <CustomNavLink to='/donate' className={classes.navLink}>
                  Donate
                </CustomNavLink>
                <CustomNavLink to='/about-us' className={classes.navLink}>
                  About Us
                </CustomNavLink>
              </>
            )}
            {protectedNavLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Appbar
