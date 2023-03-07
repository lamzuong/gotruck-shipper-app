import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerWrapper: {
    flex: 0.1,
    backgroundColor: stylesGlobal.mainGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  center: {
    flex: 0.75,
  },
  total: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  account: {
    backgroundColor: '#F9F9F9',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    flexDirection:"row",
    justifyContent:"space-between"
  },
  bottom: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
  },
  content: {
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default styles;
