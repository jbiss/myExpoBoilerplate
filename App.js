import React from 'react-native';
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store } from './store';

import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';

const { Navigator, Screen } = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Navigator>
          <Screen name="Home" component={HomeScreen} />
          <Screen name="Basket" component={BasketScreen} 
          options={ {presentation: 'modal', headerShown: false }}
          />
            <Screen name="Restaurant" component={RestaurantScreen} />
          </Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;