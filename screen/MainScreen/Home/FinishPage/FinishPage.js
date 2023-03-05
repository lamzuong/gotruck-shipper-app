import styles from './stylesFinishPage';

import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MyButton from '../../../../components/MyButton/MyButton';

export default function FinishPage({navigation}) {
  const route = useRoute();
  const { item } = route.params;
  return (
    <View>
      <Text>ádasdas</Text>
      <Text>{item._id}</Text>
      <MyButton
        type={'medium'}
        text="Hoàn thành"
        btnColor={"blue"}
        txtColor="white"
        action={() => {
          navigation.navigate('Home', { completed: true });
        }}
      ></MyButton>
    </View>
  );
}
