import { axiosClient } from '../../config/axios'

export const login = async (formData) => {
  const { email, password } = formData
  console.log(formData)
  const config = {
    method: 'post',
    url: '/auth/login',
    data: {
      email,
      password,
    },
  }
  const user = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)

  return user
}

export const register = async (formData) => {
  const { email, firstName, lastName, password } = formData

  const config = {
    method: 'post',
    url: '/auth',
    data: {
      email,
      firstName,
      lastName,
      password,
    },
  }
  const user = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)

  return user
}

export const getUserData = async () => {
  const config = {
    method: 'get',
    url: '/auth/user',
  }
  const user = await axiosClient(config)
    .then((res) => res)
    .catch((err) => err)

  return user
}
