import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image: {
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 25,
        fontFamily: 'NanumSquareEB',
        fontSize: 12,
        color: '#f3985a',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#d6ca1a',
    },
    footer: {
        width: '100%',
        height: '8%',
    },
});
