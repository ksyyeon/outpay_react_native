import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: '30%',
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor: '#f0f0f0',
        padding: 30,
    },
    content_item: {
        // backgroundColor: '#f2f2f2',
        padding: 20,
    },
    footer: {
        width: '100%',
        height: '8%',
        backgroundColor: '#ff6801',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo_image: {
        resizeMode: 'contain',
        width: 150,
    },
    icon_image: {
        resizeMode: 'contain',
        width: 50,
    },
    header_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 16,
        color: '#000000',
        lineHeight: 30,
        textAlign: 'center',
    },
    title_text: {
        fontFamily: 'NanumSquareB',
        fontSize: 15,
    },
    desc_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 13,
        padding: 10,
        color: 'gray',
        lineHeight: 20,
    },
    note_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 11,
        color: 'gray',
        // backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        marginTop: 30,
        lineHeight: 15,
        flexShrink: 1,
    },
    btn_text: {
        fontFamily: 'NanumSquareR',
        fontSize: 16,
        color: '#ffff',
    },
});
