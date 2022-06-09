import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        paddingBottom: 60,
    },
    logo_wrap: {
        height: 60,
        width: '100%',
        // backgroundColor: '#D8E2DC',
    },
    logo: {
        resizeMode: 'contain',
        height: 20,
        width: 97,
        marginLeft: 20,
        marginTop: 20,
    },
    image_wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'grey',
    },
    image: {
        resizeMode: 'contain',
        height: 70,
        width: 70,
        marginBottom: 30,
    },
    title: {
        fontFamily: 'NanumSquareB',
        fontSize: 16,
        marginBottom: 10,
    },
    desc: {
        fontFamily: 'NanumSquareR',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
    },
    reload_btn: {
        marginTop: 30,
        backgroundColor: '#f0f1f5',
        width: 150,
        height: 40,
        justifyContent: 'center',
        borderRadius: 2,
    },
    btn_text: {
        fontFamily: 'NanumSquareB',
        textAlign: 'center',
    },
});
