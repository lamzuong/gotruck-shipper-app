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
  viewInputImage: {
    marginBottom: 15,
    minHeight: 200,
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
