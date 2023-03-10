import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 5,
  },
  headComment: {
    borderBottomWidth: 1,
    borderColor: stylesGlobal.darkGrey,
  },
});

export default styles;
