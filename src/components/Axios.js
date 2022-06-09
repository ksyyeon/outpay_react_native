import axios from 'axios';

export default (() => {
    const Axios = axios.create({
        baseURL: 'http://localhost:9090',
        // baseURL: 'http://192.168.0.34:3000',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    return Axios;
})();

// export default Axios;
