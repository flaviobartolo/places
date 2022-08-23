import React from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

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
    title: 'Empire State Building',
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
  const params = useParams()
  const placeId = params.placeId

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId)

  const [formState, InputHandler] = useForm(
    {
      title: {
        value: identifiedPlace.title,
        isValid: true
      },
      description: {
        value: identifiedPlace.description,
        isValid: true
      }
    },
    true
  )

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(formState.inputs)
  }

  if (!identifiedPlace) {
    return <div className="center">
        <h2>Could not find that place!</h2>
      </div>
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