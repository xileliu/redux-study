import axios from 'axios'
import {browserHistory} from 'react-router';
import {message} from 'antd';
import JSONbigString from "json-bigint"

// const host = 'http://10.10.1.10:90/';
const host = '/';
const headers = {
    'api-auth-method': 'b',
    'dealer-id': 1,
    'request-id': '',
}
const timeout = 10000 // 10s

const instance = axios.create({
  baseURL: host,
  timeout: timeout,
  headers: headers,
  transformResponse: [function (data) {
      return JSONbigString({"storeAsString": true}).parse(data);
  }]
});

// response interceptor
instance.interceptors.response.use(function (response) {

  // 如果是 token 过期，则退出登录
  if (response.data.code ==='4002') {
    console.log('token expired');
    return browserHistory.push('/app/logout');
  }

  // Do something with response data
  return response;

}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default instance
