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
    language: 'vi',
  });
  const dataGeocoder = await Geocoder.from({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  let addressCurrent = dataGeocoder?.results[0]?.formatted_address;
  const temp = addressCurrent.split(',', 1);
  addressCurrent.replace(temp + ', ', '');

  for (let i = 0; i < 2; i++) {
    if (!isPlusCode(dataGeocoder?.results[i].formatted_address)) {
      addressCurrent = dataGeocoder?.results[i].formatted_address;
      break;
    }
  }
  const data = {
    address: addressCurrent,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
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

export const getAddressFromCoordinate = async (location) => {
  Geocoder.init(GOOGLE_API_KEY, {
    language: 'vi',
  });
  const dataGeocoder = await Geocoder.from({
    latitude: location.latitude,
    longitude: location.longitude,
  });

  let addressCurrent = dataGeocoder?.results[0]?.formatted_address;
  const temp = addressCurrent.split(',', 1);
  addressCurrent.replace(temp + ', ', '');

  for (let i = 0; i < 2; i++) {
    if (!isPlusCode(dataGeocoder?.results[i].formatted_address)) {
      addressCurrent = dataGeocoder?.results[i].formatted_address;
      break;
    }
  }
  const data = {
    address: addressCurrent,
    latitude: location.latitude,
    longitude: location.longitude,
  };
  return data;
};


//
// ex: H6QC+MW, Linh Xuân, Thủ Đức, Hồ Chí Minh, Việt Nam
//     VHCW+2H Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam
// H6QC+MW, VHCW+2H là không nên
const isPlusCode = (address) => {
  const temp = address.split(',', 1);
  const plusCodeRegex = /^[0-9A-Z]*\+[0-9A-Z]*$/;
  return plusCodeRegex.test(temp);
};

