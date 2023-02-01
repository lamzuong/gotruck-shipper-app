import styles from './stylesReview';
import stylesGlobal from '../../../../global/stylesGlobal';
import review from './data';

import { View, Text, BackHandler, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Rating } from 'react-native-ratings';

export default function Review({ navigation }) {
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
            <Text>{e.time}</Text>

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
            {e.comment == '' ? <Text style={{ fontStyle: 'italic' }}>(Không có)</Text> : e.comment}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
