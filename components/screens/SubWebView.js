import React from 'react';
import {BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SubWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinnerVisible: false,
            spinnerMsg: '',
            canGoBack: false,
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
                        uri: this.props.route.params.uri,
                    }}
                    ref={webView => {
                        this.webViewRef = webView;
                    }}
                    onNavigationStateChange={navState => {
                        this.state.canGoBack = navState.canGoBack;
                    }}
                    cacheEnabled={false}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                />
            </View>
        );
    }

    onBackPress = () => {
        if (this.state.canGoBack && this.webViewRef) {
            this.webViewRef.goBack();
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };
}
