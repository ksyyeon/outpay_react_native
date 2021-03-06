import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import createInvoke from 'react-native-webview-invoke/native';
import appConsts from '../AppConsts';
import useState from 'react-usestateref';

// 본인인증 화면
// navigate param으로 flag를 받아서 사설/공인 선택

export default SelfAuth = () => {
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [spinnerMsg, setSpinnerMsg] = useState('');
    const [uriParam, setUriParam] = useState(null);

    const webViewRef = useRef(null);
    const invoke = createInvoke(() => webViewRef.current);

    useEffect(() => {
        setUriParam(props.route.params.param);
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress,
        );

        invoke.define('navigateNext', navigateNext);

        return () => {
            backHandler.remove();
        };
    }, []);

    const onBackPress = () => {
        props.navigation.goBack();
        return true;
    };

    const navigateNext = (screen, param) => {
        // 본인인증 결과를 param에 담아서 다음 화면으로 전달
        props.navigation.navigate(screen, param);
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
                source={
                    uriParam === 'private'
                        ? {uri: appConsts.URL_CD.URL_PRIVATE_AUTH}
                        : {uri: appConsts.URL_CD.URL_PUBLIC_AUTH}
                }
                ref={webViewRef}
                cacheEnabled={false}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                onMessage={invoke.listener}
                onLoad={() => {
                    webViewRef.injectJavaScript('showView("vw")');
                }}
            />
        </View>
    );
};
