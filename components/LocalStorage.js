import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
    // UserInfo: name, telNum, email ...
    getUserInfo = async () => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        const json = JSON.parse(userInfo);
        // return JSON.stringify(json);
        return json;
    };

    setUserInfo = async item => {
        await AsyncStorage.setItem('@OutpayCert', JSON.stringify(item));
    };

    getUserInfoValue = async key => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        const json = JSON.parse(userInfo);
        return json[key];
    };

    setUserInfoValue = async (key, value) => {
        const userInfo = await AsyncStorage.getItem('@OutpayCert');
        const json = JSON.parse(userInfo);
        json[key] = value;
        await AsyncStorage.setItem('@OutpayCert', JSON.stringify(json));
    };

    // 최근 부탁한 결제자 목록
    getRecentHistory = async () => {
        const recentHistory = await AsyncStorage.getItem('@RecentHistory');
        const json = JSON.parse(recentHistory);
        return json;
    };

    setRecentHistory = async recentHistory => {
        await AsyncStorage.setItem(
            '@RecentHistory',
            JSON.stringify(recentHistory),
        );
    };

    // 수신자 차단 목록
    getBlockList = async () => {
        const blockList = await AsyncStorage.getItem('@BlockList');
        const json = JSON.parse(blockList);
        return json;
    };

    setBlockList = async blockList => {
        await AsyncStorage.setItem('@BlockList', JSON.stringify(blockList));
    };

    // AppConfig: autoLogin, push ...
    getAppConfig = async () => {
        const appConfig = await AsyncStorage.getItem('@AppConfig');
        const json = JSON.parse(appConfig);
        return json;
    };

    setAppConfig = async item => {
        await AsyncStorage.setItem('@AppConfig', JSON.stringify(item));
    };

    getAppConfigValue = async key => {
        const appConfig = await AsyncStorage.getItem('@AppConfig');
        const json = JSON.parse(appConfig);
        return json[key];
    };

    setAppConfigValue = async (key, value) => {
        const appConfig = await AsyncStorage.getItem('@AppConfig');
        const json = JSON.parse(appConfig);
        json[key] = value;
        await AsyncStorage.setItem('@AppConfig', JSON.stringify(json));
    };

    clearStorage = async () => {
        // 탈퇴 시 기기에서 회원정보 삭제
        await AsyncStorage.removeItem('@OutpayCert');
        await AsyncStorage.removeItem('@AppConfig');
        await AsyncStorage.removeItem('@BlockList');
    };
}

export const localStorage = new LocalStorage();
