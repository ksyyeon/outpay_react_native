import React from 'react';
import {BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import webViewConsts from '../WebViewConsts';

// 본인인증 화면
// navigate param으로 flag를 받아서 사설/공인 선택

export default class SelfAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinnerVisible: false,
            spinnerMsg: '',
        };
        this.webViewRef = null;
        this.backHandler = null;
    }

    componentDidMount() {
        if (this.backHandler) this.backHandler.remove();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackPress.bind(this),
        );

        // this.webViewRef.injectJavaScript('showView("vw")');
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
                    source={{
                        uri: webViewConsts.URL_SELFAUTH,
                    }}
                    ref={webView => {
                        this.webViewRef = webView;
                    }}
                    cacheEnabled={false}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
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
}
