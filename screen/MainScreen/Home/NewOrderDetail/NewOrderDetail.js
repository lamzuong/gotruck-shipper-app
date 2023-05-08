import styles from './stylesNewOrderDetail';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyButton from '../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';

import { View, Text, ScrollView, TouchableWithoutFeedback, Alert, Linking } from 'react-native';
import React, { useContext, useState } from 'react';
import { Feather, Foundation, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRouteTwoLocation } from '../../../../global/utilLocation';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { socketClient } from '../../../../global/socket';

export default function NewOrderDetail({ setShowModal, item, show, received, locationShipper }) {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleMessage = async () => {
    const resConversation = await axiosClient.post('gotruck/conversation/', {
      id_customer: item.id_customer,
      id_shipper: user._id,
      id_form: item?._id,
      form_model: 'Order',
    });
    socketClient.emit('send_message', { id_receive: item.id_customer });
    navigation.navigate('ChatRoom', { item: resConversation });
  };

  const handleShippedGoods = async () => {
    const resultRoute = await getRouteTwoLocation(locationShipper, item.to_address);
    const distanceTwoLocation = resultRoute?.result?.routes[0]?.distance?.value || -1;

    if (distanceTwoLocation && distanceTwoLocation > 1000) {
      Alert.alert('Xác nhận', 'Vị trí của bạn khác vị trí giao hàng!\nBạn vẫn muốn tiếp tục', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('ShippedGoods', { item: item, locationShipper: locationShipper }),
        },
      ]);
    } else {
      navigation.navigate('ShippedGoods', { item: item, locationShipper: locationShipper });
    }
  };
  return (
    <View style={styles.container}>
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
            <Feather
              name="message-square"
              size={26}
              color="black"
              onPress={() => {
                handleMessage();
              }}
            />
            <View style={{ width: 10 }}></View>
            <Feather
              name="phone"
              size={26}
              color="black"
              onPress={() => {
                Linking.openURL(`tel:${item.to_address.phone}`);
              }}
            />
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
            {/* <Feather
              name="message-square"
              size={26}
              color="black"
              onPress={() => {
                handleMessage();
              }}
            /> */}
            <View style={{ width: 10 }}></View>
            <Feather
              name="phone"
              size={26}
              color="black"
              onPress={() => {
                Linking.openURL(`tel:${item.to_address.phone}`);
              }}
            />
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
            <Text style={styles.content}>{item.distance} km</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Thời gian dự kiến</Text>
            <Text style={styles.content}>{item.expectedTime} phút</Text>
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
        {received ? (
          <View style={{ alignItems: 'center' }}>
            <MyButton
              type={'large'}
              text="Đã giao hàng thành công"
              btnColor={stylesGlobal.mainGreen}
              txtColor="white"
              action={() => handleShippedGoods()}
            />
          </View>
        ) : (
          <View style={stylesGlobal.inlineBetween}>
            <MyButton
              type={'medium'}
              text="Hủy chuyến"
              btnColor={'red'}
              txtColor="white"
              action={() => {
                setShowModal();
              }}
            />
            <MyButton
              type={'medium'}
              text="Đã nhận hàng"
              btnColor={stylesGlobal.mainGreen}
              txtColor="white"
              action={() => {
                navigation.navigate('ReceiveGoods', { item: item });
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
