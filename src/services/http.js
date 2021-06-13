import axios from 'axios'
import { API_URL } from '@config/settings'
import { requestChat, responseError, headersDefault,response, requestError } from '@services/utilsHttp'

const httpChat = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: false,
})
httpChat.defaults.headers.post['Content-Type'] = 'application/json'
httpChat.defaults.headers.common = headersDefault()
httpChat.interceptors.request.use(requestChat, requestError)
httpChat.interceptors.response.use(response, responseError)

export { httpChat }
