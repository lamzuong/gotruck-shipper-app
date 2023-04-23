import styles from './stylesHistoryMoney';
import stylesGlobal from '../../../../../global/stylesGlobal';

import { View, Text, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import axiosClient from '../../../../../api/axiosClient';
import { AuthContext } from '../../../../../context/AuthContext';
import { formatDateFull } from '../../../../../global/util';

export default function HistoryMoney() {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const isFocus = useIsFocused();

  useEffect(() => {
    const getHistoryMoney = async () => {
      const resHistory = await axiosClient.get('gotruck/bank/history/' + user._id);
      setData(resHistory);
    };
    getHistoryMoney();
  }, [isFocus]);

  return (
    <ScrollView style={styles.container}>
      {data.map((e, i) => (
        <View key={i} style={styles.item}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text>
              {e.type === 'Nạp tiền'
                ? 'Bạn đã gửi yêu cầu nạp tiền'
                : 'Bạn đã gửi yêu cầu rút tiền'}
            </Text>
            <Text style={{ marginLeft: 10, color: stylesGlobal.mainGreen }}>{e.status}</Text>
          </View>

          <View style={stylesGlobal.inlineBetween}>
            <Text style={e.type === 'Nạp tiền' ? styles.add : styles.sub}>
              {e.type === 'Nạp tiền' ? '+' : '-'}
              {e.money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'}
            </Text>
            <Text>{formatDateFull(e.createdAt)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
