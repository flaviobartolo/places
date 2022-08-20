import React from 'react'
import '../components/UsersList'
import UsersList from '../components/UsersList'

const Users = () => {

  const DUMMY_USERS = [
    {
      id: 'u1', 
      image: 'https://media.fortniteapi.io/images/51d30a24ab77d09644e0db6a9ea14ddc/transparent.png', 
      name: 'Dummy1',
      places: 3
    },
    {
      id: 'u2', 
      image: 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png', 
      name: 'Dummy2',
      places: 1
    }
  ]

  return <UsersList items={DUMMY_USERS} />
}

export default Users