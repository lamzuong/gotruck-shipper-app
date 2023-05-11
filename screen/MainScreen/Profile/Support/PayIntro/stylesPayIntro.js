import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  txtBig: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  txtSmall: {
    fontSize: 16,
    paddingVertical: 2,
  },
  viewBank: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default styles;
