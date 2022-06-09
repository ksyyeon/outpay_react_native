import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffff',
    },
    image: {
        height: 150,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 25,
        fontFamily: 'NanumSquareB',
        fontSize: 14,
        color: '#f3985a',
    },
    header: {
        width: '100%',
        height: '20%',
        backgroundColor: '#ff9a9a',
        justifyContent: 'flex-end',
        paddingLeft: 10,
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
