import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import './Auth.css'

const Auth = () => {

  const [formState, inputHandler] = useForm({
    password: {
      value: '',
      isValid: false
    },
    email: {
      value: '',
      isValid: false
    }
  }, false)

  const loginHandler = (e) => {
    e.preventDefault()
    console.log(formState.inputs)
  }

  return <Card className='authentication'>
    <h2>Login required</h2>
    <hr/>
    <form onSubmit={loginHandler}>
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
        validators={[VALIDATOR_MINLENGTH(5)]}
        placeholder='Define your password'
        label='PASSWORD'
        errorText='Your password must be longer than 5 characters.'
        onInput={inputHandler}
      />
      <Button disabled={!formState.isValid} type='submit'>LOGIN</Button>
    </form>
  </Card>
}

export default Auth