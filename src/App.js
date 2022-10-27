import React, { useState, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
 
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import Users from './user/pages/Users'
//import Auth from './user/pages/Auth'
//import NewPlace from './places/pages/NewPlace'
//import UpdatePlace from './places/pages/UpdatePlace'
//import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { AuthContext } from './shared/context/auth-context'


/* lazy loading - loads the components only when needed instead of loading them all as a bundle
    "The major benefit of React lazy load is performance. Loading less JavaScript code to the browser will reduce DOM load time and boost the performance of our application. Users are able to access a web page even if everything has not been loaded."
    https://reactjs.org/docs/code-splitting.html
*/
const Auth = React.lazy(() => import('./user/pages/Auth'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))

/* Finish lazyload vars */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)
  const { user } = useSelector((state) => state.auth)

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  let routes

  if (user){
    routes = (
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/:userId/places'  element={<UserPlaces />} />
          <Route path='/places/new' element={<NewPlace />} />
          <Route path='/places/:placeId' element={<UpdatePlace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
  } else {
    routes = (
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/:userId/places' element={<UserPlaces />} />
          <Route path='/auth' element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={<div className='center'><LoadingSpinner /></div>}>{routes}</Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
