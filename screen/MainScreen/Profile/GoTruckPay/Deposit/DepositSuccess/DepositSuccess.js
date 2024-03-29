import styles from './stylesDepositSuccess';
import MyButton from '../../../../../../components/MyButton/MyButton';

import { View, Text, Image } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DepositSuccess({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../../../../assets/images/logo-name-white.png')}
          style={styles.logoName}
        />
        <View style={styles.viewFinish}>
          <Text style={styles.viewFinish.title}>
            Bạn đã nạp tiền thành công !!{'\t\t'}
            <MaterialCommunityIcons name="truck-fast" size={25} color="white" />
          </Text>
          <Image
            source={require('../../../../../../assets/images/logo-truck.png')}
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
            navigation.navigate('GoTruckPay');
          }}
        />
      </View>
    </View>
  );
}
