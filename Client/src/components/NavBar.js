import React from 'react'

import {useAuth0} from '../react-auth0-spa'

import {Link} from 'react-router-dom'

const NavBar = () => {
  const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}> Login </button>
      )}
      {isAuthenticated && <button onClick={() => logout()}> Log out</button>}

      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/profile">Profile</Link>
          <Link to="/external-api">External API</Link>
          <Link to="/post-csv">Post CVS</Link>
          <Link to="/create-chart">Create Chart</Link>
        </span>
      )}
    </div>
  )
}

export default NavBar
