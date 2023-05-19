import styles from './stylesDeposit';
import stylesGlobal from '../../../../../global/stylesGlobal';
import MyInput from '../../../../../components/MyInput/MyInput';
import MyButton from '../../../../../components/MyButton/MyButton';

import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { LogBox } from 'react-native';
import axiosClient from '../../../../../api/axiosClient';
import { AuthContext } from '../../../../../context/AuthContext';
import { convertMoneyToVietnamese } from '../../../../../global/util';
import { LoginSuccess } from '../../../../../context/AuthAction';

export default function Deposit({ navigation }) {
  LogBox.ignoreAllLogs();

  const [money, setMoney] = useState('');
  const [validMoney, setValidMoney] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const handleDeposit = async () => {
    if (+money <= 100000) {
      Alert.alert('Thông báo', 'Số tiền phải lớn hơn 100,000 vnđ');
    } else if (+money >= 100000000) {
      Alert.alert('Thông báo', 'Số tiền phải nhỏ hơn 100,000,000 vnđ');
    } else {
      const shipperSend = user;
      shipperSend.balance = Number(shipperSend.balance) + Number(money);
      const dataSend = {
        shipperSend: shipperSend,
        id_handler: user._id,
      };
      await axiosClient.put('gotruck/profileshipper/recharge/' + shipperSend.id_shipper, dataSend);
      const userLogin = await axiosClient.get('/gotruck/authshipper/user/' + user.phone);
      dispatch(LoginSuccess(userLogin));
      setMoney('');
      navigation.navigate('DepositSuccess');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.viewInput}>
        <Text>Nhập số tiền cần nạp</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <MyInput
            borderWidth={1}
            width={'94%'}
            value={setMoney}
            regex={/^\d+$/}
            error={'Số tiền không hợp lệ'}
            valid={setValidMoney}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold', top: 10 }}>VNĐ</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        {validMoney ? (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            text={'Nạp tiền'}
            action={() => {
              handleDeposit();
            }}
          />
        ) : (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.lightGreen}
            txtColor={'white'}
            text={'Nạp tiền'}
            disable={true}
          />
        )}
      </View>
    </ScrollView>
  );
}
