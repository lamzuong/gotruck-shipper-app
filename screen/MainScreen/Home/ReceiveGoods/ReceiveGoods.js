import styles from './stylesReceiveGoods';
import stylesGlobal from '../../../../global/stylesGlobal';
import { sliceIntoChunks } from '../../../../global/functionGlobal';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';
import MyButton from '../../../../components/MyButton/MyButton';

import { View, Text, Image, ScrollView, Alert, Linking, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat';
import uuid from 'react-native-uuid';
import { useRoute } from '@react-navigation/native';
import { socketClient } from '../../../../global/socket';
import axiosClient from '../../../../api/axiosClient';
import AnimatedLoader from 'react-native-animated-loader';
import { AuthContext } from '../../../../context/AuthContext';
import * as FileSystem from 'expo-file-system';

export default function ReceiveGoods({ navigation }) {
  const [listImages, setListImages] = useState([]);
  const [listImageSends, setListImageSend] = useState([]);
  const [checkUpload, setCheckUpload] = useState(false);
  const { user } = useContext(AuthContext);
  const route = useRoute();
  const { item } = route.params;

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn đã từ chối cấp quyền truy cập máy ảnh', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.canceled) {
      setListImages([...listImages, result.assets[0].uri]);
      setListImageSend([...listImageSends, result.assets[0]]);
    }
  };

  const handleConfirm = async () => {
    let imageSize = 0;
    for (let i = 0; i < listImageSends.length; i++) {
      const fileInfo = await FileSystem.getInfoAsync(listImageSends[i].uri);
      imageSize += fileInfo.size;
    }
    if (imageSize > 10000000) {
      Alert.alert('Thông báo', 'Kích thước ảnh quá lớn');
      return;
    }

    const resTemp = await axiosClient.get('gotruck/order/order/' + item._id);
    if (!resTemp.isNotFound && resTemp.status === 'Đã hủy') {
      Alert.alert('Thông báo', 'Đơn hàng đã bị hủy');
      navigation.navigate('Home');
      return;
    }
    if (item.payer === 'send') {
      Alert.alert(
        'Thông báo',
        'Tiền vận chuyển do người gửi hàng trả.\nBạn nhớ nhận tiền vận chuyển tại người gửi hàng',
      );
    }
    setCheckUpload(true);
    let listURLImage = [];
    // setCheckUpload(true);
    for (let i = 0; i < listImageSends.length; i++) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', listImageSends[i].uri, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(uuid.v4());
      const snapshot = await ref.put(blob);
      // We're done with the blob, close and release it
      blob.close();
      const temp = await snapshot.ref.getDownloadURL();
      listURLImage.push(temp);
    }
    item.status = 'Đang giao';
    item.list_image_from_of_shipper = listURLImage;
    const resOrder = await axiosClient.put('/gotruck/ordershipper/receivegoods', item);
    socketClient.emit('shipper_shipping', resOrder);
    const sendNotify = {
      title: 'Thông báo đơn hàng ' + item.id_order,
      content: 'Tài xế ' + user.name + ' đã nhận hàng và đang vận chuyển hàng đến nơi giao hàng',
      image: listURLImage,
      type_notify: 'Order',
      type_send: 'Specific',
      id_receiver: item.id_customer?._id || item.id_customer,
      userModel: 'Customer',
    };
    await axiosClient.post('gotruck/notify/shipper', sendNotify);

    setCheckUpload(false);
    navigation.navigate('Home', {
      receivedGoods: true,
    });
  };

  const removeImage = (uri) => {
    const newListImage = listImages;
    const newListImageSend = listImageSends;

    const index = listImages.indexOf(uri);
    if (index > -1) {
      newListImage.splice(index, 1);
      newListImageSend.splice(index, 1);
    }
    setListImages([...newListImage]);
    setListImageSend([...newListImageSend]);
  };

  const renderRowImage = (arr, listImages = [], column = 3) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          {arr.map((e, i) => (
            <View style={{ width: '36%' }} key={i}>
              <Image source={{ uri: e }} style={styles.itemImage} />
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => {
                  removeImage(e);
                }}
              >
                <Image
                  source={require('../../../../assets/images/close.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          ))}
          {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length < column ? (
            <ButtonAdd action={() => openCamera()} />
          ) : null}
        </View>
        {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length == column ? (
          <ButtonAdd action={() => openCamera()} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {checkUpload ? (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          speed={1}
          loop={true}
        ></AnimatedLoader>
      ) : (
        <>
          <ScrollView>
            <Text style={styles.label}>Hình ảnh hàng hóa khi nhận hàng</Text>
            {listImages.length != 0 ? (
              <>
                {sliceIntoChunks(listImages, 3).map((e, i) => (
                  <View key={i}>{renderRowImage(e, listImages, 3)}</View>
                ))}
              </>
            ) : (
              <ButtonAdd action={() => openCamera()} />
            )}
          </ScrollView>
          <View style={{ alignItems: 'center' }}>
            {listImages.length > 0 ? (
              <MyButton
                type={'large'}
                btnColor={stylesGlobal.mainGreen}
                text="Xác nhận"
                txtColor={'white'}
                action={() => {
                  handleConfirm();
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
        </>
      )}
    </View>
  );
}
