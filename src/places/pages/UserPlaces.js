import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPlacesByUser } from '../../features/places/placeSlice'

import PlaceList from '../components/PlaceList'


const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrappers in the world!',
    imageUrl: 'https://media-manager.noticiasaominuto.com/1920/naom_5e162968da173.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building 2',
    description: 'One of the most famous sky scrappers in the world!',
    imageUrl: 'https://media-manager.noticiasaominuto.com/1920/naom_5e162968da173.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  }
]

const UserPlaces = () => {

  const params = useParams()
  const userId = params.userId
  const dispatch = useDispatch()
  const {places, isError, errors, isLoading, message} = useSelector((state) => state.places)

  useEffect(() => {
    console.log(userId)
    dispatch(getPlacesByUser(userId))
  }, [dispatch, userId])

  console.log(places)

  return <PlaceList items={DUMMY_PLACES} />
}

export default UserPlaces