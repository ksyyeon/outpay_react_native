import AsyncStorage from '@react-native-async-storage/async-storage';

// UserInfo: name, telNum, email ...
export async function getUserInfo() {
    const userInfo = await AsyncStorage.getItem('@OutpayCert');
    const json = JSON.parse(userInfo);
    return JSON.stringify(json);
}

export async function setUserInfo(item) {
    await AsyncStorage.setItem('@OutpayCert', JSON.stringify(item));
}

export async function getUserInfoValue(key) {
    const userInfo = await AsyncStorage.getItem('@OutpayCert');
    const json = JSON.parse(userInfo);
    // return json[key];
    return JSON.stringify(json[key]);
}

export async function setUserInfoValue(key, value) {
    const userInfo = await AsyncStorage.getItem('@OutpayCert');
    const json = JSON.parse(userInfo);
    json[key] = value;
    await AsyncStorage.setItem('@OutpayCert', JSON.stringify(json));
}

// BlackList
export async function getBlockList() {
    const blockList = await AsyncStorage.getItem('@BlockList');
    const json = JSON.parse(blockList);
    return JSON.stringify(json);
}

export async function setBlockList(blockList) {
    await AsyncStorage.setItem('@BlockList', JSON.stringify(blockList));
}

// AppConfig: autoLogin, push ...
export async function getAppConfig() {
    const appConfig = await AsyncStorage.getItem('@AppConfig');
    return appConfig;
}

export async function setAppConfig(item) {
    await AsyncStorage.setItem('@AppConfig', JSON.stringify(item));
}

export async function getAppConfigValue(key) {
    const appConfig = await AsyncStorage.getItem('@AppConfig');
    const json = JSON.parse(appConfig);
    return JSON.stringify(json[key]);
}

export async function setAppConfigValue(key, value) {
    const appConfig = await AsyncStorage.getItem('@AppConfig');
    const json = JSON.parse(appConfig);
    json[key] = value;
    await AsyncStorage.setItem('@AppConfig', JSON.stringify(json));
}

export async function clearStorage() {
    // 탈퇴 시 기기에서 회원정보 삭제
    await AsyncStorage.removeItem('@OutpayCert');
    await AsyncStorage.removeItem('@AppConfig');
    await AsyncStorage.removeItem('@BlockList');
}
