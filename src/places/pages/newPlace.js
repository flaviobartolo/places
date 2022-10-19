import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { createPlace, reset } from '../../features/places/placeSlice'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { ImageUpload } from '../../shared/components/FormElements/ImageUpload'

import './PlaceForm.css'

const NewPlace = () => {
  const navigate = useNavigate()
  const { isSuccess, isLoading, isError, message } = useSelector((state) => state.places)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formState, InputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    }, 
    false
  )

  const placeSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', formState.inputs.title.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('address', formState.inputs.address.value)
    formData.append('creator', user.id)
    formData.append('image', formState.inputs.image.value)
    /*
    const postData = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      creator: user.id
    }
    */
    dispatch(createPlace(formData))
  }

  const errorHandler = () => {
    dispatch(reset())
  }

  useEffect(() => {
    if (isSuccess){
      dispatch(reset())
      navigate('/')
    }
  }, [navigate, isSuccess])


  return (
  <>
    {isLoading && <LoadingSpinner asOverlay />}
    <ErrorModal error={isError && message}  onClear={errorHandler} />
    <form className='place-form' onSubmit={placeSubmitHandler}>
      <Input 
        id='title'
        element='input' 
        type='text' 
        label='Title' 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText='Please enter a valid title.'
        onInput={InputHandler}
      />
      <Input 
        id='description'
        element='textarea' 
        type='text' 
        label='Description' 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText='Please enter a valid description (atleast 5 characters).'
        onInput={InputHandler}
      />
      <Input 
        id='address'
        element='input' 
        type='text' 
        label='Address' 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText='Please enter a valid address.'
        onInput={InputHandler}
      />
      <ImageUpload center id='image' onInput={InputHandler} errorText='Please provide an image.' />
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  </>
  )
}

export default NewPlace