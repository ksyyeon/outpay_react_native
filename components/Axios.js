import axios from 'axios';

const Axios = axios.create({
    // baseURL: 'http://localhost:9090',
    baseURL: 'http://192.168.0.34:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default Axios;
