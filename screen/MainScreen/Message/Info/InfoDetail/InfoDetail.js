import styles from './stylesInfoDetail';

import { View, Text, ScrollView, Image, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function InfoDetail({ route }) {
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
  const { item } = route.params;
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={styles.header.txtHeader}>
          {item.type == 'Order' ? 'Đơn hàng' : 'Khuyến mãi'}
        </Text>
        <View style={{ width: 24 }}></View>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.content}>{item.message.content}</Text>
        {item.message.image.length > 0
          ? item.message.image.map((item, index) => (
              <Image source={{ uri: item }} key={index} style={styles.image} />
            ))
          : null}
      </ScrollView>
    </>
  );
}
