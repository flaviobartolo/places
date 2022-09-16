import placesAxios from '../../axios-instances/places-instance'


const createPlace = async (data) => {
  const response = await placesAxios.post('/', data)
  console.log(response)
  return response.data.place
}

const getPlacesByUser = async (userId) => {
  const response = await placesAxios.get(`/user/${userId}`)
  return response.data.places
}


const placeService = {
  createPlace,
  getPlacesByUser
}

export default placeService