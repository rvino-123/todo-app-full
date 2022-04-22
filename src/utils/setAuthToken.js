import { axiosClient } from '../config/axios'

// Add auth token to the headers
const setAuthToken = (token) => {
  if (token) {
    axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('token')
    if (axiosClient.defaults.headers['Authorization']) {
      delete axiosClient.defaults.headers['Authorization']
    }
  }
}

export { setAuthToken }
