import React from 'react';
import StackNavigation from './src/navigations/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {ContextProvider} from './src/context';

const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;
