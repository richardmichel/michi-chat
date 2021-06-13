import { httpChat } from '@services/http';

const resource = '/chat';

export default {
    async getContacts() {
        try {
            const response = await httpChat.get(`${resource}/get-contacts`)
            if (response?.status === 200) {
                return Promise.resolve(response?.data)
            }
            return Promise.reject(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async getMessages(params) {
        try {
            const response = await httpChat.get(`${resource}/get-messages`, {params})
            if (response?.status === 200) {
                return Promise.resolve(response?.data)
            }
            return Promise.reject(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async storeMessage({payload,socket }) { 
        try {
            const response = await httpChat.post(`${resource}/store-message`, payload,{
                headers: {
                    "X-Socket-Id": socket?.socketId()
                }
            })
            if (response?.status === 200) {
                return Promise.resolve(response?.data)
            }
            return Promise.reject(response)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    

}
