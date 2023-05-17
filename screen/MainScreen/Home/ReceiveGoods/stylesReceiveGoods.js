import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  removeImage: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 88,
    top: -8,
  },
});

export default styles;
