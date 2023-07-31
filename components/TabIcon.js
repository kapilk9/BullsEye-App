import React from 'react';
import {View, Text, Image} from 'react-native';
import {FONTS, COLORS} from '../constants';

const TabIcon = ({focused, icon, iconStyle, label, isTrade}) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#1c3254",
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.lightGreen :COLORS.BottomTab,
            ...iconStyle,
          }}
        />
        <Text style={{color:COLORS.BottomTab, ...FONTS.h4}}>{label}</Text>
      </View>
    );
  } else {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.BottomTab : '#282c35',
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color: focused ? COLORS.BottomTab :  '#282c35',
            ...FONTS.h4,
          }}>
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
