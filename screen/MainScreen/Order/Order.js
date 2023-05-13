import styles from './stylesOrder';
import stylesGlobal from '../../../global/stylesGlobal';
import { publicRoutes } from './routes/routes';

import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthContext } from '../../../context/AuthContext';
import axiosClient from '../../../api/axiosClient';
import { SetListOrder } from '../../../context/AuthAction';
import { socketClient } from '../../../global/socket';

const TopTab = createMaterialTopTabNavigator();

export default function Order() {
  const { user, listOrder, dispatch } = useContext(AuthContext);

  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/ordershipper/shipper/' + user._id);
    dispatch(SetListOrder(orderList));
  };

  useEffect(() => {
    socketClient.off('data' + user._id);
    socketClient.on('data' + user._id, (data) => {
      renderUI();
    });
  }, []);

  return (
    <>
      <Text style={styles.title}>Đơn hàng</Text>

      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: stylesGlobal.mainGreen,
          tabBarInactiveTintColor: stylesGlobal.darkGrey,
          tabBarIndicatorStyle: {
            backgroundColor: stylesGlobal.mainGreen,
            height: 2,
          },
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          tabBarItemStyle: {
            alignItems: 'center',
          },
          tabBarLabelStyle: {
            textTransform: 'capitalize',
          },
        }}
      >
        {publicRoutes.map((route, key) => {
          return (
            <TopTab.Screen
              name={route.name}
              component={route.component}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text style={focused ? styles.textFocus : styles.text}>{route.title}</Text>
                ),
              }}
              key={key}
            />
          );
        })}
      </TopTab.Navigator>
    </>
  );
}
