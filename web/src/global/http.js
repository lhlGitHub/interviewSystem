/*
 * 组件中使用方法(以post为例):
 * this.$http.post(url,params,response=>{});
 * 使用注意：
 *  - 常用只传三个参数，避免参数过长
 *  - 传参格式：
 *    - url: {
 *        type: json|formData|multipart,
 *        api: '/user/userLogin'
 *      }
 *    - params: object | null
 *    - response: success callback
 *  - url地址对象建议使用单独的js文件管理
 */

// 引用axios
import axios from 'axios';
import Qs from 'qs';
import util from './utils';

// axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1:7001';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://prod.xxx.com';
}
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    try {
      if (config.params) {
        const keys = Object.keys(config.params);
        for (const key of keys) {
          if (util.toType(config.params[key]) === 'string') {
            config.params[key] = decodeURIComponent(config.params[key]);
          }
        }
      }
      // 在发送请求之前做些什么
      config.data = util.filterNull(config.data);
      // 统一添加token
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = token;
        // config.headers['Authorization'] = `Token ${util.getCookie('Authorization')}`
      }
      // qs转化formData
      if (
        config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded; charset=UTF-8'
      ) {
        config.data = Qs.stringify(config.data);
      }
      return config;
    } catch (error) {
      console.log('interceptors', error);
    }
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      // if(response.data.code===401){
      //   setTimeout(()=>{
      //     window.location.href = 'http://127.0.0.1:3000/#/login'
           
      //   },2000)
      // }
      return Promise.resolve(response.data);
    }
    
  },
  (error) => {
    // 对响应错误做点什么
    console.log('interceptors err', error);
    // return Promise.reject({
    //   code: response.status,
    //   message: response.data
    // })
  }
);
/*
获取请求文本类型，默认 json
*/
const getContentType = (type) => {
  if (type === 'formData')
    return {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };
  if (type === 'multipart')
    return { 'Content-Type': 'multipart/form-data; charset=UTF-8' };
  return { 'Content-Type': 'application/json; charset=UTF-8' };
};

async function apiAxios(method, url, params, success) {
  const res = await axios({
    method: method,
    url: url,
    headers: getContentType(url.type),
    data: method === 'POST' || method === 'PUT' ? params : null,
    dataType: 'json',
    params: method === 'GET' || method === 'DELETE' ? params : null,
    withCredentials: true,
  });
  return res;
}

export default {
  async get(url, params, success) {
    const res = await apiAxios('GET', url, params, success);
    return res;
  },
  async post(url, params, success) {
    const res = await apiAxios('POST', url, params, success);
    return res;
  },
  async put(url, params, success) {
    const res = await apiAxios('PUT', url, params, success);
    return res;
  },
  async delete(url, params, success) {
    const res = await apiAxios('DELETE', url, params, success);
    return res;
  },
};
