import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const getUserListApiCall = async () => {
  return await axios.get(`${API_URL}/users`)
}

export const createUserApiCall = async (userData) => {
  return await axios.post(`${API_URL}/users`, userData)
}

export const updateUserApiCall = async (userId, userData) => {
  return await axios.put(`${API_URL}/users/${userId}`, userData)
}

export const deleteUserApiCall = async (userId) => {
  return await axios.delete(`${API_URL}/users/${userId}`)
}
