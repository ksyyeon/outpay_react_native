import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

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
const padColumns = 3;
let passWord = '';
let passWord2 = '';
let maxLength = 6;

export default class ConfirmPinCode extends React.Component {
    constructor() {
        super();

        this.state = {
            refreshing: false,
            pwdLength: 0,
            numPadHeight: 0,
            circleColor: '#ddd',
        };

        this.circleRefs = {};
    }

    render() {
        this.shuffleNums(numbers);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>다시 한번 입력해주세요.</Text>
                </View>
                <View style={styles.content}>
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
                                        style={{
                                            width: 15,
                                            height: 15,
                                            alignItems: 'center',
                                            backgroundColor:
                                                this.state.circleColor,
                                            borderRadius: 15 / 2,
                                            marginRight: 10,
                                        }}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                        />
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
            </View>
        );
    }

    onLayout = event => {
        const layout = event.nativeEvent.layout;
        this.setState({numPadHeight: layout['height']});
    };

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
                break;
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffff',
    },
    header: {
        width: '100%',
        height: '30%',
        backgroundColor: '#ffff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: '#f3985a',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#d6ca1a',
    },
    footer: {
        width: '100%',
        height: '40%',
        // backgroundColor: '#ff9a9a',
    },
    logo_image: {
        resizeMode: 'contain',
        width: 150,
    },
    title: {
        fontFamily: 'NanumSquareB',
        fontSize: 18,
        marginBottom: 30,
    },

    circles: {
        width: '100%',
        alignItems: 'center',
    },

    item_circle: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        flex: 1,
    },

    numpad: {
        flexDirection: 'row',
        flex: 1,
    },

    item_num: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },

    item_ctl: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});
