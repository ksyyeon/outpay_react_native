import Axios from './Axios';

class AppRestApi {
    // NOTE: url = host뒤에 붙을 uri
    request = async (method, url, body, handler) => {
        let result = null;

        try {
            switch (method) {
                case 'GET':
                    result = await Axios.get(url);
                    break;
                case 'POST':
                    result = await Axios.post(url, body);
                    break;
                case 'PUT':
                    result = await Axios.put(url, body);
                    break;
                default:
                    console.log('Unknown method: ', method);
                    return null;
            }
        } catch (error) {
            console.log('request error:', error);
        }

        return result;
    };

    request_Login = async (telNum, password) => {};

    postMethod = async body => {
        try {
            const result = await Axios.post('호스트 뒤에 붙을 uri', body);
            console.log('postMethod result:', result);
            return result;
        } catch (error) {
            console.log('postMethod error:', error);
        }
    };

    putMethod = async body => {
        try {
            const result = await Axios.put('호스트 뒤에 붙을 uri', body);
            console.log('postMethod result:', result);
            return result;
        } catch (error) {
            console.log('postMethod error:', error);
        }
    };
}

export const appRestApi = new AppRestApi();
