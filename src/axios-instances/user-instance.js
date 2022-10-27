import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL + '/users',
  //baseURL: 'http://localhost:5000/api/users',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance