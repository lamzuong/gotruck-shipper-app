import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    padding: 5,

    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  add: {
    fontSize: 16,
    fontWeight: 'bold',
    color: stylesGlobal.mainGreen,
  },
  sub: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default styles;
