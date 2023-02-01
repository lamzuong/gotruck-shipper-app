import styles from './stylesGoTruckPay';

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GoTruckPay({ navigation }) {
  const money = 22150123;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Số dư hiện tại</Text>
      <Text style={styles.money}>
        {money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'}
      </Text>

      <View style={styles.viewOptions}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('HistoryMoney')}>
          <MaterialCommunityIcons name="clipboard-text-clock" size={40} color="#0DBEBE" />
          <Text>Lịch sử</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Withdraw')}>
          <MaterialCommunityIcons name="hand-coin" size={40} color="#F17605" />
          <Text>Rút tiền</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
