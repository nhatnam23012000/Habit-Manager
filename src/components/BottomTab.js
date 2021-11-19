import React, { useEffect, useRef, useState } from 'react'
import { View, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigator from '../components/RootNavigator'
import Onboard from '../components/Onboard'
import Dashboard from '../screens/Dashboard'
import Missions from '../screens/Missions'
import City from '../screens/City'
import Calendar from '../screens/Calendar'
import Create from '../screens/Create'
import Edit from '../screens/Edit'
import Shop from '../screens/Shop'
import Detail from '../screens/Detail'
import Plus from '../../assets/plus.png'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function getWidth() {
  let width = Dimensions.get('window').width
  width = width - 80
  return width / 5
}

function BottomTab() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current

  return (
    <>
      <Tab.Navigator
        initialRouteName='Dashboard'
        screenOptions={
          {
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 20,
              marginHorizontal: 20,
              height: 60,
              borderRadius: 10,
              paddingHorizontal: 20,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowOffset: {
                width: 10,
                height: 10
              }
            }
          }
        }
      >
        <Tab.Screen
          name='Dashboard'
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Ionicons name='home-sharp' size={20} color={focused ? '#4AD6F4' : '#000'}/>
              </View>
            )
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue,{
                toValue: 0,
                useNativeDriver: true
              }).start()
            }
          })}
          component={Dashboard}/>

        <Tab.Screen
          name='Missions'
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Ionicons name='receipt-sharp' size={20} color={focused ? '#4AD6F4' : '#000'}/>
              </View>
            )
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue,{
                toValue: getWidth(),
                useNativeDriver: true
              }).start()
            }
          })}
          component={Missions}/>

        <Tab.Screen
          name='Action'
          options={{
            tabBarIcon: ({focused}) => (
              <TouchableOpacity
                onPress = {() => RootNavigator.navigate('Create')}
              >
                <View style={{
                  width: 55,
                  height: 55,
                  backgroundColor: '#234586',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: 20
                }}>
                  <Image source={Plus} style={{
                    width: 22,
                    height: 22,
                    tintColor: '#FFF'
                  }}/>
                </View>
              </TouchableOpacity>
            )
          }}
          component={Create}/>

        <Tab.Screen
          name='City'
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Ionicons name='podium' size={20} color={focused ? '#4AD6F4' : '#000'}/>
              </View>
            )
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue,{
                toValue: getWidth() * 3,
                useNativeDriver: true
              }).start()
            }
          })}
          component={City}/>

        <Tab.Screen
          name='Calendar'
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Ionicons name='calendar-sharp' size={20} color={focused ? '#4AD6F4' : '#000'}/>
              </View>
            )
          }}
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue,{
                toValue: getWidth() * 4,
                useNativeDriver: true
              }).start()
            }
          })}
          component={Calendar}/>
      </Tab.Navigator>
      <Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: '#4AD6F4',
        position: 'absolute',
        bottom: 79,
        left: 50,
        borderRadius: 15,
        transform: [
          {translateX: tabOffsetValue}
        ]
      }}>

      </Animated.View>
    </>
  )
}

export default function HomeStack() {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  },[])

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Onboard'>
        <Stack.Screen name='Onboard' component={Onboard}/>
        <Stack.Screen name='Home' component={BottomTab}/>
        <Stack.Screen name='Create' component={Create}/>
        <Stack.Screen name='Edit' component={Edit}/>
        <Stack.Screen name='Shop' component={Shop}/>
        <Stack.Screen name='Detail' component={Detail}/>
      </Stack.Navigator>
    )
  } else return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='Home'>
      <Stack.Screen name='Home' component={BottomTab}/>
      <Stack.Screen name='Create' component={Create}/>
      <Stack.Screen name='Edit' component={Edit}/>
      <Stack.Screen name='Shop' component={Shop}/>
      <Stack.Screen name='Detail' component={Detail}/>
    </Stack.Navigator>
  )
}
