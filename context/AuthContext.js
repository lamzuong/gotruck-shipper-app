import { getLocationUserNow } from '../global/functionGlobal';
import AuthReducer from './AuthReducer';

import React, { createContext, useEffect, useReducer, useState } from 'react';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '../global/keyGG';
import { getLocationCurrentOfUser } from '../global/ultilLocation';
const INITIAL_STATE = {
  user: null,
  locationNow: null,
};

// INITIAL_STATE.user = {
//   _id: '63e1d1112b67035bb9634dae',
//   name: 'Ngueen TrungQQQQQQ',
//   phone: '0359434723',
//   avatar:
//     'https://firebasestorage.googleapis.com/v0/b/kltn-5be2b.appspot.com/o/800c0432-2e1a-481f-bd77-8940e99206f6?alt=media&token=a7d7e251-b8df-4395-8deb-00122a381100',
//   createdAt: '2023-02-07T11:18:25.961+07:00',
//   updatedAt: '2023-02-08T15:52:12.570+07:00',
//   __v: 0,
// };

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [address, setAddress] = useState({
    address: '58/5K Truông Tre, Linh Xuân, Thủ Đức, Bình Dương, Việt Nam',
    latitude: 10.890244509604937,
    longitude: 106.7674527621348,
  });

  useEffect(() => {
    (async function () {
      const addressCurrent = await getLocationCurrentOfUser();
      if (addressCurrent) setAddress(addressCurrent);
    }.call(this));
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        locationNow: address,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
