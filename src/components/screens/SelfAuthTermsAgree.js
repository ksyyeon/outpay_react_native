import React, {useEffect, useState} from 'react';
import {View, Text, BackHandler, Image, StyleSheet} from 'react-native';
import styles from '../styles/style_SelfAuthTermsAgree';
import CustomButton from '../CustomButton';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '../CheckBox';
import UseTerms from '../../../assets/text/UseTerms';

export default SelfAuthTermsAgree = props => {
    const [isUseTermsChecked, setIsUseTermsChecked] = useState(false);
    const [isPrivacyTermsChecked, setIsPrivacyTermsChecked] = useState(false);
    const [is14Under, setIs14Under] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress,
        );
        return () => {
            backHandler.remove();
        };
    }, []);

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
                <View style={styles.terms_wrap}>
                    <View style={styles.terms_item}>
                        <CheckBox
                            onPress={() => {
                                setIsUseTermsChecked(!isUseTermsChecked);
                            }}
                            isChecked={isUseTermsChecked}
                        />
                        <Text style={styles.terms_title}>
                            서비스 이용약관 동의
                        </Text>
                        <TouchableOpacity style={styles.btn_wrap}>
                            <Text style={styles.btn_more}>자세히보기</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={{padding: 20}}>
                        <UseTerms textStyle={styles.text_terms} />
                    </ScrollView>
                    <View style={styles.terms_item}>
                        <CheckBox
                            onPress={() => {
                                setIsPrivacyTermsChecked(
                                    !isPrivacyTermsChecked,
                                );
                            }}
                            isChecked={isPrivacyTermsChecked}
                        />
                        <Text style={styles.terms_title}>
                            개인정보보호를 위한 이용자 동의
                        </Text>
                        <TouchableOpacity style={styles.btn_wrap}>
                            <Text style={styles.btn_more}>자세히보기</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={{padding: 20}}>
                        <UseTerms textStyle={styles.text_terms} />
                    </ScrollView>

                    <View style={styles.terms_item}>
                        <CheckBox
                            onPress={() => {
                                setIs14Under(!is14Under);
                            }}
                            isChecked={is14Under}
                        />
                        <Text style={styles.terms_title}>
                            만 14세 이상입니다.
                        </Text>
                        <TouchableOpacity style={styles.btn_wrap}>
                            <Text style={styles.btn_more}>자세히보기</Text>
                        </TouchableOpacity>
                    </View>
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
