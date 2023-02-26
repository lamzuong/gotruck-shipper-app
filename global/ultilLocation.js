import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from './keyGG';
import MapViewDirections from 'react-native-maps-directions';
export const getLocationCurrentOfUser = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Quyền truy cập vị trí đã bị từ chối');
    return null;
  }
  const location = await Location.getCurrentPositionAsync({});
  Geocoder.init(GOOGLE_API_KEY, {
    language: 'vn',
  });
  const dataGeocoder = await Geocoder.from({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
  const data = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    address: dataGeocoder?.results[0].formatted_address,
  };
  return data;
};
export const getDistanceTwoLocation = async (addressFrom, addressTo) => {
  if (addressFrom.address === addressTo.address) return 1;
  else {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${addressFrom.address}&destination=${addressTo.address}&key=${GOOGLE_API_KEY}&mode=driving`;
    const data = await fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 'OK') {
          return responseJson.routes[0].legs[0].distance.value;
        } else {
          return -1;
        }
      })
      .catch((e) => {
        console.log('getLocationCurrentOfUser() Error: ' + e);
        return -1;
      });
    return data;
  }
};
