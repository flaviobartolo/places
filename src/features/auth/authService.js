import userAxios from '../../axios-instances/user-instance'


const createUser = async (data) => {
  const response = await userAxios.post('signup', data)
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }
  return response.data
}

const loginUser = async (data) => {
  const response = await userAxios.post('login', data)
  console.log(response)
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const logoutUser = () => {
  localStorage.removeItem('user')
}


const authService = {
  createUser,
  loginUser,
  logoutUser
}

export default authService