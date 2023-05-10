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
    backgroundColor: 'red',
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
    backgroundColor: 'white',
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
  map: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  to_ad: {
    fontWeight: 'bold',
  },
  marker: {
    textAlign: 'center',
  },
  coordinate: {
    marginHorizontal: 75,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    height: 250,
    top: heightScreen / 4.5,
    width: widthScreen / 1.2,
    left: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  close: {
    top: 10,
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  contentCancel: {
    flex: 1,
    alignItems: 'center',
  },
  viewInput: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  btnCancel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 10,
  },
  openGGMap: {
    backgroundColor: stylesGlobal.mainGreen,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    right: 10,
    zIndex: 999,
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
  },
});

export default styles;
