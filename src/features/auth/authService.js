import userAxios from '../../axios-instances/user-instance'

const createUser = async (data) => {
  const response = await userAxios.post('signup', data)
  if (response.data.token) {
    const expDate = expirationDate(1000 * 60 * 60)
    console.log(expDate)
    console.log(JSON.stringify(response.data, {'a': 'b'}))
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const loginUser = async (data) => {
  const response = await userAxios.post('login', data)
  console.log(response)
  if (response.data.token) {
    const expDate = expirationDate(1000 * 60 * 60)
    console.log(expDate)
    console.log(JSON.stringify(response.data, {'a': 'b'}))
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


// helper function for expiration date

const expirationDate = (ms) => {
  return (new Date(new Date().getTime() + ms)).toISOString()
}