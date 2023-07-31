import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  title,
  onPress,
  Button,
  Alert,
} from 'react-native';
import {MainLayout} from './';
import {HeaderBar} from '../components';
import {FONTS, COLORS, SIZES, dummyData, icons} from '../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// all pages responsive

const SectionTitle = ({title}) => {
  return (
    <View style={{marginTop: SIZES.padding}}>
      <Text
        style={{
          color: COLORS.lightGray3,
          fontSize: responsiveWidth(4),
          fontWeight: '300',
        }}>
        {title}
      </Text>
    </View>
  );
};



{/* <Button onPress={logout} title="Logout" />; */}

const Profile = props => {
  const [faceId, SetFaceId] = useState(true);
  const navigation = useNavigation();
  const [fName, setFname] = useState('');
  const [lName, setlname] = useState('');
  const logout = async () => {
   
    try {
      // Clear the stored user data from AsyncStorage
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('mobile');
      await AsyncStorage.removeItem('first_name');
      await AsyncStorage.removeItem('last_name');
      await AsyncStorage.removeItem('user_balance');
  
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  const getStoredData = async () => {
    try {
  
      const first_name = await AsyncStorage.getItem('first_name');
      setFname(first_name || '')

      const last_name = await AsyncStorage.getItem('last_name');
      setlname(last_name || '')
      
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getStoredData();
   
  }, []);



  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(3),
          backgroundColor: COLORS.mainBgColor,
          paddingVertical: responsiveHeight(2),
        }}>
        {/* Header  */}
        {/* <Text style={{ color: 'black', fontSize: responsiveFontSize(3.5), }}>Account</Text> */}

        {/* Details  */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Email and user ID  */}
          <View
            style={{
              flexDirection: 'row',

              marginTop: responsiveHeight(1),

              borderRadius: responsiveWidth(2),
              elevation: 5,
              borderWidth: 0.5,
              borderColor: 'white',
              backgroundColor: COLORS.bgColor,
              height: responsiveHeight(15),
              width: responsiveWidth(93),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* Email and ID  */}
            <View
              style={{
                flex: 1,
                marginLeft: responsiveWidth(3),
                flexDirection: 'row',
                // marginBottom: 40
              }}>
              <Image
                source={icons.profile}
                style={{
                  width: responsiveWidth(13),
                  height: responsiveWidth(13),
                }}
              />
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2),
                  marginTop: responsiveHeight(2),
                }}>
                {fName + ' ' + lName}
              </Text>
              {/* <Text style={{
                color: COLORS.lightGray2, ...FONTS.body4
              }}>ID :{dummyData.profile.id}</Text> */}
            </View>
            {/* STATUS  */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: responsiveWidth(5),
              }}>
              <Image
                source={icons.verified}
                style={{width: responsiveWidth(7), height: responsiveWidth(7)}}
              />
              <Text
                style={{
                  marginLeft: responsiveWidth(2),
                  color: '#013220',
                  fontSize: responsiveFontSize(1.9),
                }}>
                Verified
              </Text>
            </View>
          </View>

          <SectionTitle title="ACCOUNT" />

          <TouchableOpacity onPress={() => props.navigation.navigate('Funds')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: SIZES.radius,
                borderBottomWidth: 0.8,
                height: responsiveWidth(15),
                borderBottomColor: '#D6EDF0',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2.3),
                }}>
                Funds
              </Text>
              <Image
                source={icons.funds}
                style={{
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                  tintColor: '#B1C3BB',
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('UserProfile')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: responsiveHeight(2),
                borderBottomWidth: 0.8,
                height: responsiveWidth(15),
                borderBottomColor: '#D6EDF0',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2.3),
                }}>
                Profile
              </Text>
              <Image
                source={icons.profile}
                style={{
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                  tintColor: '#B1C3BB',
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgotPasswordSet')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: responsiveHeight(2),
                borderBottomWidth: 0.8,
                height: responsiveWidth(15),
                borderBottomColor: '#D6EDF0',

                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2.3),
                }}>
                Reset passward
              </Text>
              <Image
                source={icons.setting}
                style={{
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                  tintColor: '#B1C3BB',
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: responsiveHeight(2),
                borderBottomWidth: 0.8,
                height: responsiveWidth(15),
                borderBottomColor: '#D6EDF0',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2.3),
                }}>
                Logout
              </Text>
              <Image
                source={icons.logout}
                style={{
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                  tintColor: '#B1C3BB',
                }}
              />
            </View>
          </TouchableOpacity>
          <SectionTitle title="SUPPORT" />

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Setting')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: responsiveHeight(2),
                borderBottomWidth: 0.8,
                height: responsiveWidth(15),
                borderBottomColor: '#D6EDF0',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: responsiveFontSize(2.3),
                }}>
                Support portal
              </Text>
              <Image
                source={icons.customersupport}
                style={{
                  height: responsiveWidth(8),
                  width: responsiveWidth(8),
                  tintColor: '#B1C3BB',
                }}
              />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("BuySrceen")}>
            <View style={{
              flex: 1, justifyContent: 'space-between',
              flexDirection: "row", marginTop: responsiveHeight(2),
              borderBottomWidth: 0.8, height:  responsiveWidth(15), borderBottomColor: '#D6EDF0',
              alignItems: 'center'
            }}>
              <Text style={{ color: COLORS.black, fontSize:responsiveFontSize(2.3)}}>
                Contact
              </Text>
              <Image source={icons.contect}
                style={{height: responsiveWidth(8), width:responsiveWidth(8), tintColor: "#B1C3BB"  }} />
            </View>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
