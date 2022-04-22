import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = process.env.

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export { axiosClient }
