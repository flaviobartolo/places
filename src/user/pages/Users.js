import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getUsers, reset } from '../../features/users/userSlice'
import '../components/UsersList'
import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  const {users, isLoading, isError, message} = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reset())
    dispatch(getUsers())
  }, [dispatch])

 const errorHandler = () => {
  dispatch(reset())
 }
  return (
    <>
      {isError && <ErrorModal error={message}  onClear={errorHandler} />}
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && <UsersList items={users} />}
    </>
  )
}

export default Users