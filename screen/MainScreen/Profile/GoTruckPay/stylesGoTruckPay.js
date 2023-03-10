import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 18,
  },
  money: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
  viewOptions: {
    flexDirection: 'row',
  },
  option: {
    marginHorizontal: 50,
    marginTop: 20,
  },
});

export default styles;
