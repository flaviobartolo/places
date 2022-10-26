import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from '../../../features/auth/authSlice'
import './NavLinks.css'

const NavLinks = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const logoutHandler = async () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return <ul className="nav-links">
    <li>
      <NavLink to='/'>ALL USERS</NavLink>
    </li>
    {user && (
    <li>
      <NavLink to={`/${user.userId}/places`}>MY PLACES</NavLink>
    </li>
    )}
    {user && (
    <li>
      <NavLink to='/places/new'>ADD PLACE</NavLink>
    </li>
    )}
    {!user && (
    <li>
      <NavLink to='/auth'>AUTHENTICATE</NavLink>
    </li>
    )}
    {user && (
      <button onClick={logoutHandler}>LOGOUT</button>
    )}
  </ul>
}

export default NavLinks