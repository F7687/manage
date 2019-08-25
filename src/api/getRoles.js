import axios from '@/utlis/myaxios.js'
export const getAllRoles = () => {
  return axios({
    url: `roles`
  })
}
