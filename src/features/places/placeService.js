import placesAxios from '../../axios-instances/places-instance'


const createPlace = async(data) => {
  const response = await placesAxios.post('/', postData)
  return response.data
}

