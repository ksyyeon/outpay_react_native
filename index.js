/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {Provider} from 'react-redux';
import ActionCreators from './actions';
import initStore from './store';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('[Index] Message handled in the background!', remoteMessage);
});

mapDispatchToProps = dispatch => {
    return {
        showDialog: dialogProps => {
            dispatch(ActionCreators.showDialog(dialogProps));
        },
        hideDialog: () => {
            dispatch(ActionCreators.hideDialog());
        },
    };
};

const AppContainer = connect(mapDispatchToProps, ActionCreators)(App);

const Outpay = () => {
    <Provider store={initStore()}>
        <AppContainer />
    </Provider>;
};

AppRegistry.registerComponent(appName, () => Outpay);
