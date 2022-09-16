import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPlacesByUser, reset } from '../../features/places/placeSlice'

import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'


const UserPlaces = () => {

  const params = useParams()
  const userId = params.userId
  const dispatch = useDispatch()
  const {places, isError, errors, isLoading, message} = useSelector((state) => state.places)

  useEffect(() => {
    dispatch(getPlacesByUser(userId))
  }, [dispatch, userId])

  const errorHandler = () => {
    dispatch(reset())
  }

  return (
    <>
      <ErrorModal error={isError && message}  onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {(!isLoading && !isError) && <PlaceList items={places} /> }
    </>
  )
}

export default UserPlaces