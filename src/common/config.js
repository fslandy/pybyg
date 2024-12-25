import axios from 'axios'

export const host = 'http://47.120.57.123'
// export const host = 'http://124.223.215.28'
// export const host = 'http://1.12.255.2/byg/bos'

export const request = axios.create({
  baseURL: host,
  timeout: 10000
})

request.interceptors.response.use((response) => {
  return response.data
})
