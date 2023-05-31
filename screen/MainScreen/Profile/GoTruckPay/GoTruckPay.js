import styles from './stylesGoTruckPay';

import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../../../../context/AuthContext';

export default function GoTruckPay({ navigation }) {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Số dư hiện tại</Text>
      <Text style={styles.money}>
        {user.balance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'}
      </Text>

      <View style={styles.viewOptions}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('HistoryMoney')}>
          <MaterialCommunityIcons name="clipboard-text-clock" size={40} color="#0DBEBE" />
          <Text>Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Deposit')}>
          <FontAwesome5 name="money-bill" size={40} color="green" />
          <Text>Nạp tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Withdraw')}>
          <MaterialCommunityIcons name="hand-coin" size={40} color="#F17605" />
          <Text>Rút tiền</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
