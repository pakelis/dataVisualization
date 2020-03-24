import React from 'react'
import {useAuth0} from '../../react-auth0-spa'
import {Link, NavLink} from 'react-router-dom'

// ant-d
import {Layout, Menu, Button} from 'antd'

const {Header, Content, Footer} = Layout

const NavBar = () => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

  return (
    // <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
    <>
      {!isAuthenticated && (
        <Menu mode="horizontal">
          <Menu.Item>
            <a onClick={() => loginWithRedirect({})}>Login</a>
          </Menu.Item>
        </Menu>
      )}

      {isAuthenticated && (
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="/profile">
            <NavLink to="/profile">Profile</NavLink>
          </Menu.Item>
          <Menu.Item key="/external-api">
            <NavLink to="/external-api">External API</NavLink>
          </Menu.Item>
          <Menu.Item key="/post-csv">
            <NavLink to="/post-csv">Post CVS</NavLink>
          </Menu.Item>
          <Menu.Item key="/create-chart">
            <NavLink to="/create-chart">Create Chart</NavLink>
          </Menu.Item>
          <Menu.Item key="/logout">
            <a onClick={() => logout()}>Log out</a>
          </Menu.Item>
        </Menu>
      )}
    </>
    // </Header>
  )
}

export default NavBar
