import AsyncStorage from '@react-native-async-storage/async-storage';

// UserInfo: name, telNum, email, blackList ...
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

// export async function addBlackList(telNum) {
//     const userInfo = await AsyncStorage.getItem('@OutpayCert');
//     const json = JSON.parse(userInfo);
//     const blackList = JSON.parse(json['blackList']);
//     blackList.push[telNum];
//     json['blackList'] = JSON.stringify(blackList);
//     await AsyncStorage.setItem('@OutpayCert', JSON.stringify(json));
// }

// AppInfo: autoLogin, push ...
export async function getAppInfo() {
    const userInfo = await AsyncStorage.getItem('@AppConfig');
    return userInfo;
}

export async function setAppInfo(item) {
    await AsyncStorage.setItem('@AppConfig', JSON.stringify(item));
}

export async function getAppInfoValue(key) {
    const userInfo = await AsyncStorage.getItem('@AppConfig');
    const json = JSON.parse(userInfo);
    return JSON.stringify(json[key]);
}

export async function setAppInfoValue(key, value) {
    const userInfo = await AsyncStorage.getItem('@AppConfig');
    const json = JSON.parse(userInfo);
    json[key] = value;
    await AsyncStorage.setItem('@AppConfig', JSON.stringify(json));
}

//TODO addUserInfo(key, value)
