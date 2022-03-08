import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
    // ====================== AppConfig ======================
    getAppConfig = async () => {
        const cert = await AsyncStorage.getItem('AppConfig');
        const json = JSON.parse(cert);
        return json;
    };

    setAppConfig = async item => {
        await AsyncStorage.setItem('AppConfig', JSON.stringify(item));
    };

    getAppConfigValue = async key => {
        const cert = await AsyncStorage.getItem('AppConfig');
        const json = JSON.parse(cert);
        return json[key];
    };

    setAppConfigValue = async (key, value) => {
        const cert = await AsyncStorage.getItem('AppConfig');
        const json = JSON.parse(cert);
        json[key] = value;
        await AsyncStorage.setItem('AppConfig', JSON.stringify(json));
    };

    // ====================== UserInfo ======================
    getUserInfo = async () => {
        const userInfo = await AsyncStorage.getItem('UserInfo');
        return JSON.parse(userInfo);
    };

    setUserInfo = async userInfo => {
        await AsyncStorage.setItem('BlockList', JSON.stringify(userInfo));
    };

    getUserInfoValue = async key => {
        const result = await AsyncStorage.getItem('UserInfo');
        const userInfo = JSON.parse(result);
        return userInfo[key];
    };

    setUserInfoValue = async (key, value) => {
        // const result = await AsyncStorage.getItem('UserInfo');
        // const cert = JSON.parse(result);
        // const userInfo = cert.userInfo;
        // if (userInfo[key] === null || userInfo[key] === undefined) {
        //     console.log(`[LocalStorage] No ${key} in userInfo`);
        // } else {
        //     userInfo[key] = value;
        //     cert.userInfo = userInfo;
        //     await AsyncStorage.setItem('UserInfo', JSON.stringify(cert));
        // }
        const result = await AsyncStorage.getItem('UserInfo');
        const userInfo = JSON.parse(result);
        userInfo[key] = value;
        await AsyncStorage.setItem('UserInfo', JSON.stringify(userInfo));
    };

    // ====================== RecentHistory ======================
    getRecentHistory = async () => {
        const recentHistory = await AsyncStorage.getItem('RecentHistory');
        const json = JSON.parse(recentHistory);
        return json;
    };

    setRecentHistory = async recentHistory => {
        await AsyncStorage.setItem(
            'RecentHistory',
            JSON.stringify(recentHistory),
        );
    };

    // ====================== BlockList ======================
    getBlockList = async () => {
        const blockList = await AsyncStorage.getItem('BlockList');
        const json = JSON.parse(blockList);
        return json;
    };

    setBlockList = async blockList => {
        await AsyncStorage.setItem('BlockList', JSON.stringify(blockList));
    };

    // ====================== UserVars ======================
    getUserVars = async () => {
        const userVars = await AsyncStorage.getItem('UserVars');
        const json = JSON.parse(userVars);
        return json;
    };

    setUserVars = async item => {
        await AsyncStorage.setItem('UserVars', JSON.stringify(item));
    };

    getUserVarsValue = async key => {
        const userVars = await AsyncStorage.getItem('UserVars');
        const json = JSON.parse(userVars);
        return json[key];
    };

    setUserVarsValue = async (key, value) => {
        const userVars = await AsyncStorage.getItem('UserVars');
        const json = JSON.parse(userVars);
        json[key] = value;
        await AsyncStorage.setItem('UserVars', JSON.stringify(json));
    };

    // ==========================================================
    clearStorage = async () => {
        // 탈퇴 시 기기에서 회원정보 삭제
        await AsyncStorage.removeItem('AppConfig');
        await AsyncStorage.removeItem('OutpayCert');
        await AsyncStorage.removeItem('RecentHistory');
        await AsyncStorage.removeItem('BlockList');
        await AsyncStorage.removeItem('UserVars');
    };
}

export const localStorage = new LocalStorage();
