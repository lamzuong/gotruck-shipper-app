import styles from './stylesOrderDetail';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyButton from '../../../../components/MyButton/MyButton';

import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons, Foundation } from '@expo/vector-icons';

export default function OrderDetail({ route, navigation }) {
  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------
  const { order } = route.params;
  // const idShipper = "SHP2310001";

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Mã đơn */}
        <View style={styles.inline}>
          <Text style={styles.label}>Mã đơn</Text>
          <Text style={styles.contentHeader}>{order.id_order}</Text>
        </View>

        {/* Ngưởi gửi */}
        <View style={[styles.inline, { marginTop: 20 }]}>
          <Foundation name="record" size={24} color="#0DBEBE" style={{ width: 30 }} />
          <Text style={styles.label}>Người gửi</Text>
        </View>
        <Text style={styles.content}>
          {order.from_address.name +
            '\n' +
            order.from_address.address +
            '\n' +
            order.from_address.phone}
        </Text>
        {/* Người nhận */}
        <View style={[styles.inline, { marginTop: 20 }]}>
          <Ionicons name="md-location-sharp" size={24} color="red" style={{ width: 30 }} />
          <Text style={styles.label}>Người nhận</Text>
        </View>
        <Text style={styles.content}>
          {order.to_address.name + '\n' + order.to_address.address + '\n' + order.to_address.phone}
        </Text>
        {/* Ghi chú */}
        <Text style={[styles.label, { marginTop: 20 }]}>Ghi chú</Text>
        <ScrollView style={styles.viewNote} showsVerticalScrollIndicator={false}>
          <Text style={styles.viewNote.txtNote}>{order.note}</Text>
        </ScrollView>
        {/* Thông tin còn lại */}
        <View style={{ marginVertical: 20 }}>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Khoảng cách</Text>
            <Text style={styles.content}>{order.distance} km</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Thời gian dự kiến</Text>
            <Text style={styles.content}>{order.expectedTime} phút</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Chi phí vận chuyển</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {order.total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'}
            </Text>
          </View>
        </View>
        {order.status == 'Đã hủy' ? (
          <View style={{ paddingBottom: 20 }}>
            <View style={styles.inline}>
              <Text style={[styles.label, { width: 120 }]}>Lý do hủy</Text>
              <Text style={styles.content}>{order?.reason_cancel?.content}</Text>
            </View>
            {/* <View style={styles.inline}>
              <Text style={[styles.label, { width: 120 }]}>Người hủy</Text>
              <Text style={styles.content}>
                {order?.reason_cancel?.user_cancel === 'AutoDelete'
                  ? 'Tự động xóa'
                  : order?.reason_cancel?.user_cancel === 'Shipper'
                  ? 'Tài xế'
                  : 'Khách hàng'}
              </Text>
            </View> */}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
