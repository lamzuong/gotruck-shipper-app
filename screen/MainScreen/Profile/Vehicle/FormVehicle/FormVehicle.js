import styles from './stylesFormVehicle';
import stylesGlobal from '../../../../../global/stylesGlobal';
import { sliceIntoChunks } from '../../../../../global/functionGlobal';
import MyInput from '../../../../../components/MyInput/MyInput';
import MyButton from '../../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../../components/ButtonAdd/ButtonAdd';

import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FormVehicle() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const [nameTruck, setNameTruck] = useState('');
  const [numberTruck, setNumberTruck] = useState('');
  const [brandTruck, setBrandTruck] = useState('');
  const [imagesTruck, setImagesTruck] = useState([
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
    'https://ecdn.game4v.com/g4v-content/uploads/2020/05/Khoanh-khac-vi-dai-cua-Luffy-0-game4v.png',
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
  ]);
  const [imagesPapers, setImagesPapers] = useState([
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
    'https://ecdn.game4v.com/g4v-content/uploads/2020/05/Khoanh-khac-vi-dai-cua-Luffy-0-game4v.png',
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
  ]);

  const renderRowImage = (arr, listImages = [], column = 3) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          {arr.map((e, i) => (
            <View style={{ width: '36%' }} key={i}>
              <Image source={{ uri: e }} style={styles.itemImage} />
            </View>
          ))}
          {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length < column ? (
            <ButtonAdd action={() => {}} />
          ) : null}
        </View>
        {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length == column ? (
          <ButtonAdd action={() => {}} />
        ) : null}
      </View>
    );
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.viewInput}>
        <Text>Biển số xe</Text>
        <MyInput
          borderWidth={1}
          placeholder={'59-M1.12345'}
          value={setNumberTruck}
          initialValue={item.license_plate}
        />
      </View>
      <View style={styles.viewInput}>
        <Text>Tên xe</Text>
        <MyInput
          borderWidth={1}
          placeholder={'Suzuki Carry Truck'}
          value={setNameTruck}
          initialValue={item.name}
        />
      </View>
      <View style={styles.viewInput}>
        <Text>Trọng tải</Text>
        <MyInput
          borderWidth={1}
          placeholder={'Toyota, Suzuki,...'}
          value={setBrandTruck}
          initialValue={item.type_truck.name+""}
        />
      </View>
      <View style={styles.viewInput}>
        <Text>Hình ảnh xe</Text>
        {sliceIntoChunks(imagesTruck, 3).map((e, i) => (
          <View key={i}>{renderRowImage(e, imagesTruck, 3)}</View>
        ))}
      </View>
      <View style={styles.viewInput}>
        <Text>Hình ảnh giấy tờ xe</Text>
        {sliceIntoChunks(imagesPapers, 3).map((e, i) => (
          <View key={i}>{renderRowImage(e, imagesPapers, 3)}</View>
        ))}
      </View>
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <MyButton
          btnColor={stylesGlobal.mainGreen}
          type={'large'}
          text={'Gửi yêu cầu'}
          txtColor="white"
          action={() => {
            navigation.navigate('SendFormSuccess');
          }}
        />
      </View>
    </ScrollView>
  );
}
