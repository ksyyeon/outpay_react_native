import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../styles/styles_PinCode.js';
import {localStorage} from '../LocalStorage.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react/cjs/react.production.min';
import PinCodeCommon from '../PinCodeCommon.js';

export default LoginPinCode = props => {
    let numbers = PinCodeCommon.numbers;
    let passWord = '';
    let maxLength = 6;
    let wrongCount = 0;

    const [refreshing, setRefreshing] = useState(false);
    const [numPadHeight, setNumPadHeight] = useState(0);
    const [correctPassword, setCorrectPassword] = useState(null);

    const circleRefs = useRef({});
    const wrongNoteRef = useRef(null);
    const forgetNoteRef = useRef(null);

    useEffect(async () => {
        const correctPassword = await localStorage.getUserInfoValue('password');
        setCorrectPassword(correctPassword);

        PinCodeCommon.shuffleNums(numbers);
    }, []);

    const onLayout = event => {
        const layout = event.nativeEvent.layout;
        setNumPadHeight({numPadHeight: layout['height']});
    };

    const backClicked = () => {};

    const numClicked = item => {
        console.log(item.id);
        if (item.id === 'refresh') {
            PinCodeCommon.shuffleNums(numbers);
            refreshClicked();
        } else if (item.id === 'delete') {
            passWord = passWord.slice(0, -1);
            console.log('password:', passWord);
            console.log('password Length:', passWord.length);
        } else {
            if (passWord.length < maxLength) {
                passWord += item.id;
                console.log('password:', passWord);
                console.log('password Length:', passWord.length);
            }
        }
        onPwdLengthChange();
    };

    const refreshClicked = () => {
        setRefreshing(true);
    };

    const onPwdLengthChange = () => {
        if (passWord.length === 0) {
            PinCodeCommon.setBackgroundGray(circleRefs[0]);
        } else if (passWord.length === 6) {
            PinCodeCommon.setBackgroundOrange(circleRefs[5]);

            if (correctPassword !== passWord) {
                wrongCount++;
                console.log('wrongCount:', wrongCount);
                if (wrongCount >= 5) {
                    forgetNoteRef.setNativeProps({
                        style: {opacity: 100},
                    });
                }
                wrongNoteRef.setNativeProps({
                    style: {opacity: 100},
                });
                passWord = '';
                for (let i = 0; i < 6; i++) {
                    PinCodeCommon.setBackgroundGray(circleRefs[i]);
                }
            } else {
                props.navigation.reset({
                    routes: [{name: 'MainWebView', params: null}],
                });
            }
        } else {
            PinCodeCommon.setBackgroundGray(circleRefs[passWord.length]);
            PinCodeCommon.setBackgroundOrange(circleRefs[passWord.length - 1]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.actionBar}></View>
            <View style={styles.header}>
                <Text style={styles.title}>비밀번호 6자리를 입력해주세요.</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.wrapper1}>
                    <View>
                        <Text ref={wrongNoteRef} style={styles.note_wrong}>
                            입력하신 비밀번호가 다릅니다.
                        </Text>
                    </View>
                    <View style={styles.circles}>
                        <FlatList
                            data={circles}
                            numColumns={6}
                            renderItem={({item, index}) => {
                                return (
                                    <View
                                        ref={circle => {
                                            circleRefs[index] = circle;
                                        }}
                                        style={styles.item_circle}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                        />
                    </View>
                </View>
                <View style={styles.wrapper2}>
                    <TouchableOpacity
                        ref={forgetNoteRef}
                        onPress={props.navigation.navigate('SetPinCode', {
                            entryScreen: 'LoginPinCode',
                        })}
                        style={styles.btn_reset}>
                        <Text
                            style={{
                                color: 'gray',
                                fontFamily: 'NanumSquareR',
                                textDecorationLine: 'underline',
                            }}>
                            비밀번호를 잊으셨나요?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.numpad} onLayout={onLayout}>
                    <FlatList
                        data={numbers}
                        numColumns={3}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={refreshing}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => numClicked(item)}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    height: numPadHeight / 4,
                                }}>
                                <View>
                                    <Image
                                        source={item.src}
                                        style={
                                            item.id === 'refresh' ||
                                            item.id === 'delete'
                                                ? styles.item_ctl
                                                : styles.item_num
                                        }
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};
