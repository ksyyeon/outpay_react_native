import React, {useEffect, useRef} from 'react';
import {BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import useState from 'react-usestateref';

export default SubWebView = props => {
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [spinnerMsg, setSpinnerMsg] = useState('');
    const [canGoBack, setCanGoBack, canGoBackRef] = useState(false);
    const webViewRef = useRef(null);

    useEffect(() => {
        console.log('component mounted');
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress,
        );
        props.navigation.setOptions({title: props.route.params.name});

        return () => {
            console.log('component will unmount');
            backHandler.remove();
        };
    }, []); // 빈배열 선언 필수!

    const onBackPress = () => {
        console.log('canGoBack:', canGoBackRef.current);
        if (canGoBackRef.current && webViewRef) {
            webViewRef.current.goBack();
        } else {
            props.navigation.goBack();
        }
        return true;
    };

    return (
        <View style={{flex: 1}}>
            <Spinner
                visible={spinnerVisible}
                color={'#ff6801'}
                textContent={spinnerMsg}
            />
            <WebView
                sytle={{flex: 1}}
                source={{
                    uri: props.route.params.uri,
                }}
                ref={webViewRef}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack);
                }}
                originWhitelist={['http://*', 'https://*', 'intent://*']}
                javaScriptEnabled={true}
                cacheEnabled={false}
                cacheMode={'LOAD_NO_CACHE'}
                incognito={true}
            />
        </View>
    );
};
