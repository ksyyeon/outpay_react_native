import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class LocalNotificationService {
    configure = onOpenNotification => {
        PushNotification.configure({
            onRegister: token => {
                console.log('[LocalNotificationService] onRegister :', token);
            },

            onNotification: notification => {
                console.log(
                    '[LocalNotificationService] onNotification ',
                    notification,
                );
                if (!notification?.data) {
                    return;
                }
                notification.userInteraction = true;
                onOpenNotification(
                    Platform.OS === 'ios'
                        ? notification.data.item
                        : notification.data,
                );

                if (Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },
            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */ requestPermissions: true,

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    };

    unRegister = () => {
        PushNotification.unregister();
    };

    showNotification = (id, title, message, data, options) => {
        PushNotification.localNotification({
            // Android only Properties
            ...this.buildAndroidNotification(id, title, message, data, options),
            // iOS only properties
            ...this.buildIOSNotification(id, title, message, data, options),
            // IOS and Android properties
            title: title || '',
            message: message || '',
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false, // BOOLEAN : If the notification was opend by the user from notification area or not
        });
    };

    buildAndroidNotification = (id, title, message, data, options) => {
        return {
            id: id,
            autoCancel: true,
            channelId: 'channel-id',
            showWhen: true,
            when: data.sentTime,
            color: '#ff6801',
            largeIcon: options.largeIcon || '',
            smallIcon: options.smallIcon || 'ic_notification',
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high', // (optional) set notification importance, default : ??~
            data: data,
        };
    };

    buildIOSNotification = (id, title, message, data, options) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || '',
            userInfo: {
                id: id,
                item: data,
            },
        };
    };

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    };
}

export const localNotificationService = new LocalNotificationService();
