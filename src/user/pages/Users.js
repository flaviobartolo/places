import React from 'react'
import { useEffect, useState } from 'react'

import '../components/UsersList'
import UsersList from '../components/UsersList'
import userAxios from '../../axios-instances/user-instance'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [usersList, setUsersList] = useState([])

  useEffect(() => {

    const fetchUsers = async () => {
      setIsLoading(true)
      await userAxios.get('/')
        .then((response) => {
          console.log(response.data)
          setUsersList(response.data.users)
        })
        .catch((err) => {
          console.log(err)
          setError(err.response.data.message || 'Something went wrong.')
        })
      setIsLoading(false)
    }

    fetchUsers()

  }, []) // if the dependecies array is empty it will only run once

  const errorHandler = () => {
    setError(null)
  }

  return (
    <>
      <ErrorModal error={error}  onClear={errorHandler} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && <UsersList items={usersList} />}
    </>
  )
}

export default Users