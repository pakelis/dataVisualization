import React, {useState} from 'react'
import {useAuth0} from '../../react-auth0-spa'
import {Link, NavLink} from 'react-router-dom'
import SideMenu from './SideMenu'
import LogoutModal from './LogoutModal'

//font
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faProjectDiagram} from '@fortawesome/free-solid-svg-icons'

// ant-d
import {Layout, Menu, Button} from 'antd'
import {MenuOutlined} from '@ant-design/icons'

//css
import '../../../src/styles.css'

//react-responsive
import {useMediaQuery} from 'react-responsive'

//TODO make navbar narrower so it fits our layout content

const {Header, Content, Footer} = Layout

const NavBar = () => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})

  const [showDrawer, setShowDrawer] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const handleDrawer = () => {
    setShowDrawer(!showDrawer)
  }

  const handleLogout = () => {
    setShowLogout(!showLogout)
  }

  return (
    <>
      <Header style={{zIndex: 1, width: '100%'}}>
        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon
              icon={faProjectDiagram}
              style={{fontSize: '16px', alignItems: 'center'}}
            />
          </Link>
        </div>
        {!isAuthenticated && (
          <Menu mode="horizontal">
            <Menu.Item>
              <a onClick={() => loginWithRedirect({})}>Login</a>
            </Menu.Item>
          </Menu>
        )}

        {isAuthenticated && (
          <>
            {isTabletOrMobile && (
              <Menu mode="horizontal" style={{display: 'flex'}}>
                <Menu.Item onClick={handleDrawer}>
                  <MenuOutlined />
                </Menu.Item>
              </Menu>
            )}
            {isDesktopOrLaptop && (
              <Menu mode="horizontal" style={{display: 'flex'}}>
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
                <Menu.Item key="/logout" onClick={handleLogout}>
                  <a>Log out</a>
                </Menu.Item>
              </Menu>
            )}
          </>
        )}
      </Header>
      <SideMenu
        showDrawer={showDrawer}
        handleDrawer={handleDrawer}
        logout={logout}
      />
      <LogoutModal
        logout={logout}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
      />
    </>
  )
}

export default NavBar
