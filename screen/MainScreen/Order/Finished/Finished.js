import styles from "./stylesFinished";
import MyOrder from "../../../../components/MyOrder/MyOrder";
import order from "../dataOrder";

import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import axiosClient from "../../../../api/axiosClient";
import { SetListOrder } from "../../../../context/AuthAction";
import { AuthContext } from "../../../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export default function Finished() {
  const { user, listOrder, dispatch } = useContext(AuthContext);
  const isFocus = useIsFocused();
 
  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/ordershipper/shipper/' + user._id);
    if (JSON.stringify(listOrder) !== JSON.stringify(orderList)) {
      dispatch(SetListOrder(orderList));
    }
  };

  useEffect(() => {
    renderUI();
  }, [isFocus]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {listOrder.map((item, index) =>
        item.status == "Đã giao" ? <MyOrder order={item} key={index} /> : null
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
