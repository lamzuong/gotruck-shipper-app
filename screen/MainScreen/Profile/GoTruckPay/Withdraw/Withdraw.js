import styles from './stylesWithdraw';
import stylesGlobal from '../../../../../global/stylesGlobal';
import MyInput from '../../../../../components/MyInput/MyInput';
import MyButton from '../../../../../components/MyButton/MyButton';
import dataBank from './dataBank';

import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { LogBox } from 'react-native';

export default function Withdraw({ navigation }) {
  LogBox.ignoreAllLogs();

  const [money, setMoney] = useState('');
  const [brand, setBrand] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const [openBank, setOpenBank] = useState(false);
  const [valueBank, setValueBank] = useState(dataBank[0].value);
  const [itemsBank, setItemsBank] = useState(dataBank);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.viewInput}>
        <Text>Nhập số tiền cần rút</Text>
        <View style={stylesGlobal.inlineBetween}>
          <MyInput borderWidth={1} width={'94%'} value={setMoney} />
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
        />
      </View>
      <View style={styles.viewInput}>
        <Text>Chi nhánh</Text>
        <MyInput borderWidth={1} value={setBrand} />
      </View>
      <View style={styles.viewInput}>
        <Text>Số tài khoản</Text>
        <MyInput borderWidth={1} value={setAccountNumber} />
      </View>
      <View style={styles.viewInput}>
        <Text>Tên chủ tài khoản</Text>
        <MyInput borderWidth={1} value={setAccountName} />
      </View>
      <View style={{ marginTop: 20 }}>
        <MyButton
          type={'large'}
          btnColor={stylesGlobal.mainGreen}
          txtColor={'white'}
          text={'Rút tiền'}
          action={() => {
            navigation.navigate('WithdrawSuccess');
          }}
        />
      </View>
    </ScrollView>
  );
}
