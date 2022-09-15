import placesAxios from '../../axios-instances/places-instance'


const createPlace = async (data) => {
  const response = await placesAxios.post('/', data)
  console.log(response)
  return response.data.place
}

const placeService = {
  createPlace,
}

export default placeService