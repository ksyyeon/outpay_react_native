import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';

export default class CommonDialog extends React.Component {
    render() {
        return (
            <Modal visible={this.props.visible} transparent={true}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>
                    <View
                        style={{
                            width: '80%',
                            backgroundColor: 'white',
                            elevation: 20,
                            borderRadius: 20,
                        }}>
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text
                                style={{
                                    fontFamily: 'NanumSquareB',
                                    fontSize: 16,
                                    display: this.props.titleDisplay,
                                }}>
                                {this.props.title}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'NanumSquareR',
                                    fontSize: 14,
                                    marginTop: 10,
                                    textAlign: 'center',
                                    lineHeight: 20,
                                }}>
                                {this.props.content}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderColor: '#ddd',
                                borderTopWidth: 1,
                                flexDirection: 'row',
                                height: 50,
                                justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: '#ddd',
                                    borderRightWidth: 1,
                                    display: this.props.cancelDisplay,
                                }}
                                onPress={this.props.cancelClicked}>
                                <Text
                                    style={{
                                        fontFamily: 'NanumSquareB',
                                        fontSize: 16,
                                    }}>
                                    취소
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={this.props.confirmClicked}>
                                <Text
                                    style={{
                                        fontFamily: 'NanumSquareB',
                                        fontSize: 16,
                                    }}>
                                    확인
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
