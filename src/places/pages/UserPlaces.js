import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPlacesByUser, reset, resetWithData, removePlace } from '../../features/places/placeSlice'

import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'


const UserPlaces = () => {

  const params = useParams()
  const userId = params.userId
  const dispatch = useDispatch()
  const {places, isError, isLoading, message} = useSelector((state) => state.places)

  useEffect(() => {
    dispatch(getPlacesByUser(userId))
  }, [dispatch, userId])

  const errorHandler = () => {
    dispatch(resetWithData())
  }

  const placeDeleteHandler = (removePlaceId) => {
    dispatch(removePlace({removePlaceId}))
  }

  return (
    <>
      <ErrorModal error={isError && message}  onClear={errorHandler} />
      {isLoading && <div className='center'><LoadingSpinner asOverlay /></div>}
      {(!isLoading && !isError) && <PlaceList items={places} onDeletePlace={placeDeleteHandler} /> }
    </>
  )
}

export default UserPlaces