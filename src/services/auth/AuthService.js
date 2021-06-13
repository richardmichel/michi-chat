
import { httpChat } from "@services/http";
import { API_URL, APP_TOKEN } from "@config/settings";

const resource = '/auth'
const getCloseSession = () => new Promise(  (resolve, reject) =>{
    const xmlhttp = new XMLHttpRequest();
    const params = '';
    const token =  sessionStorage.getItem(APP_TOKEN);
    const url = `${API_URL}/${resource}/api/logout`;
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xmlhttp.setRequestHeader("Authorization", `Bearer ${token}`);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/json"
    );
    xmlhttp.onload = () => {
      const { status } = xmlhttp;
      if (status === 200) {
        resolve(status);
      } else {
        reject(status);
      }
    };
    xmlhttp.send(params);
  });

export default {
  async login(payload) {
    try {
        const response = await httpChat.post(`${resource}/login`, payload);
        if (response && response.status === 200) {
            return Promise.resolve(response)
        }
        return Promise.reject(response);

    } catch (error) {
        return Promise.reject(error)
    }
},

  async logout() {
    try {
      const status = await getCloseSession();
      if (status === 200) {
        return Promise.resolve(status);
      }
      return Promise.reject(status);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
