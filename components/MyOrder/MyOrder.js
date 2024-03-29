import styles from "./stylesMyOrder";
import stylesGlobal from "../../global/stylesGlobal";
import MyButton from "../MyButton/MyButton";

import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import ReadMore from "react-native-read-more-text";

export default function MyOrder({ order }) {
  const navigation = useNavigation();
  return (
    <View style={styles.order}>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Mã đơn</Text>
        <Text style={styles.content}>{order.id_order}</Text>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Từ</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.from_address.address}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Giao tới</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.to_address.address}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Ghi chú</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.note || "Không có"}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.long]}>Người nhận</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.to_address.name}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.long]}>Số điện thoại</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.to_address.phone}</Text>
        </ReadMore>
      </View>
      <View style={styles.inlineBetween}>
        <View></View>
        <MyButton
          type={"small"}
          text={"Xem"}
          btnColor={"#0DBEBE"}
          txtColor={"white"}
          action={() => {
            navigation.navigate("OrderDetail", {
              order: order,
            });
          }}
        />
      </View>
    </View>
  );
}
