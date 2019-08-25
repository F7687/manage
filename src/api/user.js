import axios from '@/utlis/myaxios.js'

export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    params
  })
}
export const EditStatus = (uId, type) => {
  return axios({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}
export const addusers = (obj) => {
  console.log(obj)
  return axios({
    url: 'users',
    method: 'post',
    data: obj
  })
}
export const eidtUser = (id, data) => {
  return axios({
    url: `users/${id}`,
    method: 'put',
    data
  })
}
export const deleteUser = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
