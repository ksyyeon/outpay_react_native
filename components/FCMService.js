import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListener(
            onRegister,
            onNotification,
            onOpenNotification,
        );
    };

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    };

    checkPermission = onRegister => {
        console.log('[FCMService] checkPermission called');
        messaging()
            .hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getToken(onRegister);
                } else {
                    this.requestPermission(onRegister);
                }
            })
            .catch(error => {
                console.log('[FCMService] Permission rejected ', error);
            });
    };

    requestPermission = onRegister => {
        console.log('[FCMService] requestPermission called');
        messaging()
            .requestPermission()
            .then(enabled => {
                console.log('[FCMService] requestPermission result', enabled);
                this.getToken(onRegister);
            })
            .catch(error => {
                console.log('[FCMService] Request Permission rejected', error);
            });
    };

    getToken = async onRegister => {
        messaging()
            .getToken()
            .then(token => {
                if (token) {
                    onRegister(token);
                } else {
                    console.log(
                        '[FCMService] User does not have a device token',
                    );
                }
            })
            .catch(error => {
                console.log('[FCMService] getToken rejected', error);
            });
    };

    deleteToken = () => {
        messaging()
            .deleteToken()
            .catch(error => {
                console.log('[FCMService] Delete token error', error);
            });
    };

    createNotificationListener = (
        onRegister,
        onNotification,
        onOpenNotification,
    ) => {
        // ?????? ???????????? ??????????????? ?????? ?????? ?????????????????? ???????????? ???????????? ?????????
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                '[FCMService] onNotificationOpenedApp Notification caused app to open',
            );
            if (remoteMessage) {
                const notification = remoteMessage.notification;
                const data = remoteMessage.data;
                onOpenNotification(notification, data);
                // this.removeDeliveredNotification(notification.notificationId)
            }
        });

        // Check whether an initial notification is available
        // when the app is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log(
                    '[FCMService] getInitialNotification Notification caused app to open',
                );
                if (remoteMessage) {
                    const notification = remoteMessage.notification;
                    onOpenNotification(notification);
                    // this.removeDeliveredNotification(notification.notificationId)
                }
            });

        //  foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log(
                '[FCMService] a new FCM message arrived!',
                remoteMessage,
            );
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data.notification;
                } else {
                    notification = remoteMessage.notification;
                    data = remoteMessage.data;
                }
                onNotification(notification, data);
            }
        });

        // triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log('[FCMService] new token refresg: ', fcmToken);
            onRegister(fcmToken);
        });
    };

    unRegister = () => {
        this.messageListener();
    };
}

export const fcmService = new FCMService();
