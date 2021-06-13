export const STATUS = 'dev';
export const STATUS_SOCKET = 'dev';
export const APP_TOKEN = 'MY_CHAT_TOKEN';
export const userId = 2;

export const BASE_URL = {
    'local': 'http://127.0.0.1:8001',
    'dev': 'https://whispering-dusk-32822.herokuapp.com',
    'qa': '',
    'production': '',
};

export const API_URL = BASE_URL[STATUS] ;


export const BASE_URL_SOCKET = {
    local: 'http://127.0.0.1:3000',
    dev: 'https://whispering-dusk-32822.herokuapp.com',
    production: '',
};

export const BASE_URL_AUTH_SOCKET = {
    local: `${BASE_URL_SOCKET[STATUS_SOCKET]}/broadcasting/auth`, // api/
    dev: `${BASE_URL_SOCKET[STATUS_SOCKET]}/broadcasting/auth`,
    production: '',
};


export const configSocket = {
    host: BASE_URL_SOCKET[STATUS_SOCKET],
    authEndpoint:  BASE_URL_AUTH_SOCKET[STATUS_SOCKET]
}

export const MESSAGES  = {
    'error500': 'Existió un error al ejecutar la acción.'
}