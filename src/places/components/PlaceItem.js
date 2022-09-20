import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'

import './PlaceItem.css'

const PlaceItem = (props) => {
  const { user } = useSelector((state) => state.auth)
  const [showMap, setShowMap] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const toggleShowMapHandler = () => {
    showMap ? setShowMap(false) : setShowMap(true)
  }

  const toggleShowDeleteModalHandler = () => {
    showDeleteModal ? setShowDeleteModal(false) : setShowDeleteModal(true)
  }

  const confirmDeleteHandler = () => {
    console.log('DUMMY MSG - DELETING THIS PLACE')
    setShowDeleteModal(false)
  }

  return <>
      <Modal 
        show={showMap} 
        onCancel={toggleShowMapHandler} 
        header={props.address} 
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={toggleShowMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal 
        header='Are you sure?' 
        footerClass='place-item__modal-actions' 
        footer={
          <>
            <Button inverse onClick={toggleShowDeleteModalHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler} >DELETE</Button>
          </>
        }
        show={showDeleteModal}
        onCancel={toggleShowDeleteModalHandler}
      >
        <p>Do you want to proceed and delete this place? please note it can't be undone after.</p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={toggleShowMapHandler}>VIEW ON MAP</Button>
            {(user && user.id === props.creatorId) &&
              <Button to={`/places/${props.id}`}>EDIT</Button>
            }
            {(user && user.id === props.creatorId) &&
              <Button danger onClick={toggleShowDeleteModalHandler}>DELETE</Button>
            }
          </div>
        </Card>
      </li>
    </>
}

export default PlaceItem