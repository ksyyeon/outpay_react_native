import React, {useEffect, useState, useRef} from 'react';
import {
    View,
    Text,
    BackHandler,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import styles from '../styles/style_SelfAuthTermsAgree';
import CustomButton from '../CustomButton';
import CheckBox from '../CheckBox';
import UseTerms from '../../assets/text/UseTerms';

export default SelfAuthTermsAgree = props => {
    const [is14Under, setIs14Under] = useState(false);
    const [isUseTermsChecked, setIsUseTermsChecked] = useState(false);
    const [isBankingTermsChecked, setIsBankingTermsChecked] = useState(false);
    const [isPrivacyTermsChecked, setIsPrivacyTermsChecked] = useState(false);
    const [is14UnderTermsChecked, setIs14UnderTermsChecked] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);

    const isInitialMount = useRef(true);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress,
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    const termsChecked = (
        isUseTermsChecked,
        isBankingTermsChecked,
        isPrivacyTermsChecked,
    ) => {
        return (
            isUseTermsChecked && isBankingTermsChecked && isPrivacyTermsChecked
        );
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            console.log('이이이이');
        } else {
            console.log('아아아아');
            if (is14Under) {
                console.log(termsChecked && is14UnderTermsChecked);
                if (termsChecked && is14UnderTermsChecked) {
                    setIsAllChecked(true);
                } else {
                    setIsAllChecked(false);
                }
            } else {
                console.log(termsChecked && is14UnderTermsChecked);
                if (termsChecked) {
                    setIsAllChecked(true);
                } else {
                    setIsAllChecked(false);
                }
            }
        }
    }, [
        is14Under,
        termsChecked(
            isUseTermsChecked,
            isBankingTermsChecked,
            isPrivacyTermsChecked,
        ),
        is14UnderTermsChecked,
        isAllChecked,
    ]);

    const onBackPress = () => {
        BackHandler.exitApp();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.img_logo}
                    source={require('../../assets/images/img_logo2.png')}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>가입약관에 동의해주세요.</Text>

                <View style={styles.terms_item}>
                    <CheckBox
                        onPress={() => {
                            setIsUseTermsChecked(!isUseTermsChecked);
                        }}
                        isChecked={isUseTermsChecked}
                    />
                    <Text style={styles.terms_title}>
                        아웃페이 서비스 이용약관 동의
                    </Text>
                    <TouchableOpacity style={styles.btn_wrap}>
                        <Text style={styles.btn_more}>자세히보기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.terms_item}>
                    <CheckBox
                        onPress={() => {
                            setIsBankingTermsChecked(!isBankingTermsChecked);
                        }}
                        isChecked={isBankingTermsChecked}
                    />
                    <Text style={styles.terms_title}>
                        전자금융거래 이용약관
                    </Text>
                    <TouchableOpacity style={styles.btn_wrap}>
                        <Text style={styles.btn_more}>자세히보기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.terms_item}>
                    <CheckBox
                        onPress={() => {
                            setIsPrivacyTermsChecked(!isPrivacyTermsChecked);
                        }}
                        isChecked={isPrivacyTermsChecked}
                    />
                    <Text style={styles.terms_title}>
                        개인정보 처리방침 동의
                    </Text>
                    <TouchableOpacity style={styles.btn_wrap}>
                        <Text style={styles.btn_more}>자세히보기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ageCheckWrap}>
                    <TouchableOpacity
                        style={styles.ageCheckItem}
                        onPress={() => {
                            console.log('14세이상: ', is14Under);
                            setIs14Under(false);
                        }}>
                        <Image
                            style={styles.ageCheckIcon}
                            source={
                                is14Under
                                    ? require('../../assets/images/icon_adult.png')
                                    : require('../../assets/images/icon_adult_on.png')
                            }
                        />
                        <Text
                            style={
                                is14Under
                                    ? styles.ageCheckText
                                    : styles.ageCheckTextOn
                            }>
                            만 14세 이상
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.ageCheckItemLast}
                        onPress={() => {
                            console.log('14세미만:', is14Under);
                            setIs14Under(true);
                        }}>
                        <Image
                            style={styles.ageCheckIcon}
                            source={
                                is14Under
                                    ? require('../../assets/images/icon_children_on.png')
                                    : require('../../assets/images/icon_children.png')
                            }
                        />
                        <Text
                            style={
                                is14Under
                                    ? styles.ageCheckTextOn
                                    : styles.ageCheckText
                            }>
                            만 14세 미만
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={StyleSheet.flatten([
                        styles.terms_item,
                        {
                            height: 60,
                            marginTop: 20,
                            opacity: is14Under ? 100 : 0,
                        },
                    ])}>
                    <CheckBox
                        onPress={() => {
                            setIs14UnderTermsChecked(!is14UnderTermsChecked);
                        }}
                        isChecked={is14UnderTermsChecked}
                    />
                    <Text
                        style={StyleSheet.flatten([
                            styles.terms_title,
                            {fontSize: 12, marginLeft: 10},
                        ])}>
                        정보 주체가 만 14세 미만의 아동인 경우, 위와 같은 정보를
                        수집/이용하는데 동의하십니까?
                    </Text>
                </View>
            </View>
            <View style={styles.footer}>
                <View
                    style={StyleSheet.flatten([
                        styles.terms_item,
                        {marginHorizontal: 10},
                    ])}>
                    <CheckBox
                        onPress={() => {
                            setIsAllChecked(!isAllChecked);
                        }}
                        isChecked={isAllChecked}
                    />
                    <Text style={styles.terms_title}>전체 동의하기</Text>
                </View>
                <CustomButton
                    buttonColor={'#f0f1f5'}
                    titleColor={'#999'}
                    title={'다음'}
                />
            </View>
        </View>
    );
};
