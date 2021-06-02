import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Context} from './context'
import Menu from './components/menu'


const App =() => {


  return (
    <Context>
    <NavigationContainer>
      <Menu/>
    </NavigationContainer>
    </Context>
  )
};

export default App;
