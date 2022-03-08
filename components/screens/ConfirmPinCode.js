import React from 'react';
import {View, Text, Image, TouchableOpacity, BackHandler} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {styles} from '../styles/PinCode.js';
import {localStorage} from '../LocalStorage';
import CommonDialog from './CommonDialog.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const numbers = [
    {src: require('../../assets/images/icon_zero.png'), id: '0'},
    {src: require('../../assets/images/icon_one.png'), id: '1'},
    {src: require('../../assets/images/icon_two.png'), id: '2'},
    {src: require('../../assets/images/icon_three.png'), id: '3'},
    {src: require('../../assets/images/icon_four.png'), id: '4'},
    {src: require('../../assets/images/icon_five.png'), id: '5'},
    {src: require('../../assets/images/icon_six.png'), id: '6'},
    {src: require('../../assets/images/icon_seven.png'), id: '7'},
    {src: require('../../assets/images/icon_eight.png'), id: '8'},
    {src: require('../../assets/images/icon_refresh.png'), id: 'refresh'},
    {src: require('../../assets/images/icon_nine.png'), id: '9'},
    {src: require('../../assets/images/icon_delete.png'), id: 'delete'},
];
const circles = ['0', '1', '2', '3', '4', '5'];
let passWord = '';
let maxLength = 6;

export default class ConfirmPinCode extends React.Component {
    constructor() {
        super();

        this.state = {
            refreshing: false,
            pwdLength: 0,
            numPadHeight: 0,
            circleColor: '#ddd',
            isDialogVisible: false,
            entryScreen: null,
        };

        this.circleRefs = {};
        this.wrongNoteRef = null;
    }

    componentDidMount() {
        // TODO: 화면에 따라서 backHandler 등록
        if (this.backHandler) this.backHandler.remove();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress.bind(this),
        );

        this.focusListener = this.props.navigation.addListener('focus', () => {
            passWord = '';
            for (let i = 0; i < 6; i++) {
                this.circleRefs[i].setNativeProps({
                    style: {backgroundColor: '#ddd'},
                });
            }
        });

        console.log(
            '[ConfirmPinCode] this.props.route.params',
            this.props.route.params,
        );
        this.setState({entryScreen: this.props.route.params.entryScreen});
    }

    componentWillUnmount() {
        if (this.backHandler) this.backHandler.remove();
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }

    render() {
        this.shuffleNums(numbers);
        return (
            <SafeAreaView style={styles.container}>
                <CommonDialog
                    visible={this.state.isDialogVisible}
                    titleDisplay={'none'}
                    content={
                        this.state.entryScreen === 'OnBoarding'
                            ? '뒤로 가시면 가입과정이 초기화 됩니다. 뒤로 가시겠습니까?'
                            : '뒤로 가시면 비밀번호 재설정 과정이 초기화 됩니다. 뒤로 가시겠습니까?'
                    }
                    cancelDisplay={'flex'}
                    confirmClicked={() => {
                        // this.props.navigation.reset({
                        //     routes: [{name: 'OnBoarding', params: null}],
                        // });
                        this.setState({isDialogVisible: false});
                        this.onBackPress();
                    }}
                    cancelClicked={() => {
                        this.setState({isDialogVisible: false});
                    }}
                />
                <View style={styles.actionBar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({isDialogVisible: true});
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
                            <Text
                                ref={text => {
                                    this.wrongNoteRef = text;
                                }}
                                style={styles.note_wrong}>
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
                                                this.circleRefs[index] = circle;
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
                    <View style={styles.numpad} onLayout={this.onLayout}>
                        <FlatList
                            data={numbers}
                            numColumns={3}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.refreshing}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => this.numClicked(item)}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                        height: this.state.numPadHeight / 4,
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
    }

    onLayout = event => {
        const layout = event.nativeEvent.layout;
        this.setState({numPadHeight: layout['height']});
    };

    backClicked = () => {};

    numClicked = item => {
        console.log(item.id);
        if (item.id === 'refresh') {
            this.shuffleNums(numbers);
            this.refreshClicked();
            console.log('circleArray:', this.circleArray);
        } else if (item.id === 'delete') {
            passWord = passWord.slice(0, -1);
            console.log('password:', passWord);
            console.log('password Length:', passWord.length);
        } else {
            if (passWord.length < maxLength) {
                passWord += item.id;
                console.log('password:', passWord);
                console.log('password Length:', passWord.length);
                // this.state.currentColor = 'black';
            }
        }
        this.onPwdLengthChange();
    };

    shuffleNums = numbers => {
        let i = numbers.length - 1;
        let a = 0;
        for (; i > 0; i--) {
            if (i !== 9 && i !== 11) {
                const j = Math.floor(Math.random() * (i + 1));
                if (j !== 9 && i !== 11) {
                    const temp = numbers[i];
                    numbers[i] = numbers[j];
                    numbers[j] = temp;
                }
            }
        }
        return numbers;
    };

    refreshClicked = () => {
        this.setState({refreshing: true});
    };

    onPwdLengthChange = async () => {
        switch (passWord.length) {
            case 0:
                this.circleRefs[0].setNativeProps({
                    style: {backgroundColor: '#ddd'},
                });
                break;
            case 1:
                this.circleRefs[0].setNativeProps({
                    style: {backgroundColor: '#ff6801'},
                });
                this.circleRefs[1].setNativeProps({
                    style: {backgroundColor: '#ddd'},
                });
                break;
            case 2:
                this.circleRefs[1].setNativeProps({
                    style: {backgroundColor: '#ff6801'},
                });
                this.circleRefs[2].setNativeProps({
                    style: {backgroundColor: '#ddd'},
                });
                break;
            case 3:
                this.circleRefs[2].setNativeProps({
                    style: {backgroundColor: '#ff6801'},
                });
                this.circleRefs[3].setNativeProps({
                    style: {backgroundColor: '#ddd'},
                });
                break;
            case 4:
                this.circleRefs[3].setNativeProps({
                    style: {backgroundColor: '#ff6801'},
                });
                this.circleRefs[4].setNativeProps({
                    style: {backgroundColor: '#ddd'},
                });
                break;
            case 5:
                this.circleRefs[4].setNativeProps({
                    style: {backgroundColor: '#ff6801'},
                });
                this.circleRefs[5].setNativeProps({
                    style: {backgroundColor: '#ddd'},
                });
                break;
            case 6:
                this.circleRefs[5].setNativeProps({
                    style: {backgroundColor: '#ff6801'},
                });

                if (this.props.route.params.password !== passWord) {
                    this.wrongNoteRef.setNativeProps({
                        style: {opacity: 100},
                    });
                    passWord = '';
                    for (let i = 0; i < 6; i++) {
                        this.circleRefs[i].setNativeProps({
                            style: {backgroundColor: '#ddd'},
                        });
                    }
                } else {
                    // 비밀번호 설정 완료
                    if (this.state.entryScreen === 'MainWebView') {
                        // 비밀번호 재설정에서 진입
                        await localStorage.setUserInfoValue(
                            'password',
                            passWord,
                        );
                        this.props.navigation.goBack();
                    } else if (this.state.entryScreen === 'OnBoarding') {
                        // 앱 가입과정에서 진입
                        await localStorage.setUserInfoValue(
                            'password',
                            passWord,
                        );
                        this.props.navigation.reset({
                            routes: [{name: 'MainWebView', params: null}],
                        });
                    } else {
                        console.log('[ConfirmPinCode] unknown entryScreen!!');
                    }
                }
                break;
        }
    };

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };
}
