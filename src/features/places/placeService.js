import placesAxios from '../../axios-instances/places-instance'

const createPlace = async (data) => {
  const loggedUser = JSON.parse(localStorage.getItem('user'))
  placesAxios.defaults.headers['Authorization'] = 'Bearer ' + loggedUser.token
  const response = await placesAxios.post('/', data)
  return response.data.place
}

const updatePlace = async (data, placeId) => {
  const loggedUser = JSON.parse(localStorage.getItem('user'))
  placesAxios.defaults.headers['Authorization'] = 'Bearer ' + loggedUser.token
  const response = await placesAxios.patch(`/${placeId}`, data)
  console.log(response)
  return response.data.place
}

const deletePlace = async (placeId) => {
  const loggedUser = JSON.parse(localStorage.getItem('user'))
  placesAxios.defaults.headers['Authorization'] = 'Bearer ' + loggedUser.token
  const response = await placesAxios.delete(`/${placeId}`)
  console.log(response)
  return response.data
}

const getPlacesByUser = async (userId) => {
  const response = await placesAxios.get(`/user/${userId}`)
  console.log(response)
  return response.data.places
}

const getPlaceById = async (placeId) => {
  const response = await placesAxios.get(`/${placeId}`)
  return response.data.place
}


const placeService = {
  createPlace,
  updatePlace,
  deletePlace,
  getPlacesByUser,
  getPlaceById
}

export default placeService