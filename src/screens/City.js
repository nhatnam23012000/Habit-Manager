import React, {useState, useEffect} from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import cityLvl0 from '../../assets/cityLvl0.png'
import cityLvl1 from '../../assets/cityLvl1.png'
import cityLvl2 from '../../assets/cityLvl2.png'
import cityLvl3 from '../../assets/cityLvl3.png'
import cityLvl4 from '../../assets/cityLvl4.png'


const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  background-color: #010D26;
  flex: 1;
  height: 100%;
  width: 100%;
`

const TopSections = styled.View`
  height: 30%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

const ContentSections = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const Info = styled.Text`
  font-size: 16px;
  font-family: 'OpenSans_600SemiBold';
  color: #94CEF2;
  margin: 0px 0px 20px 0px;
`

const Shop = styled.View`
  width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const ShopBtn = styled.TouchableOpacity`
  width: 135px;
  height: 50px;
  background-color: #034C8C;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-left: 50px;
`

const ChartInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 200px;
  margin-top: 20px;
`

const CityInfo = styled.View``

const InfoIcon = styled.View``

const CityPicture = styled.Image`
  width: 310px;
  height: 310px;
  margin-top: 40px;
`

export default function City({navigation}) {
  const [streak, setStreak] = useState(null)
  const [cityLvl, setCityLvl] = useState(null)
  const [money, setMoney] = useState(null)
  const [image, setImage] = useState(cityLvl0)
  
  useEffect(() => {
    AsyncStorage.getItem('streak').then(value => {
      if(value !== null) {
        setStreak(value)
      }
      else {
        AsyncStorage.setItem('streak', '0')
      }
    })

    AsyncStorage.getItem('cityLvl').then(value => {
      if(value !== null) {
        setCityLvl(value)
      }
      else {
        AsyncStorage.setItem('cityLvl', '0')
        setCityLvl(0)
      }
    })

    switch (parseInt(cityLvl)) {
      case 0:
        setImage(cityLvl0)
        break
      case 1:
        setImage(cityLvl1)
        break
      case 2:
        setImage(cityLvl2)
        break
      case 3:
        setImage(cityLvl3)
        break
      case 4:
        setImage(cityLvl4)
        break
    }

    AsyncStorage.getItem('money').then(value => {
      if(value !== null) {
        setMoney(value)
      }
      else {
        AsyncStorage.setItem('money', '0')
      }
    })
  }, [])

  useEffect(() => {
    let secTimer = setInterval(() => {
      switch (parseInt(cityLvl)) {
        case 0:
          setImage(cityLvl0)
          break
        case 1:
          setImage(cityLvl1)
          break
        case 2:
          setImage(cityLvl2)
          break
        case 3:
          setImage(cityLvl3)
          break
        case 4:
          setImage(cityLvl4)
          break
      }
    }, 1000)

    return () => clearInterval(secTimer)
  })

  return (
    <Container>
      <TopSections>
        <Shop>
          <ShopBtn onPress={() => navigation.navigate('Shop')}>
            <Info style={styles.styledText}>Shop</Info>
          </ShopBtn>
        </Shop>
        <ChartInfo>
            <CityInfo>
              <Info>Streak: {(streak) ?streak : '0'}</Info>
              <Info>City Level: {(cityLvl) ?cityLvl : '0'}</Info>
              <Info>Money: {(money) ?money : '0'}</Info>
            </CityInfo>
            <InfoIcon>
              <Ionicons style={styles.styledIcon} name='star' size={20} color='#94CEF2'/>
              <Ionicons style={styles.styledIcon} name='business' size={20} color='#94CEF2'/>
              <FontAwesome5 style={styles.styledIcon} name='money-bill' size={20} color='#94CEF2'/>
            </InfoIcon>
        </ChartInfo>
      </TopSections>
      <ContentSections>
        <CityPicture source={image}/>
        <Info style={styles.introText}>Keep buying new building to upgrade city level! Higher level unlock more building to choose</Info>
      </ContentSections>
    </Container>
  )
}

const styles = StyleSheet.create({
  styledIcon: {
    marginBottom: 20
  },

  styledTouch: {
    marginTop: 20
  },

  styledText: {
    marginBottom: 0,
    color: '#94CEF2'
  },

  title: {
    alignSelf: 'center',
  },

  introText: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20
  }
})
