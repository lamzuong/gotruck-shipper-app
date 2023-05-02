import styles from './stylesVehicle';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';

import {
  View,
  Text,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { LoginSuccess } from '../../../../context/AuthAction';

export default function Vehicle({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});
  const { user, dispatch } = useContext(AuthContext);

  const truck = user.infoAllTruck;

  const handleSetDefault = async () => {
    Alert.alert('Thông báo', 'Sau khi thay đổi phương tiện mặc định, bạn cần phải đăng nhập lại', [
      {
        text: 'Hủy',
        onPress: () => {
          setModalVisible(false);
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const res = await axiosClient.put('gotruck/profileshipper/vehicle', {
            id_shipper: user._id,
            name: item.name,
          });
          setModalVisible(false);
          navigation.navigate('Login');
        },
      },
    ]);
  };

  const deleteVehicle = () => {
    setModalVisible(!modalVisible);
    return Alert.alert('Cảnh báo', 'Bạn có chắc muốn xóa phương tiện này không?', [
      {
        text: 'Hủy',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const res = await axiosClient.put('gotruck/profileshipper/vehicle/delete', {
            id_shipper: user._id,
            name: item.name,
            license_plate: item.license_plate,
          });

          const userLogin = await axiosClient.get('/gotruck/authshipper/user/' + user.phone);
          dispatch(LoginSuccess(userLogin));
          setModalVisible(false);
        },
      },
    ]);
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
    <ScrollView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalView}>
            <View style={styles.viewOptions}>
              {item.status !== 'Chưa duyệt' && item.default !== true && (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    handleSetDefault();
                  }}
                >
                  <Feather name="check" size={24} color="black" />
                  <Text style={styles.titleOption}>{'\t\t'}Chọn làm mặc định</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.option} onPress={deleteVehicle}>
                <MaterialIcons name="delete-outline" size={24} color="black" />
                <Text style={styles.titleOption}>{'\t\t'}Xóa phương tiện</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {truck?.map((e, i) => (
        <TouchableOpacity
          style={styles.itemTruck}
          key={i}
          onPress={() => {
            if (e.default !== true) {
              setModalVisible(!modalVisible);
            }
            setItem(e);
          }}
        >
          <View style={styles.nameAndStatus}>
            <Text style={styles.nameTruck}>{e.name}</Text>
            {e.status === 'Đã duyệt' ? (
              <Text style={styles.status2}>Đã xác minh</Text>
            ) : (
              <Text style={styles.statusPending}>Đang xác minh</Text>
            )}
          </View>
          <Text>{e.license_plate}</Text>
          {e.default ? (
            <Text style={styles.defaultTruck}>
              <AntDesign name="checkcircleo" size={12} color="#04AF46" />
              {'\t\t'}
              Đã chọn làm mặc định
            </Text>
          ) : null}
        </TouchableOpacity>
      ))}
      <View style={{ marginTop: 10 }}>
        <ButtonAdd
          action={() => {
            // if (truck.length >= 5) {
            //   Alert.alert('Thông báo', 'Bạn chỉ được đăng kí tối đa 5 phương tiện');
            // } else {
            navigation.navigate('FormVehicle');
            // }
          }}
        />
      </View>
    </ScrollView>
  );
}
