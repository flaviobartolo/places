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
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user))
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