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
  itemTruck: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 5,
  },
  nameTruck: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  defaultTruck: {
    marginTop: 10,
    color: stylesGlobal.mainGreen,
  },
  //----------------------
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewOptions: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  titleOption: {
    fontSize: 18,
  },
  nameAndStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    paddingLeft: 15,
  },
  status2: {
    paddingLeft: 10,
    color: '#04AF46',
  },
  statusPending:{
    paddingLeft: 10,
    color:"red"
  }
});

export default styles;
