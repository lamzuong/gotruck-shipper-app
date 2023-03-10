import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  viewInput: {
    marginBottom: 15,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
});

export default styles;
