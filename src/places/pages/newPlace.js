import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import placesAxios from '../../axios-instances/places-instance'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

import './PlaceForm.css'

const NewPlace = () => {

  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

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
      }
    }, 
    false
  )

  const placeSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const postData = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      address: formState.inputs.address.value,
      creator: auth.userId
    }
    console.log(postData)

    await placesAxios.post('/', postData)
      .then((response) => {
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.message || 'Something went wrong')
        console.log(error)
        console.log(err.response.data.message)
      })
      .finally(() => {
        console.log(error)
      })

    setIsLoading(false)

  }

  const errorHandler = () => {
    setError(null)
  }

  return (
  <>
    {isLoading && <LoadingSpinner asOverlay />}
    <ErrorModal error={error}  onClear={errorHandler} />
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
      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  </>
  )
}

export default NewPlace