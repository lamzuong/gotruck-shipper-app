import styles from './stylesReview';
import stylesGlobal from '../../../../global/stylesGlobal';
// import review from './data';

import { View, Text, BackHandler, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from 'react-native-ratings';
import { AuthContext } from '../../../../context/AuthContext';
import axiosClient from '../../../../api/axiosClient';
import { useIsFocused } from '@react-navigation/native';
import { formatDateFull } from '../../../../global/util';

export default function Review({ navigation }) {
  const [review, setReview] = useState([]);
  const isFocus = useIsFocused();
  const { user } = useContext(AuthContext);

  useEffect(()=>{
    const getReview = async () => {
      const resReview = await axiosClient.get('gotruck/ordershipper/review/' + user._id);
      setReview(resReview);
    };
    getReview();
  },[isFocus])

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
      {review.map((e, i) => (
        <View style={styles.wrapper} key={i}>
          <View style={[stylesGlobal.inlineBetween, styles.headComment]}>
            <Text>{formatDateFull(e.time)}</Text>

            <Rating
              type="custom"
              imageSize={15}
              ratingCount={5}
              startingValue={e.star}
              tintColor="white"
              ratingBackgroundColor="rgb(200,200,200)"
              isDisabled={true}
              readonly
            />
          </View>
          <Text>
            {e.content == '' ? <Text style={{ fontStyle: 'italic' }}>(Không có)</Text> : e.content}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
