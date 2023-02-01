import styles from './stylesHistoryMoney';
import stylesGlobal from '../../../../../global/stylesGlobal';
import data from './data';

import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function HistoryMoney() {
  return (
    <ScrollView style={styles.container}>
      {data.map((e, i) => (
        <View key={i} style={styles.item}>
          <Text>{e.title}</Text>
          <View style={stylesGlobal.inlineBetween}>
            <Text style={e.type === 'add' ? styles.add : styles.sub}>
              {e.type === 'add' ? '+' : '-'}
              {e.money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'}
            </Text>
            <Text>{e.time}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
