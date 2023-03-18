import axios from 'axios'

const instance = axios.create({ // To avoid mention baseURL each time when use axios
    baseURL:'http://localhost:7000'
})

export default instance;
