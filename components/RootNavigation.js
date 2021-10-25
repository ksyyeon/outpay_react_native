import {createNavigationContainerRef} from '@react-navigation/native';
import {StackActions} from '@react-navigation/routers';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
    console.log('[RootNavigation] navigate called');
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function push(name, params) {
    console.log('[RootNavigation] push called');
    navigationRef.current &&
        navigationRef.current.dispatch(StackActions.push(name, params));
}
