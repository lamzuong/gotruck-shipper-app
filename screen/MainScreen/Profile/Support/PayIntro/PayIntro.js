import styles from './stylesPayIntro';

import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function PayIntro() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.txtBig}>Bước 1: Vào tài khoản E-Baking của bạn</Text>
      <Text style={styles.txtBig}>Bước 2: Chuyển khoản cho một trong các số tài khoản sau:</Text>
      <View style={styles.viewBank}>
        <Text style={styles.txtSmall}>Ngân hàng: Agribank</Text>
        <Text style={styles.txtSmall}>Số tài khoản: 6421 2053 77670</Text>
        <Text style={styles.txtSmall}>Số thẻ: 5214 3698 5214 1565</Text>
        <Text style={styles.txtSmall}>Tên người thụ hưởng: VUONG ANH LAM</Text>
      </View>
      <View style={styles.viewBank}>
        <Text style={styles.txtSmall}>Ngân hàng: BIDV</Text>
        <Text style={styles.txtSmall}>Số tài khoản: 1441 0000 197 177</Text>
        <Text style={styles.txtSmall}>Số tài khoản: 1121 3452 1513 1254</Text>
        <Text style={styles.txtSmall}>Tên người thụ hưởng: NGUYEN TRUNG QUOC</Text>
      </View>
      <View>
        <Text style={styles.txtBig}>Bước 3: Nhập số tiền cần chuyển</Text>
        <Text style={styles.txtSmall}>Số tiền chuyển cũng sẽ là số tiền nạp vào ví</Text>
      </View>
      <View>
        <Text style={styles.txtBig}>Bước 4: Nhập lời nhắn theo cú pháp</Text>
        <Text style={styles.txtSmall}>Mã tài xế - Tên tài xế</Text>
        <Text style={styles.txtSmall}>Ví dụ: SHP202301 - NGUYEN VAN AN</Text>
      </View>
    </ScrollView>
  );
}
