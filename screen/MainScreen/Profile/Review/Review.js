import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";

export default function Review({ navigation }) {
  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  //------------------------------
  return (
    <View>
      <Text>Review</Text>
    </View>
  );
}
