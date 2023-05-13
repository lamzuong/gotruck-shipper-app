import MyButton from '../../../../components/MyButton/MyButton';
import MyInput from '../../../../components/MyInput/MyInput';
import stylesGlobal from '../../../../global/stylesGlobal';
import styles from './stylesEditProfile';

import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import axiosClient from '../../../../api/axiosClient';
import { firebaseConfig } from '../../../../config';
import { LoginSuccess } from '../../../../context/AuthAction';
import { AuthContext } from '../../../../context/AuthContext';

const widthScreen = Dimensions.get('window').width;

export default function EditProfile({ navigation }) {
  const { user, dispatch } = useContext(AuthContext);

  const nameInit = user.name;
  const phoneInit = user.phone;
  const imageuserInit = user.avatar;

  const [name, setName] = useState(nameInit);
  const [validName, setValidName] = useState(true);
  const [phone, setPhone] = useState(phoneInit);
  const [validPhone, setValidPhone] = useState(true);
  const [codeOTP, setCodeOTP] = useState();
  const [validCodeOTP, setValidCodeOTP] = useState(true);
  const [screen, setScreen] = useState(1);
  const [verificationId, setVerificationId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUserNow, setImageUserNow] = useState({ uri: imageuserInit });

  const scrollViewRef = useRef();
  const recaptchaVerifier = useRef(null);

  const checkValid = () => validName && validPhone;
  const checkChange = () => {
    if (checkValid()) {
      const phone = formatPhone();
      return name != nameInit || phone != phoneInit || imageUserNow.uri != user.avatar;
    }
    return false;
  };

  const formatPhone = () => {
    let phoneTemp = phone;
    if (phone.charAt(0) != '0') {
      phoneTemp = '0' + phone;
    }
    return phoneTemp;
  };

  const sendVerification = async () => {
    const phone = formatPhone();
    try {
      const res = await axiosClient.get('/gotruck/authshipper/user/' + phone);
      if (res.phone) {
        customAlert('Thông báo', 'Số điện thoại này đã được sử dụng bởi tài xế khác!', null);
      } else {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
          .verifyPhoneNumber('+84' + phone, recaptchaVerifier.current)
          .then((result) => {
            setVerificationId(result);
            nextScreen();
          })
          .catch((error) => {
            console.log(error?.code);
            if (error.code === 'auth/too-many-requests') {
              Alert.alert(
                'Thông báo',
                'Bạn đã yêu cầu gửi mã OTP quá nhiều lần\nVui lòng thử lại sau',
              );
            }
          });
      }
    } catch (error2) {
      customAlert('Thông báo', 'Lỗi không xác định', null);
    }
  };

  const updateProfile1 = async () => {
    const resOrderCurrent = await axiosClient.get('/gotruck/ordershipper/ordercurrent/' + user._id);
    if (!resOrderCurrent.isNotFound) {
      Alert.alert('Thông báo', 'Trong quá trình giao hàng không thể thay đổi số điện thoại');
      setModalVisible(false);
      return;
    }

    const phone = formatPhone();
    if (phone != phoneInit) {
      Alert.alert(
        'Xác nhận',
        'Bạn chắc chắn đổi số điện thoại không?\nNếu có, số điện thoại này sẽ được sử dụng để đăng nhập thay cho số điện thoại hiện tại',
        [
          {
            text: 'Hủy',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'OK', onPress: () => sendVerification() },
        ],
      );
    } else {
      if (imageUserNow.uri != user.avatar) {
        uploadFirebaseAndFinishEditProfile(imageUserNow, false);
      } else {
        user.name = name;
        await axiosClient.put('/gotruck/authshipper/user', {
          ...user,
        });
        dispatch(LoginSuccess(user));
        navigation.goBack();
      }
    }
  };

  const updateProfile2 = async () => {
    if (codeOTP) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeOTP);
      return firebase
        .auth()
        .signInWithCredential(credential)
        .then(async () => {
          if (imageUserNow.uri != user.avatar) {
            uploadFirebaseAndFinishEditProfile(imageUserNow, true);
          } else {
            const phone = formatPhone();
            user.phone = phone;
            user.name = name;
            await axiosClient.put('/gotruck/authshipper/user/edituser', {
              user: {
                ...user,
              },
              phoneInit: phoneInit,
            });

            dispatch(LoginSuccess(user));
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log(err?.code);
          if (err?.code === 'auth/invalid-verification-code') {
            Alert.alert('Thông báo', 'Mã OTP không chính xác');
          } else if (err?.code === 'auth/code-expired') {
            Alert.alert('Thông báo', 'Đã hết hạn nhập mã OTP\nVui lòng xác minh lại');
          } else {
            Alert.alert('Thông báo', 'Mã OTP không chính xác');
          }
        });
    }
  };

  const customAlert = (type, message, option) => {
    Alert.alert(type, message, [
      {
        text: 'Xác nhận',
        style: 'cancel',
      },
    ]);
  };

  const backScreen = () => {
    setScreen((prev) => prev - 1);
  };
  const nextScreen = () => {
    setCodeOTP(false);
    setScreen((prev) => prev + 1);
  };

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
      setImageUserNow(result.assets[0]);
    }
  };
  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn đã từ chối cấp quyền truy cập kho ảnh', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImageUserNow(result.assets[0]);
    } else {
    }
  };

  const uploadFirebaseAndFinishEditProfile = async (imageUpload, phoneChange) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUpload.uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it
    blob.close();
    snapshot.ref.getDownloadURL().then(async function (downloadURL) {
      if (phoneChange) {
        const phone = formatPhone();
        user.avatar = downloadURL;
        user.phone = phone;
        user.name = name;
        await axiosClient.put('/gotruck/authshipper/user/edituser', {
          user: {
            ...user,
          },
          phoneInit: phoneInit,
        });
      } else {
        user.avatar = downloadURL;
        user.name = name;
        await axiosClient.put('/gotruck/authshipper/user', {
          ...user,
        });
      }
      dispatch(LoginSuccess(user));
      navigation.goBack();
    });
  };

  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  showImagePicker();
                  setModalVisible(!modalVisible);
                }}
              >
                <View styles={{ width: '100%' }}>
                  <FontAwesome
                    name="image"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View styles={{ width: '100%' }}>
                  <Text style={styles.chupanh}>Chọn ảnh từ thư viện</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  openCamera();
                  setModalVisible(!modalVisible);
                }}
              >
                <View styles={{ width: '100%' }}>
                  <AntDesign
                    name="camera"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View>
                  <Text style={styles.chupanh}>Chụp ảnh</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <View style={styles.header}>
          <Ionicons
            style={styles.iconBack}
            name="arrow-back"
            size={40}
            color={'white'}
            onPress={() => (screen == 1 ? navigation.goBack() : backScreen())}
          />
          <Image
            source={require('../../../../assets/images/anh-bia-truck.png')}
            style={styles.coverImage}
          />
          {screen == 1 && (
            <TouchableOpacity style={styles.viewAvatar} onPress={() => {}}>
              <Image
                source={{
                  uri: imageUserNow.uri,
                }}
                style={styles.avatar}
              />
              {/* <AntDesign name="camera" size={24} color="black" style={styles.camera} /> */}
            </TouchableOpacity>
          )}
        </View>

        {screen == 1 ? (
          <>
            {/* <View style={styles.viewInput}>
              <Text style={styles.label}>Họ tên</Text>
              <MyInput
                borderWidth={1}
                initialValue={nameInit}
                value={setName}
                valid={setValidName}
                regex={/^[a-zA-Z ]{1,30}$/}
                inputName={true}
                error={'Họ tên không hợp lệ'}
              />
            </View> */}

            <View style={styles.viewInput}>
              <Text style={styles.label}>Số điện thoại</Text>
              <View style={stylesGlobal.inlineBetween}>
                <View style={stylesGlobal.inline}>
                  <Image
                    source={require('../../../../assets/images/flag-vn.jpg')}
                    style={styles.flagVn}
                  />
                  <Text style={{ fontSize: 18, marginLeft: 5 }}>+84</Text>
                </View>
                <MyInput
                  borderWidth={1}
                  width={widthScreen - 140}
                  initialValue={phoneInit}
                  value={setPhone}
                  valid={setValidPhone}
                  regex={/^(((09|03|07|08|05)|(9|3|7|8|5))([0-9]{8}))$/g}
                  error={'Số điện thoại không hợp lệ'}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.screenOTP}>
            <View style={styles.viewInput}>
              <Text style={styles.label}>Nhập mã OTP</Text>
              <MyInput
                borderWidth={1}
                placeholder={'Nhập mã OTP'}
                error={'Mã OTP không hợp lệ'}
                regex={/^[0-9]{6}$/g}
                width={widthScreen - 60}
                value={setCodeOTP}
                valid={setValidCodeOTP}
                //  screen={screen}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        {screen == 2 ? (
          validCodeOTP ? (
            <MyButton
              type={'medium2'}
              btnColor={stylesGlobal.mainGreen}
              txtColor={'white'}
              text="Tiếp tục"
              action={() => updateProfile2()}
            />
          ) : (
            <MyButton
              type={'medium2'}
              btnColor={stylesGlobal.lightGreen}
              txtColor={'white'}
              text="Tiếp tục"
              disable={true}
            />
          )
        ) : checkChange() ? (
          <MyButton
            type={'medium2'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            text="Lưu thông tin"
            action={() => updateProfile1()}
          />
        ) : (
          <MyButton
            type={'medium2'}
            btnColor={stylesGlobal.lightGreen}
            txtColor={'white'}
            text="Lưu thông tin"
            disable={true}
          />
        )}
      </View>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
    </View>
  );
}
