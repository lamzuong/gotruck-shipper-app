import stylesGlobal from '../../../../global/stylesGlobal';
import styles from './stylesExpectedAddress';

import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import MyInput from '../../../../components/MyInput/MyInput';
import { AuthContext } from '../../../../context/AuthContext';
import { LoginSuccess } from '../../../../context/AuthAction';
import { getAddressFromText } from '../../../../global/utilLocation';
import axiosClient from '../../../../api/axiosClient';

export default function ExpectedAddress() {
  const [keyword, setKeyword] = useState('');
  const [listResultAddress, setListResultAddress] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const { locationNow, user, dispatch } = useContext(AuthContext);

  const locationNowUser = {
    address: 'Vị trí hiện tại',
    location: {
      lat: locationNow?.latitude,
      lng: locationNow?.longitude,
    },
  };

  const handleAddress = async (address) => {
    let addressSelected = {
      latitude: address.location.lat || 0,
      longitude: address.location.lng || 0,
      address: address.address === 'Vị trí hiện tại' ? locationNow.address : address.address,
    };
    const userNew = user;
    userNew.expected_address = addressSelected;
    const res = await axiosClient.post('gotruck/ordershipper/expectedaddress', userNew);
    dispatch(LoginSuccess(userNew));
    navigation.navigate('Home', { expected_address: addressSelected });
  };

  useEffect(() => {
    setLoader(true);
    const delayFC = setTimeout(async () => {
      if (keyword) {
        const resultAddress = await getAddressFromText(keyword);
        if (resultAddress) {
          setListResultAddress(resultAddress);
        } else {
          setListResultAddress([]);
        }
      } else {
        setListResultAddress([]);
      }
      setLoader(false);
    }, 1000);
    return () => clearTimeout(delayFC);
  }, [keyword]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={25}
          color={stylesGlobal.mainGreen}
          onPress={() => navigation.goBack()}
          style={{ left: -10 }}
        />

        <MyInput
          placeholder={'Nhập địa chỉ '}
          value={setKeyword}
          borderWidth={1}
          borderColor={stylesGlobal.darkGrey}
        />
      </View>
      <View style={styles.listAddress}>
        {keyword && listResultAddress?.length > 0 ? (
          <>
            {listResultAddress?.map((e, i) => (
              <View key={i} style={styles.itemAddress}>
                <TouchableOpacity
                  onPress={() => {
                    handleAddress(e);
                  }}
                >
                  <Text style={styles.address}>{e.address}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : keyword && listResultAddress?.length === 0 && !loader ? (
          <View style={styles.itemAddress}>
            <Text style={styles.address}>Không tìm thấy</Text>
          </View>
        ) : (
          <View style={styles.itemAddress}>
            <TouchableOpacity
              onPress={() => {
                handleAddress(locationNowUser);
              }}
            >
              <Text style={styles.address}>{locationNowUser.address}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView></ScrollView>

      <Pressable
        style={styles.buttonFooter}
        onPress={() => {
          navigation.navigate('SelectLocationOnMap');
        }}
      >
        <Ionicons name="location" size={24} color="red" />
        <Text style={styles.txtFooter}>Chọn từ bản đồ</Text>
      </Pressable>
    </View>
  );
}
