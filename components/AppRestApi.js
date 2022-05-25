import Axios from './Axios';

export default (() => {
    let data = {
        hh_tel_num: '01040223839',
        user_name: '김수연',
        user_nick: null,
        hash_alg_code: 1,
        user_ssh_hash: 'x37PFErJGWbCYn7NPWZtOsJ8BIRZT73RkfdCfsYJpn4=',
        is_tac_agreed: true,
        tac_agreed_time: '20220523184206',
        is_under_age14: false,
        parent_hh_tel_num: null,
        parent_ssn_hash: null,
        ops_key_sid: 2,
        enc_secret_pwd:
            'bN22T8aMyzZLFoYUqD-cfmjw31RBDk--km413rAuKoxr6bEA4O8tpKY-SnUUwtJGTfXeBOSjOsnRBkx49xCaL8NExPLf1IixHcgu_QTHTA8KXfUeiC3QKMHMe8Ts3HWbOdQiMdxysny_uxgaExCoyKou-6ctivhf4fk-UKavFL4=',
        fcm_token: 'x37PFErJGWbCYn7NPWZtOsJ8BIRZT73RkfdCfsYJpn4=',
        user_age: null,
        user_email: null,
        pauty_poicy_sid: 2,
    };

    const appRestApi = {
        request: async (method, url, body, handler) => {
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
        },

        request_Signin: async () => {
            try {
            } catch (error) {
                console.log('request signin error:', error);
            }
        },

        request_Login: async () => {},

        postMethod: async body => {
            try {
                const result = await Axios.post('호스트 뒤에 붙을 uri', body);
                console.log('postMethod result:', result);
                return result;
            } catch (error) {
                console.log('postMethod error:', error);
            }
        },

        putMethod: async body => {
            try {
                const result = await Axios.put('호스트 뒤에 붙을 uri', body);
                console.log('postMethod result:', result);
                return result;
            } catch (error) {
                console.log('postMethod error:', error);
            }
        },
    };

    return appRestApi;
})();
