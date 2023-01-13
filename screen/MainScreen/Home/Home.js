import styles from "./stylesHome";
import stylesGlobal from "../../../global/stylesGlobal";
import MyInput from "../../../components/MyInput/MyInput";
import MyButton from "../../../components/MyButton/MyButton";

import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar />
    </View>
  );
}
