import styles from './stylesFinishPage';
import stylesGlobal from '../../../../global/stylesGlobal';

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MyButton from '../../../../components/MyButton/MyButton';
import { StatusBar } from 'expo-status-bar';

export default function FinishPage({ navigation }) {
  const route = useRoute();
  const { item } = route.params;

  const formatCurrency=(data)=>{
    return data
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Hoàn thành đơn hàng</Text>
      </View>
      <View style={styles.center}>
        <View style={styles.total}>
          <Text style={styles.label}>Tiền vận chuyển:</Text>
          <Text style={styles.content}>{item.total} VNĐ</Text>
        </View>
      
        <View style={styles.account}>
          <Text style={styles.label}>Tài khoản:</Text>
          <Text style={styles.content}>- {formatCurrency(item.total*item.fee/100)} VNĐ</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <MyButton
          type={'medium2'}
          text="Hoàn thành"
          btnColor={stylesGlobal.mainGreen}
          txtColor="white"
          action={() => {
            navigation.navigate('Home', { completed: true });
          }}
        ></MyButton>
      </View>
    </View>
  );
}
