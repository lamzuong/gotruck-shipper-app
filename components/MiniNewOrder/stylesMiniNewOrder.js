import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../global/stylesGlobal';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
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
});

export default styles;
