import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const stylesGeneral = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: stylesGlobal.mainGreen,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewBell: {
    ...StyleSheet.compose(stylesGeneral.button),
    right: 80,
    top: 10,
  },
  numberMess: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 100,
    textAlign: 'center',
  },
  btnPower: {
    ...StyleSheet.compose(stylesGeneral.button),
    right: 10,
    top: 10,
  },
  isOnline: {
    position: 'absolute',
    right: (widthScreen - 50) / 2,
    top: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: 180,
    height: 50,
    backgroundColor: 'white',
  },
  txtHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  body: {
    position: 'absolute',
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    width: widthScreen * 0.7,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 50,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
  },
  txtAddressNull: {
    fontSize: 16,
    fontStyle: 'italic',
    width: '100%',
  },
  viewMessage: {
    position: 'absolute',
    right: 85,
    top: 80,
    width: 260,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
  },
  itemMess: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: stylesGlobal.lightDarkGrey,
  },
  viewIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: stylesGlobal.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    fontWeight: 'bold',
  },
  txtContent: {
    width: 180,
  },
  swiper: {
    borderWidth: 1,
    borderColor: stylesGlobal.darkGrey,
    backgroundColor: 'white',
  },
});

export default styles;
