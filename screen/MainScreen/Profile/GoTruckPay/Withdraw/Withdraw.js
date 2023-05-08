import styles from './stylesWithdraw';
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

export default function Withdraw({ navigation }) {
  LogBox.ignoreAllLogs();

  const [money, setMoney] = useState('');
  const [validMoney, setValidMoney] = useState(false);

  const [accountNumber, setAccountNumber] = useState('');
  const [validAccountNumber, setValidAccountNumber] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [validAccountName, setValidAccountName] = useState(false);

  const [openBank, setOpenBank] = useState(false);
  const [valueBank, setValueBank] = useState('');
  const [itemsBank, setItemsBank] = useState([]);
  const [listBank, setListBank] = useState([]);
  const { user, dispatch } = useContext(AuthContext);

  const checkValid = validMoney && validAccountNumber && validAccountName;

  const handleWithdraw = async () => {
    if (money < 100000) {
      Alert.alert('Thông báo', 'Số tiền rút tối thiểu là 100,000 đồng');
      return;
    } else if (money > 10000000) {
      Alert.alert('Thông báo', 'Số tiền rút tối đa là 10,000,000 đồng');
      return;
    }
    const bankSelected = listBank.find((item) => item.name_short === valueBank);

    const resBlock = await axiosClient.get('gotruck/authshipper/block/' + user._id);
    if (resBlock.block) {
      Alert.alert('Thông báo', 'Tài bạn của bạn đã bị khóa');
      return;
    }

    const resOrderCurrent = await axiosClient.get('/gotruck/ordershipper/ordercurrent/' + user._id);
    const feeOrder = resOrderCurrent.total * (resOrderCurrent.fee / 100) || 0;
    if (user.balance >= money && user.balance >= feeOrder) {
      const withdrawTemp = {
        id_shipper: user._id,
        money: money,
        id_bank: bankSelected._id,
        account_number: accountNumber,
        account_name: accountName,
        status: 'Đang xử lý',
        type: 'Rút tiền',
      };

      const resWithdraw = await axiosClient.post('gotruck/bank/withdraw', withdrawTemp);
      const userLogin = await axiosClient.get('/gotruck/authshipper/user/' + user.phone);
      dispatch(LoginSuccess(userLogin));
      navigation.navigate('WithdrawSuccess');
    } else {
      if (user.balance >= feeOrder) {
        Alert.alert('Thông báo', 'Số dư ví GoTruck của bạn không đủ');
      } else {
        Alert.alert('Thông báo', 'Số dư ví GoTruck không đủ để trừ phí đơn hàng hiện tại');
      }
    }
  };

  useEffect(() => {
    const getBanks = async () => {
      const resBank = await axiosClient.get('gotruck/bank');
      const listbank = [];
      resBank.forEach((bank) => {
        listbank.push({ label: bank.name_full, value: bank.name_short });
      });
      setListBank(resBank);
      setValueBank(listbank[0].value);
      setItemsBank(listbank);
    };
    getBanks();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.viewInput}>
        <Text>Nhập số tiền cần rút</Text>
        <View style={stylesGlobal.inlineBetween}>
          <MyInput
            borderWidth={1}
            width={'94%'}
            value={setMoney}
            regex={/^\d+$/}
            error={'Số tiền không hợp lệ'}
            valid={setValidMoney}
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>VNĐ</Text>
        </View>
      </View>
      <View style={styles.viewInput}>
        <Text>Ngân hàng</Text>
        <DropDownPicker
          open={openBank}
          value={valueBank}
          items={itemsBank}
          setOpen={setOpenBank}
          setValue={setValueBank}
          setItems={setItemsBank}
          zIndex={10000}
          maxHeight={150}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          placeholder={'Chọn một ngân hàng'}
        />
      </View>

      <View style={styles.viewInput}>
        <Text>Số tài khoản</Text>
        <MyInput
          borderWidth={1}
          value={setAccountNumber}
          regex={/^.+$/}
          error={'Số tài khoản không được để trống'}
          valid={setValidAccountNumber}
        />
      </View>
      <View style={styles.viewInput}>
        <Text>Tên chủ tài khoản</Text>
        <MyInput
          borderWidth={1}
          value={setAccountName}
          regex={/^.+$/}
          error={'Tên tài khoản không được để trống'}
          valid={setValidAccountName}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        {checkValid ? (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            text={'Rút tiền'}
            action={() => {
              handleWithdraw();
            }}
          />
        ) : (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.lightGreen}
            txtColor={'white'}
            text={'Rút tiền'}
            disable={true}
          />
        )}
      </View>
    </ScrollView>
  );
}
