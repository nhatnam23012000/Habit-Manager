import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/components/RootNavigator';
import HomeStack from './src/components/BottomTab';

export default function App() {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <HomeStack/>
      </NavigationContainer>
    </>
  );
}
