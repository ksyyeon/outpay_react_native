import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUserInfo() {
    const userInfo = await AsyncStorage.getItem('@OutpayCert');
    return userInfo;
}

export async function setUserInfo(item) {
    await AsyncStorage.setItem('@OutpayCert', JSON.stringify(item));
}

export async function getUserInfoValue(key) {
    const userInfo = await AsyncStorage.getItem('@OutpayCert');
    const json = JSON.parse(userInfo);
    return json[key];
}

export async function setUserInfoValue(key, value) {
    const userInfo = await AsyncStorage.getItem('@OutpayCert');
    const json = JSON.parse(userInfo);
    json[key] = value;
    await AsyncStorage.setItem('@OutpayCert', JSON.stringify(json));
}

//TODO addUserInfo(key, value)
