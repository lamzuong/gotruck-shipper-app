import styles from "./stylesFinished";
import MyOrder from "../../../../components/MyOrder/MyOrder";
import order from "../dataOrder";

import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";

export default function Finished() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {order.map((item, index) =>
        item.status == "Đã giao" ? <MyOrder order={item} key={index} /> : null
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
