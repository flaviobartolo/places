import userAxios from '../../axios-instances/user-instance'


const getUsers = async (data) => {
  const response = await userAxios.get('/')
  return response.data.users
}


const userService = {
  getUsers
}

export default userService