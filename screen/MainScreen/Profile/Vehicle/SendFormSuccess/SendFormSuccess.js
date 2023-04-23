import styles from './stylesSendFormSuccess';
import MyButton from '../../../../../components/MyButton/MyButton';

import { View, Text, Image } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SendFormSuccess({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../../../assets/images/logo-name-white.png')}
          style={styles.logoName}
        />
        <View style={styles.viewFinish}>
          <Text style={styles.viewFinish.title}>
            Bạn đã gửi yêu cầu thành công !! GoTruck sẽ phản hồi cho bạn sớm nhất có thể
            {'\t\t'}
            <MaterialCommunityIcons name="truck-fast" size={25} color="white" />
          </Text>
          <Image
            source={require('../../../../../assets/images/logo-truck.png')}
            style={styles.viewFinish.logoTruck}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center', margin: 20 }}>
        <MyButton
          type={'large'}
          text="Tiếp tục"
          btnColor={'black'}
          txtColor="white"
          action={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </View>
  );
}
