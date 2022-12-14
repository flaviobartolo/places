import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { createUser, loginUser, reset } from '../../features/auth/authSlice'
import { ImageUpload } from '../../shared/components/FormElements/ImageUpload'

import './Auth.css'

const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(false)
  const { isLoading, isError, message} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formState, inputHandler, setFormData] = useForm({
    password: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    }
  }, false)

  const switchAuthModeHandler = () => {
    if (!isSignUp) {
      console.log('signup')
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        },
        image: {
          value: null,
          isValid: false
        }
      }, false)
    } else {
      console.log('login')
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    }
    isSignUp ? setIsSignUp(false) : setIsSignUp(true)
    // setIsSignUp((prevMode) => !prevMode) we can do it like this as shown in the lesson
  }


  const authSubmitHandler = async (e) => {
    console.log(formState.inputs)
    e.preventDefault()

    if (!isSignUp) {

      const postData = JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      })
      console.log('login')
      dispatch(loginUser(postData))

    } else {
      const formData = new FormData()
      formData.append('name', formState.inputs.name.value)
      formData.append('email', formState.inputs.email.value)
      formData.append('password', formState.inputs.password.value)
      formData.append('image', formState.inputs.image.value)
      /*
      const postData = JSON.stringify({
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      })
      */
      console.log('registo')
      dispatch(createUser(formData))
    }

  }

  const errorHandler = () => {
    dispatch(reset())
  }

  return (
    <>
      <ErrorModal error={isError && message}  onClear={errorHandler} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isSignUp ? 'Signup' : 'Login required'}</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
          {isSignUp && 
          (<>
          <Input 
            id='name'
            type='text' 
            element='input' 
            validators={[VALIDATOR_REQUIRE()]}
            placeholder='Define your username'
            label='Your Name'
            errorText='Please enter a name.'
            onInput={inputHandler}
          />
          <ImageUpload center id='image' onInput={inputHandler} errorText='Please provide an image.' />
          </>)
          }
          <Input 
            id='email'
            type='email' 
            element='input' 
            validators={[VALIDATOR_EMAIL()]}
            placeholder='Define your email'
            label='EMAIL'
            errorText='Please enter a valid email.'
            onInput={inputHandler}
          />
          <Input 
            id='password'
            type='password' 
            element='input' 
            validators={[VALIDATOR_MINLENGTH(6)]}
            placeholder='Define your password'
            label='PASSWORD'
            errorText='Your password must be longer than 5 characters.'
            onInput={inputHandler}
          />
          <Button disabled={!formState.isValid} type='submit'>{!isSignUp ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>
        <Button inverse onClick={switchAuthModeHandler} >{isSignUp ? 'SWITCH TO LOGIN' : 'SWITCH TO SIGNUP'}</Button>
      </Card>
    </>
  )
}

export default Auth