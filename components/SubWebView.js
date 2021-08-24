import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

export default class SubWebView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            text: '',
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner
                    visible={this.state.visible}
                    color={'#ff6801'}
                    textContent={this.state.text}
                />
                <WebView
                    sytle={{flex: 1}}
                    source={{
                        uri: this.props.route.params.uri,
                    }}
                    ref={webView => {
                        this.webView = webView;
                    }}
                    cacheEnabled={false}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                />
            </View>
        );
    }
}
