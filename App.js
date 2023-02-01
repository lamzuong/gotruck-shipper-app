import { publicRoutes } from './routes/routes';
import stylesGlobal from './global/stylesGlobal';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        {publicRoutes.map((route, index) => {
          return (
            <Stack.Screen
              name={route.name}
              component={route.component}
              options={{
                headerShown: route.header,
                animation: route.animation ? route.animation : null,
                headerTitle: () => (
                  <View style={styles.viewHeader}>
                    <Text style={styles.txtHeader}>{route.title}</Text>
                  </View>
                ),
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: stylesGlobal.mainGreen,
                },
              }}
              key={index}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  viewHeader: {},
  txtHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
