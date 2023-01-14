import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    width: 150,
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 17,
  },
  viewNote: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    height: 100,
  },
  txtNote: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 17,
  },
  labelFooter: {
    width: 180,
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  warning: {
    color: 'red',
    paddingHorizontal: 20,
    marginTop: 18,
  },
});

export default styles;
