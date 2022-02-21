import Axios from './Axios';

class AppRestApi {
    getMethod = async () => {
        try {
            const result = await Axios.get('호스트 뒤에 붙을 uri');
            console.log('getMethod result:', result);
            return result;
        } catch (error) {
            console.log('getMethod error:', error);
        }
    };

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
