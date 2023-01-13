import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  itemChat: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderBottomWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,

    avatar: {
      width: 65,
      height: 65,
      borderRadius: 100,
    },
    rightItem: {
      width: widthScreen - 160,
      marginLeft: 10,
    },
    name: {
      read: {
        fontSize: 20,
      },
      unread: {
        fontSize: 20,
        fontWeight: "bold",
      },
    },
    viewMessage: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: widthScreen - 130,

      message: {
        fontSize: 18,
      },
      time: {
        fontSize: 16,
      },

      read: {
        color: "grey",
      },
      unread: {
        fontWeight: "bold",
      },
    },
  },
});

export default styles;
