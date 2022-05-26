import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default PushModal = navigation => {
    const navigation = useNavigation();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>푸시알림 팝업</Text>
            <Button onPress={() => navigation.goBack()} title="닫기" />
        </View>
    );
};

// export default class PushModal extends React.Component {
//     render() {
//         return (
//             <View
//                 style={{
//                     flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}>
//                 <Text>푸시알림 팝업</Text>
//                 <Button
//                     onPress={() => this.props.navigation.goBack()}
//                     title="닫기"
//                 />
//             </View>
//         );
//     }
// }
