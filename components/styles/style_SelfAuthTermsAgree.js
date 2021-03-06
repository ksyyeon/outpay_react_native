import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#ffff',
    },
    header: {
        height: 60,
        backgroundColor: '#ffff',
        justifyContent: 'center',
    },
    img_logo: {
        height: 20,
        width: 96,
        resizeMode: 'contain',
    },
    content: {flex: 1},
    title: {
        fontFamily: 'NanumSquareR',
        fontSize: 22,
        marginBottom: 30,
    },
    terms_item: {
        height: 50,
        flexDirection: 'row',
        // backgroundColor: '#ffdddf',
        alignItems: 'center',
    },
    terms_title: {
        marginLeft: 5,
        flex: 1,
        fontFamily: 'NanumSquareR',
        fontSize: 14,
    },
    btn_wrap: {
        flexShrink: 1,
        alignContent: 'flex-end',
    },
    btn_more: {
        fontFamily: 'NanumSquareR',
        fontSize: 12,
    },
    scrollView: {
        backgroundColor: '#f0f1f5',
        fontSize: 12,
        height: 120,
        borderRadius: 5,
    },
    text_terms: {
        fontFamily: 'NanumSquareR',
        fontSize: 12,
        color: 'grey',
        lineHeight: 18,
        flex: 1,
    },
    ageCheckWrap: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: '#ffff',
    },
    ageCheckItem: {
        // backgroundColor: '#f0f1f5',
        height: 120,
        flex: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ageCheckItemLast: {
        // backgroundColor: '#f0f1f5',
        height: 120,
        flex: 1,
        marginLeft: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ageCheckIcon: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    ageCheckText: {
        fontFamily: 'NanumSquareR',
        color: '#ccc',
        fontWeight: 'bold',
    },
    ageCheckTextOn: {
        fontFamily: 'NanumSquareR',
        color: '#ff6801',
        fontWeight: 'bold',
    },
    footer: {
        borderTopColor: '#f3f3f3',
        borderTopWidth: 1,
        width: '100%',
        paddingBottom: 12,
    },
});
