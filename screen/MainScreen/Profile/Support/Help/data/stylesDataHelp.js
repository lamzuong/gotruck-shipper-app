import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  txtBody: {
    padding: 5,
    fontSize: 17,
  },
});

export default styles;
