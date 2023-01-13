import styles from "./stylesInfo";
import stylesGlobal from "../../../../global/stylesGlobal";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, Octicons, FontAwesome } from "@expo/vector-icons";
import ReadMore from "react-native-read-more-text";

const mess = [
  {
    id: "1",
    name: "Cảnh báo không thể nhận đơn",
    message: {
      content:
        "Do ví bạn đã không đủ trả chi phí cho đơn hàng HD2023002 nên bạn không thể nhận thêm đơn.\nVui lòng nạp tiền vào ví GoTruck để thanh toán và có thể tiếp tục nhận đơn.\nThời hạn nạp tiền là 3 ngày kể từ khi nhận thông báo này, nếu quá hạn tài khoản sẽ bị khóa và xử lý theo chính sách của GoTruck, xin chân thành cám ơn bạn!! Chúc bạn một ngày tốt lành",
      image: [
        "https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg",
        "https://observatoriodocinema.uol.com.br/wp-content/uploads/2022/07/Spy-x-Family-anya.jpg",
      ],
      read: true,
    },
    time: "22m",
    type: "Warning",
  },
  {
    id: "2",
    name: "GoTruck đã trừ vào ví GoTruck của bạn 5% chi phí vận chuyển đơn hàng HD2023001",
    message: {
      content:
        "GoTruck đã trừ vào ví GoTruck của bạn 5% chi phí vận chuyển đơn hàng HD2023001 tương đương với 5.234 VNĐ. Cám ơn bạn đã đồng hành cùng GoTruck. Hãy lái xe an toàn và cẩn thận bạn nhé!!",
      image: [],
      read: false,
    },
    time: "22m",
    type: "Order",
  },
];
export default function Info({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mess}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemChat}
              onPress={() => {
                navigation.navigate("InfoDetail", { item: item });
              }}
            >
              <View
                style={
                  item.type === "Warning"
                    ? styles.itemChat.deal
                    : styles.itemChat.order
                }
              >
                {item.type === "Warning" ? (
                  <Entypo
                    name="warning"
                    size={24}
                    color={stylesGlobal.darkOrange}
                  />
                ) : (
                  <FontAwesome
                    name="truck"
                    size={24}
                    color={stylesGlobal.darkGreen}
                  />
                )}
              </View>

              <View style={styles.itemChat.rightItem}>
                <ReadMore
                  numberOfLines={1}
                  renderTruncatedFooter={() => null}
                  renderRevealedFooter={() => null}
                >
                  <Text
                    style={
                      item.message.read
                        ? styles.itemChat.name.read
                        : styles.itemChat.name.unread
                    }
                  >
                    {item.name}
                  </Text>
                </ReadMore>
                <View style={styles.itemChat.viewMessage}>
                  <View style={{ width: "80%" }}>
                    <ReadMore
                      numberOfLines={1}
                      renderTruncatedFooter={() => null}
                      renderRevealedFooter={() => null}
                    >
                      <Text
                        style={[
                          item.message.read
                            ? styles.itemChat.viewMessage.read
                            : styles.itemChat.viewMessage.unread,
                          styles.itemChat.viewMessage.message,
                        ]}
                      >
                        {item.message.content}{" "}
                      </Text>
                    </ReadMore>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        item.message.read
                          ? styles.itemChat.viewMessage.read
                          : styles.itemChat.viewMessage.unread,
                        styles.itemChat.viewMessage.time,
                      ]}
                    >
                      {item.time}{" "}
                    </Text>
                    {item.message.read ? null : (
                      <Octicons name="dot-fill" size={24} color="blue" />
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => "#" + index}
        key={"#"}
      />
    </View>
  );
}
