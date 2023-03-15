import styles from './stylesCancelled';
import MyOrder from '../../../../components/MyOrder/MyOrder';
import order from '../dataOrder';

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import axiosClient from '../../../../api/axiosClient';
import { SetListOrder } from '../../../../context/AuthAction';

export default function Cancelled() {
  const { user, listOrder, dispatch } = useContext(AuthContext);
  const isFocus = useIsFocused();

  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/ordershipper/shipper/' + user._id);
    if (JSON.stringify(listOrder) !== JSON.stringify(orderList)) {
      dispatch(SetListOrder(orderList));
    }
  };

  useEffect(() => {
    renderUI();
  }, [isFocus]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {listOrder.map((item, index) =>
        item.status == 'Đã hủy' && item?.reason_cancel?.user_cancel === 'Shipper' ? (
          <MyOrder order={item} key={index} />
        ) : null,
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
