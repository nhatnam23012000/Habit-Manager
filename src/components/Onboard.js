import React, {useContext, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'


const Onboard = ({navigation}) => {

  return (
    <Onboarding
      onSkip={() => navigation.replace('Home')}
      onDone={() => navigation.replace('Home')}
      pages={
        [
          {
            backgroundColor: '#010D26',
            image: <Image source={require('../../assets/onboardImg1.png')} />,
            title: 'Habitropolis',
            subtitle: 'Manage your days and habits with ease'
          },
          {
            backgroundColor: '#010D26',
            image: <Image source={require('../../assets/onboardImg2.png')} />,
            title: 'The beautiful city awaiting you',
            subtitle: 'The harder you work, the bigger your city become'
          }
        ]
      }
    /> 
  )
}

export default Onboard
