import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffff',
    },
    actionBar: {
        width: '100%',
        height: 60,
        // backgroundColor: '#d6ca1a',
    },
    header: {
        width: '100%',
        height: '10%',
        backgroundColor: '#ffff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: '#f3985a',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#d6ca1a',
    },

    wrapper1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        width: '100%',
        height: '40%',
        // backgroundColor: '#ff9a9a',
    },
    logo_image: {
        resizeMode: 'contain',
        width: 150,
    },
    title: {
        fontFamily: 'NanumSquareB',
        fontSize: 18,
    },

    note_wrong: {
        color: 'red',
        fontFamily: 'NanumSquareR',
        fontSize: 14,
        marginBottom: 20,
        opacity: 0,
    },

    btn_reset: {
        marginBottom: 10,
        opacity: 0,
    },

    circles: {
        width: '100%',
        alignItems: 'center',
    },

    item_circle: {
        width: 15,
        height: 15,
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 15 / 2,
        marginRight: 10,
    },

    numpad: {
        flexDirection: 'row',
        flex: 1,
    },

    item_num: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },

    item_ctl: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});
