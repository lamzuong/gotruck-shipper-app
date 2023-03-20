import stylesGlobal from '../../../../../global/stylesGlobal';
import styles from './stylesSelectLocationOnMap';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useRef } from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getAddressFromLocation, getRouteTwoLocation } from '../../../../../global/utilLocation';
import { AuthContext } from '../../../../../context/AuthContext';
import axiosClient from '../../../../../api/axiosClient';

export default function SelectLocationOnMap() {
  const {user} = useContext(AuthContext)
  const navigation = useNavigation();

  const mapRef = useRef();

  const route = useRoute();

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  let INITIAL_POSITION = {
    latitude: 10.820685,
    longitude: 106.687631,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const handleAddress = async () => {
    const camera = await mapRef.current?.getCamera();
    const resultAddress = await getAddressFromLocation(camera.center);
    let addressSelected = {
      latitude: camera.center.latitude || 0,
      longitude: camera.center.longitude || 0,
      address: resultAddress,
    };
    const userNew = user;
    userNew.expected_address = addressSelected;
    const res = await axiosClient.post('gotruck/ordershipper/expectedaddress', userNew);

    navigation.navigate('Home', { expected_address: addressSelected });
  };

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.iconBack}
        name="arrow-back"
        size={30}
        color={stylesGlobal.mainGreen}
        onPress={() => navigation.goBack()}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
      />
      <Ionicons name="location" size={30} color="red" style={styles.marker} />
      <TouchableOpacity style={styles.chonTrenBanDo} onPress={() => handleAddress()}>
        <Text style={{ fontSize: 17, color: 'white', padding: 5 }}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}
