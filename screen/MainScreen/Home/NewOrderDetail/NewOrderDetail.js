import styles from './stylesNewOrderDetail';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyButton from '../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';

import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function NewOrderDetail({ item }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', backgroundColor: stylesGlobal.mainGreen }}>
        <Feather name="menu" size={30} color="white" />
        <Text style={{ fontSize: 16, color: 'white' }}>Chi tiết đơn hàng</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={[styles.inline, { marginTop: 10 }]}>
          <Text style={styles.label}>Mã đơn</Text>
          <Text style={styles.content}>{item.id}</Text>
        </View>
        <View style={[stylesGlobal.inlineBetween, { marginTop: 5 }]}>
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
        <View style={[stylesGlobal.inlineBetween, { marginTop: 5 }]}>
          <View style={styles.inline}>
            <Ionicons name="md-location-sharp" size={24} color="red" style={{ width: 30 }} />
            <Text style={styles.label}>Người nhận</Text>
          </View>
          <View style={styles.inline}>
            <Feather name="message-square" size={26} color="black" />
            <View style={{ width: 10 }}></View>
            <Feather name="phone" size={26} color="black" />
          </View>
        </View>
        <Text style={styles.content}>
          {item.peopleReceive + '\n' + item.to + '\n' + item.phoneReceive}
        </Text>
        {/* Ghi chú */}
        <Text style={[styles.label, { marginTop: 20 }]}>Ghi chú</Text>
        <ScrollView style={styles.viewNote} showsVerticalScrollIndicator={false}>
          <Text style={styles.txtNote}>{item.note}</Text>
        </ScrollView>
        {/* Thông tin còn lại */}
        <View style={{ marginVertical: 20 }}>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Khoảng cách</Text>
            <Text style={styles.content}>{item.distance}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Thời gian dự kiến</Text>
            <Text style={styles.content}>{item.expectedTime}</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Chi phí vận chuyển</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={[stylesGlobal.inlineBetween, { paddingHorizontal: 20 }]}>
        <MyButton
          type={'medium'}
          text="Hủy chuyến"
          btnColor={'red'}
          txtColor="white"
          action={() => {}}
        />
        <MyButton
          type={'medium'}
          text="Bắt đầu giao"
          btnColor={stylesGlobal.mainGreen}
          txtColor="white"
          action={() => {
            navigation.navigate('ReceiveGoods');
          }}
        />
      </View>
    </View>
  );
}
