const appConsts = {
    urlConsts: {
        HOST: 'http://192.168.0.34',

        URL_INDEX: `http://192.168.0.34/osiris/.development/appIndex.html?telNum=`,
        URL_HOME: 'ifs.jsIF.showMainView("ops-home")',
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
    },
    msgConsts: {},
};
const urlConsts = appConsts.urlConsts;
const msgConsts = appConsts.msgConsts;

export {urlConsts, msgConsts};
export default appConsts;
