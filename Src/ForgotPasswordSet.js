import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordSet = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const SignupSchema = Yup.object().shape({
    Oldpassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    Newpassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirm_password: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('Newpassword')], 'Passwords do not match')
      .min(8, 'Confirm password must be at least 8 characters long'),
  });

  const PasswordReset = async (values) => {
    try {
        const access_token = await AsyncStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const payload = {
        old_password: values.Oldpassword,
        new_password: values.Newpassword,
        confirm_password: values.confirm_password,
      };

      const res = await axios.post(
        'https://scripts.bulleyetrade.com/api/mobile/password-update',
        payload,
        config
      );

      console.log('Response:', res.data);

      if (res.data.result === true) {
        const message = res.data.message;
        alert(message);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        Oldpassword: '',
        Newpassword: '',
        confirm_password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={PasswordReset}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.mainBgColor }}>
          <View style={{ paddingHorizontal: responsiveWidth(5), paddingTop: responsiveHeight(2) }}>
            <View style={{ marginVertical: responsiveHeight(2), display: 'flex', justifyContent: 'flex-start' }}>
              <View style={{ marginVertical: responsiveHeight(5) }}>
                <Image source={require('../assets/Image/password.png')} style={{ width: responsiveWidth(12), height: responsiveHeight(6) }} />
              </View>

              <View>
                <Text style={{ color: COLORS.black, fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>
                  Set New Password
                </Text>
                <Text style={{ color: 'gray', marginTop: responsiveHeight(1.5) }}>
                  Must be at least 8 characters.
                </Text>

                <View>
                  <Text style={{ color: COLORS.black, marginTop: responsiveHeight(4) }}>
                    Old Password
                  </Text>

                  <TextInput
                    secureTextEntry
                    placeholderTextColor={'gray'}
                    style={{
                      width: responsiveWidth(88),
                      borderBottomColor: COLORS.TopBox,
                      borderBottomWidth: 0.3,
                      marginHorizontal: responsiveWidth(1),
                      fontSize: responsiveFontSize(2),
                      color: '#000'
                    }}
                    value={values.Oldpassword}
                    onChangeText={handleChange('Oldpassword')}
                    onBlur={handleBlur('Oldpassword')}
                  />
                  {touched.Oldpassword && errors.Oldpassword && (
                    <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1) }}>
                      {errors.Oldpassword}
                    </Text>
                  )}

                  <Text style={{ color: COLORS.black, marginTop: responsiveHeight(4) }}>
                    New Password
                  </Text>

                  <TextInput
                    secureTextEntry
                    placeholderTextColor={'gray'}
                    style={{
                      width: responsiveWidth(88),
                      borderBottomColor: COLORS.TopBox,
                      borderBottomWidth: 0.3,
                      marginHorizontal: responsiveWidth(1),
                      fontSize: responsiveFontSize(2),
                      color: '#000'
                    }}
                    value={values.Newpassword}
                    onChangeText={handleChange('Newpassword')}
                    onBlur={handleBlur('Newpassword')}
                  />
                  {touched.Newpassword && errors.Newpassword && (
                    <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1) }}>
                      {errors.Newpassword}
                    </Text>
                  )}

                  <Text style={{ color: COLORS.black, marginTop: responsiveHeight(4) }}>
                    Confirm Password
                  </Text>

                  <TextInput
                    secureTextEntry
                    placeholderTextColor={'gray'}
                    style={{
                      width: responsiveWidth(88),
                      borderBottomColor: COLORS.TopBox,
                      borderBottomWidth: 0.3,
                      marginHorizontal: responsiveWidth(1),
                      fontSize: responsiveFontSize(2),
                      color: '#000'
                    }}
                    value={values.confirm_password}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                  />
                  {touched.confirm_password && errors.confirm_password && (
                    <Text style={{ color: 'red', marginBottom: responsiveHeight(5), paddingLeft: responsiveWidth(5), paddingBottom: responsiveHeight(1) }}>
                      {errors.confirm_password}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: COLORS.TopBox,
                    padding: responsiveWidth(3),
                    borderRadius: responsiveWidth(1),
                    marginVertical: responsiveHeight(4)
                  }}
                  disabled={!isValid}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: responsiveFontSize(2.5),
                      color: '#fff',
                    }}
                  >
                    Set New Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

export default ForgotPasswordSet;

const styles = StyleSheet.create({});
