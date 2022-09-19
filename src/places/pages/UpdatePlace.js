import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getPlaceById, reset } from '../../features/places/placeSlice'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'


import './PlaceForm.css'


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



const UpdatePlace = () => {

  const { isSuccess, isError, message, isLoading, place } = useSelector((state) => state.places)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const params = useParams()
  const placeId = params.placeId

  useEffect(() => {
    dispatch(getPlaceById(placeId))
  }, [dispatch, placeId])

  const [formState, InputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: true
      },
      description: {
        value: '',
        isValid: true
      }
    },
    true
  )

  //const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId)
  
  useEffect(() => {
    if(isSuccess && place){
      console.log(place.title)
      setFormData({
        title: {
          value: place.title,
          isValid: true
        },
        description: {
          value: place.description,
          isValid: true
        }
      }, 
      true)
      console.log(formState)
    }
  }, [setFormData, place])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(formState.inputs)
  }

  if (!place) {
    return <div className="center">
        <Card>
          <h2>Could not find that place!</h2>
        </Card>
      </div>
  }

  if (isLoading){
    return <h2>Loading...</h2>
  }

  return <form className='place-form' onSubmit={submitHandler}>
      <Input 
        id='title'
        element='input' 
        type='text' 
        label='title' 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText='Please enter a valid title' 
        onInput={InputHandler} 
        initialValue={formState.inputs.title.value} 
        initialValid={formState.inputs.title.isValid} 
      />
      <Input 
        id='description' 
        element='textarea' 
        label='description' 
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (atleast 5 characters).' 
        onInput={InputHandler} 
        initialValue={formState.inputs.description.value} 
        initialValid={formState.inputs.description.isValid} 
      />
      <Button  type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
    </form>
}

export default UpdatePlace