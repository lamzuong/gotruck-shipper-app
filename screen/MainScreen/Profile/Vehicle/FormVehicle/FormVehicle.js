import styles from './stylesFormVehicle';
import stylesGlobal from '../../../../../global/stylesGlobal';
import { sliceIntoChunks } from '../../../../../global/functionGlobal';
import MyInput from '../../../../../components/MyInput/MyInput';
import MyButton from '../../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../../components/ButtonAdd/ButtonAdd';

import { View, Text, ScrollView, Image, Alert, Linking, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedLoader from 'react-native-animated-loader';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat';
import uuid from 'react-native-uuid';
import DropDownPicker from 'react-native-dropdown-picker';
import axiosClient from '../../../../../api/axiosClient';
import { AuthContext } from '../../../../../context/AuthContext';
import { LoginSuccess } from '../../../../../context/AuthAction';

export default function FormVehicle() {
  const [openTruck, setOpenTruck] = useState(false);
  const [valueTruck, setValueTruck] = useState('');
  const [itemsTruck, setItemsTruck] = useState([]);

  const [nameTruck, setNameTruck] = useState('');
  const [validNameTruck, setValidNameTruck] = useState(false);
  const [numberTruck, setNumberTruck] = useState('');
  const [validNumberTruck, setValidNumberTruck] = useState(false);

  const [listImages, setListImages] = useState([]);
  const [listImageSends, setListImageSend] = useState([]);
  const [listImagesVehicleRegistration, setListImagesVehicleRegistration] = useState([]);
  const [listImageSendsVehicleRegistration, setListImageSendVehicleRegistration] = useState([]);
  const [checkUpload, setCheckUpload] = useState(false);
  const [trucksType, setTrucksType] = useState([]);
  const { user, dispatch } = useContext(AuthContext);

  const checkValid = () => validNameTruck && validNumberTruck;

  const navigation = useNavigation();

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

  const openCamera2 = async () => {
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
      setListImagesVehicleRegistration([...listImagesVehicleRegistration, result.assets[0].uri]);
      setListImageSendVehicleRegistration([...listImageSendsVehicleRegistration, result.assets[0]]);
    }
  };

  const uploadImage = async (list) => {
    let listTemp = [];
    for (let i = 0; i < list.length; i++) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', list[i].uri, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(uuid.v4());
      const snapshot = await ref.put(blob);
      // We're done with the blob, close and release it
      blob.close();
      const temp = await snapshot.ref.getDownloadURL();
      listTemp.push(temp);
    }
    return listTemp;
  };

  const handleSendRequest = async () => {
    setCheckUpload(true);
    let listURLImage = await uploadImage(listImageSends);
    let listURLImageVehicleRegistration = await uploadImage(listImageSendsVehicleRegistration);
    // api add
    const typeTruckTemp = trucksType.find((item) => item.name === valueTruck);
    const newTruck = {
      license_plate: numberTruck.trim(),
      id_shipper: user._id,
      name: nameTruck.trim(),
      type_truck: typeTruckTemp._id,
      list_image_info: listURLImage,
      status: 'Chưa duyệt',
      default: false,
      deleted: false,
      list_vehicle_registration: listURLImageVehicleRegistration,
    };
    const resTruck = await axiosClient.post('/gotruck/profileshipper/vehicle', newTruck);
    if (resTruck.isExist) {
      Alert.alert('Thông báo', 'Xe này đã được sử dụng bởi tài xế khác');
      setCheckUpload(false);
      return;
    }
    const userLogin = await axiosClient.get('/gotruck/authshipper/user/' + user.phone);
    dispatch(LoginSuccess(userLogin));
    setCheckUpload(false);
    navigation.navigate('Vehicle');
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

  const removeImage2 = (uri) => {
    const newListImage = listImagesVehicleRegistration;
    const newListImageSend = listImageSendsVehicleRegistration;

    const index = listImagesVehicleRegistration.indexOf(uri);
    if (index > -1) {
      newListImage.splice(index, 1);
      newListImageSend.splice(index, 1);
    }
    setListImagesVehicleRegistration([...newListImage]);
    setListImageSendVehicleRegistration([...newListImageSend]);
  };

  useEffect(() => {
    const getTrucksType = async () => {
      const res = await axiosClient.get('/gotruck/transportprice/trucktype');
      let trucksType = [];
      for (const e of res) {
        trucksType.push({
          label: 'Xe ' + e.name + ' tấn',
          value: e.name,
        });
      }
      setTrucksType([...res]);
      setValueTruck(trucksType[0].value);
      setItemsTruck(trucksType);
    };
    getTrucksType();
  }, []);

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
                  source={require('../../../../../assets/images/close.png')}
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

  const renderRowImage2 = (arr, listImages = [], column = 3) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          {arr.map((e, i) => (
            <View style={{ width: '36%' }} key={i}>
              <Image source={{ uri: e }} style={styles.itemImage} />
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => {
                  removeImage2(e);
                }}
              >
                <Image
                  source={require('../../../../../assets/images/close.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          ))}
          {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length < column ? (
            <ButtonAdd action={() => openCamera2()} />
          ) : null}
        </View>
        {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length == column ? (
          <ButtonAdd action={() => openCamera2()} />
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {checkUpload ? (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          speed={1}
          loop={true}
        ></AnimatedLoader>
      ) : (
        <>
          <View style={styles.viewInput}>
            <Text>Biển số xe</Text>
            <MyInput
              borderWidth={1}
              placeholder={'VD: 59-M1.12345'}
              value={setNumberTruck}
              regex={/^(([1-9]{2}|([2-9][0-9]))-([A-Z][1-9]).(\d{4}|\d{5}))$/}
              error={'Biển số xe không hợp lệ'}
              valid={setValidNumberTruck}
              // initialValue={numberTruck}
            />
          </View>
          <View style={styles.viewInput}>
            <Text>Tên xe</Text>
            <MyInput
              borderWidth={1}
              placeholder={'VD: Suzuki Carry Truck'}
              value={setNameTruck}
              regex={/^.+$/}
              error={'Tên xe không được để trống'}
              valid={setValidNameTruck}
              // initialValue={nameTruck}
            />
          </View>

          <View style={styles.viewInput}>
            <Text>Chọn loại xe</Text>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <DropDownPicker
                open={openTruck}
                value={valueTruck}
                items={itemsTruck}
                setOpen={setOpenTruck}
                setValue={setValueTruck}
                setItems={setItemsTruck}
                labelStyle={styles.font18}
                textStyle={styles.font18}
                zIndex={10000}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                placeholder="Chọn một loại xe"
                defaultValue={'sports'}
              />
            </View>
          </View>

          <View style={styles.viewInputImage}>
            <Text>Hình ảnh xe (tối thiểu 3 ảnh)</Text>
            {listImages.length != 0 ? (
              <>
                {sliceIntoChunks(listImages, 3).map((e, i) => (
                  <View key={i}>{renderRowImage(e, listImages, 3)}</View>
                ))}
              </>
            ) : (
              <ButtonAdd action={() => openCamera()} />
            )}
          </View>

          <View style={styles.viewInputImage}>
            <Text>Hình ảnh bằng lái và cmnd/cccd (tối thiểu 4 ảnh)</Text>
            {listImagesVehicleRegistration.length != 0 ? (
              <>
                {sliceIntoChunks(listImagesVehicleRegistration, 3).map((e, i) => (
                  <View key={i}>{renderRowImage2(e, listImagesVehicleRegistration, 3)}</View>
                ))}
              </>
            ) : (
              <ButtonAdd action={() => openCamera2()} />
            )}
          </View>

          <View style={{ marginTop: 20, marginBottom: 30 }}>
            {checkValid() && listImages.length >= 3 && listImagesVehicleRegistration.length >= 4 ? (
              <MyButton
                btnColor={stylesGlobal.mainGreen}
                type={'large'}
                text={'Gửi yêu cầu'}
                txtColor="white"
                action={() => {
                  handleSendRequest();
                }}
              />
            ) : (
              <MyButton
                btnColor={stylesGlobal.lightGreen}
                type={'large'}
                text={'Gửi yêu cầu'}
                txtColor="white"
                disable={true}
              />
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
