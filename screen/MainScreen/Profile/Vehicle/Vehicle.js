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
import {axiosClient} from "../../../../api/axiosClient"
import { AuthContext } from '../../../../context/AuthContext';
export default function Vehicle({ navigation }) {
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

  const {user} = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});
  const [truck, setTruck] = useState(user.infoAllTruck || []);


  const editVehicle = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('FormVehicle', { item: item });
  };
  const deleteVehicle = () => {
    setModalVisible(!modalVisible);
    return Alert.alert('Cảnh báo', 'Bạn có chắc muốn xóa phương tiện này không?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log(item.nameTruck) },
    ]);
  };

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
              <TouchableOpacity style={styles.option} onPress={() => {}}>
                <Feather name="check" size={24} color="black" />
                <Text style={styles.titleOption}>{'\t\t'}Chọn làm mặc định</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={editVehicle}>
                <AntDesign name="edit" size={24} color="black" />
                <Text style={styles.titleOption}>{'\t\t'}Sửa thông tin</Text>
              </TouchableOpacity>
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
            setModalVisible(!modalVisible);
            setItem(e);
          }}
        >
          <Text style={styles.nameTruck}>{e.name}</Text>
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
            navigation.navigate('FormVehicle');
          }}
        />
      </View>
    </ScrollView>
  );
}
