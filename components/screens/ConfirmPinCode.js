import React from 'react';
import {View, Text, Image, TouchableOpacity, BackHandler} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../styles/styles_PinCode.js';
import {localStorage} from '../LocalStorage';
import CommonDialog from './CommonDialog.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState, useEffect, useRef} from 'react/cjs/react.development';
import PinCodeCommon from '../PinCodeCommon.js';

export default ConfirmPinCode = props => {
    const numbers = PinCodeCommon.numbers;
    let passWord = '';
    let maxLength = 6;

    const [refreshing, setRefreshing] = useState(false);
    const [pwdLength, setPwdLength] = useState(0);
    const [numPadHeight, setNumPadHeight] = useState(0);
    const [circleColor, setCircleColor] = useState('#ddd');
    const [entryScreen, setEntryScreen] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const circleRefs = useRef({});
    const wrongNoteRef = useRef(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress,
        );

        const focusListener = props.navigation.addListener('focus', () => {
            passWord = '';
            for (let i = 0; i < 6; i++) {
                PinCodeCommon.setBackgroundGray(circleRefs[i]);
            }
            console.log(
                '[ConfirmPinCode] props.route.params',
                props.route.params,
            );
            if (props.route.params !== null) {
                setEntryScreen(props.route.params.entryScreen);
            }
        });

        PinCodeCommon.shuffleNums(numbers);

        return () => {
            backHandler.remove();
            if (focusListener != null && focusListener.remove) {
                focusListener.remove();
            }
        };
    }, []); // 빈배열 선언 필수!

    const onBackPress = () => {
        setIsDialogVisible(true);
        return true;
    };

    const onLayout = event => {
        const layout = event.nativeEvent.layout;
        setNumPadHeight({numPadHeight: layout['height']});
    };

    const numClicked = item => {
        console.log(item.id);
        if (item.id === 'refresh') {
            PinCodeCommon.shuffleNums(numbers);
            refreshClicked();
            console.log('circleArray:', circleArray);
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

    const onPwdLengthChange = async () => {
        if (passWord.length === 0) {
            PinCodeCommon.setBackgroundGray(circleRefs[0]);
        } else if (passWord.length === 6) {
            PinCodeCommon.setBackgroundOrange(circleRefs[5]);

            if (props.route.params.password !== passWord) {
                wrongNoteRef.setNativeProps({
                    style: {opacity: 100},
                });
                passWord = '';
                for (let i = 0; i < 6; i++) {
                    PinCodeCommon.setBackgroundGray(circleRefs[i]);
                }
            } else {
                // 비밀번호 설정 완료
                if (entryScreen === 'MainWebView') {
                    // 비밀번호 재설정에서 진입
                    await localStorage.setUserInfoValue('password', passWord);
                    navigation.goBack();
                } else if (entryScreen === 'OnBoarding') {
                    // 앱 가입과정에서 진입
                    await localStorage.setUserInfoValue('password', passWord);
                    navigation.reset({
                        routes: [{name: 'MainWebView', params: null}],
                    });
                } else {
                    console.log('[ConfirmPinCode] unknown entryScreen!!');
                }
            }
        } else {
            PinCodeCommon.setBackgroundGray(circleRefs[passWord.length]);
            PinCodeCommon.setBackgroundOrange(circleRefs[passWord.length - 1]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CommonDialog
                visible={isDialogVisible}
                titleDisplay={'none'}
                content={
                    entryScreen === 'OnBoarding'
                        ? '뒤로 가시면 가입과정이 초기화 됩니다. 뒤로 가시겠습니까?'
                        : '뒤로 가시면 비밀번호 재설정 과정이 초기화 됩니다. 뒤로 가시겠습니까?'
                }
                cancelDisplay={'flex'}
                confirmClicked={() => {
                    setIsDialogVisible(false);
                    props.navigation.goBack();
                }}
                cancelClicked={() => {
                    setIsDialogVisible(false);
                }}
            />
            <View style={styles.actionBar}>
                <TouchableOpacity
                    onPress={() => {
                        setIsDialogVisible(true);
                    }}>
                    <Image
                        source={require('../../assets/images/icon_left.png')}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>다시한번 입력해주세요.</Text>
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
                            data={PinCodeCommon.circles}
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
                    <TouchableOpacity style={styles.btn_reset}>
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
