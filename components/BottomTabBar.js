import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

export default class BottonTabBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'home',
        };
    }

    handleBottomTab = label => {
        console.log('press tab: ', label);
        this.setState({selected: label});
        console.log('selected label:', this.state.selected);
        this.props.onPress(label);
    };

    render() {
        return (
            this.props.visible && (
                <View style={styles.container}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.tab}
                        onPress={() => {
                            this.handleBottomTab('home');
                        }}>
                        <Image
                            source={require('../assets/images/icon_home.png')}
                            style={
                                this.state.selected === 'home'
                                    ? styles.selected_image
                                    : styles.image
                            }
                        />
                        <Text
                            style={
                                this.state.selected === 'home'
                                    ? styles.selected_label
                                    : styles.label
                            }>
                            홈
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.tab}
                        onPress={() => {
                            this.handleBottomTab('rshop');
                        }}>
                        <Image
                            source={require('../assets/images/icon_heart.png')}
                            style={
                                this.state.selected === 'rshop'
                                    ? styles.selected_image
                                    : styles.image
                            }
                        />
                        <Text
                            style={
                                this.state.selected === 'rshop'
                                    ? styles.selected_label
                                    : styles.label
                            }>
                            추천쇼핑
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.tab}
                        onPress={() => {
                            this.handleBottomTab('event');
                        }}>
                        <Image
                            source={require('../assets/images/icon_gift.png')}
                            style={
                                this.state.selected === 'event'
                                    ? styles.selected_image
                                    : styles.image
                            }
                        />
                        <Text
                            style={
                                this.state.selected === 'event'
                                    ? styles.selected_label
                                    : styles.label
                            }>
                            이벤트
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.tab}
                        onPress={() => {
                            this.handleBottomTab('settings');
                        }}>
                        <Image
                            source={require('../assets/images/icon_settings.png')}
                            style={
                                this.state.selected === 'settings'
                                    ? styles.selected_image
                                    : styles.image
                            }
                        />
                        <Text
                            style={
                                this.state.selected === 'settings'
                                    ? styles.selected_label
                                    : styles.label
                            }>
                            설정
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffff',
        borderTopColor: '#f0f0f0',
        borderTopWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowRadius: 2,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        flex: 1,
        flexDirection: 'column',
        // borderRightColor: '#f0f0f0',
        // borderRightWidth: 1,
    },

    selected_image: {
        height: 18,
        width: 18,
        alignSelf: 'center',
        marginBottom: 3,
        tintColor: '#ff6801',
    },

    selected_label: {
        textAlign: 'center',
        color: '#ff6801',
        fontFamily: 'NanumSquareB',
    },

    image: {
        height: 18,
        width: 18,
        alignSelf: 'center',
        marginBottom: 3,
        tintColor: '#ced4da',
    },
    label: {
        textAlign: 'center',
        color: '#ced4da',
        fontFamily: 'NanumSquareR',
    },
});
