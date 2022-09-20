import placesAxios from '../../axios-instances/places-instance'


const createPlace = async (data) => {
  const response = await placesAxios.post('/', data)
  console.log(response)
  return response.data.place
}

const updatePlace = async (data, placeId) => {
  const response = await placesAxios.patch(`/${placeId}`, data)
  console.log(response)
  return response.data.place
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
  getPlacesByUser,
  getPlaceById
}

export default placeService