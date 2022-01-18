import React from 'react';
import {BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import createInvoke from 'react-native-webview-invoke/native';
import appConsts from '../AppConsts';
import SmsRetriever from 'react-native-sms-retriever';

// 본인인증 화면
// navigate param으로 flag를 받아서 사설/공인 선택

export default class SelfAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinnerVisible: false,
            spinnerMsg: '',
            uriParam: null,
            smsListenerRegistered: false,
        };
        this.webViewRef = null;
        this.backHandler = null;
        this.invoke = createInvoke(() => this.webViewRef);
    }

    componentDidMount() {
        this.setState({uriParam: this.props.route.params.param});

        if (this.backHandler) this.backHandler.remove();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress.bind(this),
        );

        this.invokeIfs();

        // TODO 문자내용 읽어오기 등록 테스트 필요
        try {
            const registered = await SmsRetriever.startSmsRetriever();
            this.setState({smsListenerRegistered: registered});
            if (registered) {
                SmsRetriever.addSmsListener(event => {
                    console.log('[SelfAuth]', event.message);
                    // SmsRetriever.removeSmsListener();
                });
            }
        } catch (error) {
            console.log('[SelfAuth]', JSON.stringify(error));
        }
    }

    componentWillUnmount() {
        if (this.backHandler) this.backHandler.remove();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner
                    visible={this.state.spinnerVisible}
                    color={'#ff6801'}
                    textContent={this.state.spinnerMsg}
                />
                <WebView
                    sytle={{flex: 1}}
                    source={
                        this.state.uriParam === 'private'
                            ? {uri: appConsts.urlConsts.URL_PRIVATE_AUTH}
                            : {uri: appConsts.urlConsts.URL_PUBLIC_AUTH}
                    }
                    ref={webView => {
                        this.webViewRef = webView;
                    }}
                    cacheEnabled={false}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    onMessage={this.invoke.listener}
                    // onLoad={() => {
                    //     this.webViewRef.injectJavaScript('showView("vw")');
                    // }}
                />
            </View>
        );
    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    };

    navigateNext = (screen, param) => {
        // 본인인증 결과를 param에 담아서 다음 화면으로 전달
        this.props.navigation.navigate(screen, param);
    };

    getSmsPinCode = () => {
        try {
            if (smsListenerRegistered) {
                SmsRetriever.addSmsListener(event => {
                    console.log('[SelfAuth]', event.message);
                    SmsRetriever.removeSmsListener();
                    // TODO: 인증요청 버튼 onClick 으로 등록하고 문자오면 인증번호를 자동완성으로 띄워주기..?
                });
            }
        } catch (error) {
            console.log('[SelfAuth]', JSON.stringify(error));
        }
    };

    invokeIfs = () => {
        this.invoke.define('navigateNext', this.navigateNext);
    };
}
