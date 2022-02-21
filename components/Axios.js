import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:9090',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default Axios;
