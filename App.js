import React, {useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, OpenSans_600SemiBold, OpenSans_300Light } from '@expo-google-fonts/open-sans'
import { navigationRef } from './src/components/RootNavigator';
import HomeStack from './src/components/BottomTab';
import {createMissionTable, createHabitTable, addNewActiveMission, resetDoneOfHabit} from './src/components/DatabaseManager'
import * as TaskManager from 'expo-task-manager';

export default function App() {

  const runEveryDay = () => {
    const nowHour = new window.Date().getHours()
    if(nowHour === 0) {
      addNewActiveMission()
      resetDoneOfHabit()
    }
  }

  TaskManager.defineTask('RUN_EVERY_DAY', runEveryDay)

  useEffect(() => {
    createHabitTable()
    createMissionTable()
  },[])

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
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
