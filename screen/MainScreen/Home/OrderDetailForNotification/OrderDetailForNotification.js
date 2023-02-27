import styles from './stylesOrderDetailForNotification';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyButton from '../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';

import { View, Text, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useState } from 'react';
import { Feather, Foundation, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OrderDetailForNotification() {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={[styles.inline, { marginTop: 10 }]}>
          <Text style={styles.label}>Mã đơn</Text>
          <Text style={styles.content}>{item.id_order}</Text>
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
          {item.from_address.name +
            '\n' +
            item.from_address.address +
            '\n' +
            item.from_address.phone}
        </Text>
        <View style={[stylesGlobal.inlineBetween, { marginTop: 5 }]}>
          <View style={styles.inline}>
            <Ionicons name="md-location-sharp" size={24} color="red" style={{ width: 30 }} />
            <Text style={styles.label}>Người nhận</Text>
          </View>
          <View style={styles.inline}>
            {/* <Feather name="message-square" size={26} color="black" /> */}
            <View style={{ width: 10 }}></View>
            <Feather name="phone" size={26} color="black" />
          </View>
        </View>
        <Text style={styles.content}>
          {item.to_address.name + '\n' + item.to_address.address + '\n' + item.from_address.phone}
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
              {item.total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 100 }}>
        <View style={stylesGlobal.inlineBetween}>
          <MyButton
            type={'medium'}
            text="Hủy chuyến"
            btnColor={'red'}
            txtColor="white"
            action={() => {
              Alert.alert('Xác nhận', 'Bạn chắc chắn muốn hủy đơn?', [
                {
                  text: 'Hủy',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: async () => {
                    navigation.navigate('Home', { itemCancel: item });
                  },
                },
              ]);
            }}
          />
          <MyButton
            type={'medium'}
            text="Chấp nhận"
            btnColor={stylesGlobal.mainGreen}
            txtColor="white"
            action={() => {
              navigation.navigate('Home', { checkHaveOrder: true, itemOrder: item });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
