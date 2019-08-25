import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let mytoken = localStorage.getItem('itcast')
  if (mytoken) {
    // 设置请求头config.headers 里面包含当前请求头的设置
    config.headers.Authorization = mytoken
  }
  // console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default axios
