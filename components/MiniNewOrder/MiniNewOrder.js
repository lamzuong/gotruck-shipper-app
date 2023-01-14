import styles from './stylesMiniNewOrder';
import stylesGlobal from '../../global/stylesGlobal';

import { View, Text } from 'react-native';
import React from 'react';
import { Feather, Foundation } from '@expo/vector-icons';

export default function MiniNewOrder({ item }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Feather name="menu" size={30} color="black" />
      </View>
      <View style={styles.inline}>
        <Text style={styles.label}>Mã đơn</Text>
        <Text style={styles.content}>{item.id}</Text>
      </View>
      <View style={[stylesGlobal.inlineBetween, { marginTop: 10 }]}>
        <View style={styles.inline}>
          <Foundation name="record" size={24} color="#0DBEBE" style={{ width: 30 }} />
          <Text style={styles.label}>Người gửi</Text>
        </View>
        <View style={styles.inline}>
          <Feather name="message-square" size={26} color="black" />
          <View style={{ width: 10 }}></View>
          <Feather name="phone" size={26} color="black" />
        </View>
      </View>
      <Text style={styles.content}>
        {item.peopleSend + '\n' + item.from + '\n' + item.phoneSend}
      </Text>
    </View>
  );
}
