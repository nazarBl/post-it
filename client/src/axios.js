import axios from 'axios'

const instance = axios.create({ // To avoid mention baseURL each time when use axios
    baseURL:'http://localhost:7000'
})

// middleware to check if there is token in localStorage(auth checking)
instance.interceptors.request.use((config)=>{ 
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
})
export default instance;
