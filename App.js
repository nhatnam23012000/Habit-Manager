import React, {useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans'
import { navigationRef } from './src/components/RootNavigator';
import HomeStack from './src/components/BottomTab';
import {db, createHabitTable} from './src/components/DatabaseManager'

export default function App() {

  useEffect(() => {
    createHabitTable()
  },[])

  let [fontsLoaded] = useFonts({
    OpenSans_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
    <>
      <NavigationContainer ref={navigationRef}>
        <HomeStack/>
      </NavigationContainer>
    </>
  )}
}
