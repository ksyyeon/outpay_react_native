import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../styles/styles_PinCode.js';
import {localStorage} from '../LocalStorage.js';
import {SafeAreaView} from 'react-native-safe-area-context';

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
let wrongCount = 0;

export default class LoginPinCode extends React.Component {
    constructor() {
        super();

        this.state = {
            refreshing: false,
            pwdLength: 0,
            numPadHeight: 0,
            circleColor: '#ddd',
            correctPassword: null,
        };

        this.circleRefs = {};
        this.wrongNoteRef = null;
        this.forgetNoteRef = null;
    }

    async componentDidMount() {
        const correctPassword = await localStorage.getUserInfoValue('password');
        this.setState({correctPassword: correctPassword});
    }

    render() {
        this.shuffleNums(numbers);
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.actionBar}></View>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        비밀번호 6자리를 입력해주세요.
                    </Text>
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
                        <TouchableOpacity
                            ref={btn => {
                                this.forgetNoteRef = btn;
                            }}
                            onPress={this.props.navigation.navigate(
                                'SetPinCode',
                                {entryScreen: 'LoginPinCode'},
                            )}
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

    onPwdLengthChange = () => {
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

                if (this.state.correctPassword !== passWord) {
                    wrongCount++;
                    console.log('wrongCount:', wrongCount);
                    if (wrongCount >= 5) {
                        this.forgetNoteRef.setNativeProps({
                            style: {opacity: 100},
                        });
                    }
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
                    this.props.navigation.reset({
                        routes: [{name: 'MainWebView', params: null}],
                    });
                }
                break;
        }
    };
}
