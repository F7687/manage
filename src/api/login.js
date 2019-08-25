// 引入封装好的axios
import axios from '@/utlis/myaxios'

export const login = (data) => {
  // 实现登陆验证
  // axios()返回一个promise对象
  return axios({
    // url:请求的路由的名称，之前已经设置过基准路径 所以axios会进行自动拼接
    url: 'login',
    data,
    method: 'post'
  })
}
