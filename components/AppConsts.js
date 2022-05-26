const appConsts = {
    URL_CD: {
        HOST: 'http://192.168.0.34',

        URL_INDEX: `http://192.168.0.34/osiris/.development/appIndex.html?telNum=`,
        URL_HOME: 'ifs.jsIF.showMainView("ops-payreqs")',
        URL_RSHOP: 'ifs.jsIF.showMainView("ops-rshop")',
        URL_EVENT: 'ifs.jsIF.showMainView("ops-event")',
        URL_SETTINGS: 'ifs.jsIF.showMainView("ops-settings")',
        URL_PRIVATE_AUTH:
            'http://192.168.0.34/osiris/.development/pauthIndex.html?atum=local&opMode=devMode&pltMode=pcMode&pauthType=private',
        URL_PUBLIC_AUTH:
            'http://192.168.0.34/osiris/.development/pauthIndex.html?atum=local&opMode=devMode&pltMode=pcMode&pauthType=public',

        URL_BACKVIEW: 'ifs.jsIF.showBackView()',
        URL_CONNECT_FAIL: '',
        URL_NETWORK_CONNECT_FAIL: '',
        URL_BLANK: 'about:blank',
        INJECTED_CODE: `
            HTML5 History API 대응
            (function() {
                function wrap(fn) {
                    return function wrapper() {
                        var res = fn.apply(this, arguments);
                        window.ReactNativeWebView.postMessage('navigationStateChange');
                        return res;
                    }
                }

                history.pushState = wrap(history.pushState);
                history.replaceState = wrap(history.replaceState);
                window.addEventListener('popstate', function() {
                    window.ReactNativeWebView.postMessage('navigationStateChange');
                });
            })();
            true;
        `,
    },
    MSG_CD: {},
    FCM_CD: {
        PAYREQ: '00',
        EXPREQ: '01',
    },
};
const URL_CD = appConsts.URL_CD;
const MSG_CD = appConsts.MSG_CD;

export {URL_CD, MSG_CD};
export default appConsts;
