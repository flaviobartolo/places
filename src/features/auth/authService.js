import userAxios from '../../axios-instances/user-instance'


const createUser = async (data) => {
  const response = await userAxios.post('signup', data)
  return response.data
}

const loginUser = async (data) => {
  const response = await userAxios.post('login', data)
  return response.data
}

const authService = {
  createUser,
  loginUser
}

export default authService