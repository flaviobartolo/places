import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getPlaceById, updatePlace,reset } from '../../features/places/placeSlice'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

import './PlaceForm.css'


const UpdatePlace = () => {
  const { isSuccess, isError, message, isLoading, place } = useSelector((state) => state.places)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const placeId = params.placeId

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

  useEffect(() => {
    try {
      dispatch(getPlaceById(placeId)).unwrap()
      if(isSuccess){
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
      }
    } catch (err) {
      console.log(err)
    }
  }, [dispatch, isSuccess])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const postData = {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value
      }
      await dispatch(updatePlace({postData, placeId})).unwrap()
      if (isSuccess){
        navigate(`/${user.id}/places`)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const errorHandler = () => {
    dispatch(reset())
    navigate(`/${user.id}/places`)
  }


  if (isError) {
    return (
      <>
      {isError && <ErrorModal error={message} onClear={errorHandler} />}
      <div className="center">
        <Card>
          <h2>Could not find that place!</h2>
        </Card>
      </div>
      </>
    )
  }

  if (isLoading){
    return <LoadingSpinner asOverlay />
  }

  return(
      <form className='place-form' onSubmit={submitHandler}>
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
  ) 
}

export default UpdatePlace