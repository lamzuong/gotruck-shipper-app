import styles from './stylesReceiveGoods';
import stylesGlobal from '../../../../global/stylesGlobal';
import { sliceIntoChunks } from '../../../../global/functionGlobal';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';
import MyButton from '../../../../components/MyButton/MyButton';

import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function ReceiveGoods({ navigation }) {
  const [listImages, setListImages] = useState([
    'https://genk.mediacdn.vn/2019/4/16/photo-1-1555407801845981270262.jpg',
    'https://genk.mediacdn.vn/2019/4/16/photo-1-1555407801845981270262.jpg',
    'https://upload.wikimedia.org/wikipedia/vi/f/f8/Nami_face.jpg',
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
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Hình ảnh hàng hóa</Text>
        {sliceIntoChunks(listImages, 3).map((e, i) => (
          <View key={i}>{renderRowImage(e, listImages, 3)}</View>
        ))}
      </ScrollView>
      <View style={{ alignItems: 'center' }}>
        {listImages.length > 0 ? (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.mainGreen}
            text="Xác nhận"
            txtColor={'white'}
            action={() => {
              navigation.navigate('Home', {
                received: true,
              });
            }}
          />
        ) : (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.lightGreen}
            text="Xác nhận"
            txtColor={'white'}
            disable
          />
        )}
      </View>
    </View>
  );
}
