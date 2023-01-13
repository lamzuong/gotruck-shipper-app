import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  bgImg: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  imgAdvertise: {
    width: 300,
    height: 200,
    marginVertical: 10,
  },
});

export default styles;
