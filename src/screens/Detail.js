import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import {getHabitOfDay} from '../components/DatabaseManager'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Container = styled.View`
  background-color: #010D26;
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  left: 20px;
`

const ContentSections = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledText = styled.Text`
  font-size: 20px;
  font-family: 'OpenSans_600SemiBold';
  color: #94CEF2;
  margin-top: 35px;
`

const HabitContainer = styled.View`
  margin-top: 40px;
  height: 440px;
`

const ItemContainer = styled.View`
width: 330px;
height: 70px;
border-radius: 10px;
background-color: #293653;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;    
`

const TextSection = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
`

const Title = styled.Text`
font-size: 16px;
font-family: 'OpenSans_600SemiBold';
color: #94CEF2;
`

const Time = styled.Text`
font-size: 12px;
font-family: 'OpenSans_300Light';
color: #94CEF2;
`

const Detail = ({navigation, route}) => {
  const [day, setDay] = useState('')
  const [habitOfDay, setHabitOfDay] = useState(null)

  useEffect(() => {
    setHabitOfDay(null)
    const selectedDay = new window.Date(route.params.day.dateString)
    let selectedDayDate
    switch (selectedDay.getDay()) {
      case 0:
        selectedDayDate = 'Sun'
        break
      case 1:
        selectedDayDate = 'Mon'
        break
      case 2:
        selectedDayDate = 'Tue'
        break
      case 3:
        selectedDayDate = 'Wed'
        break
      case 4:
        selectedDayDate = 'Thu'
        break
      case 5:
        selectedDayDate = 'Fri'
        break
      case 6:
        selectedDayDate = 'Sat'
        break
    }
    let selectedMonth
    switch (selectedDay.getMonth()) {
      case 1:
        selectedMonth = 'January'
        break
      case 2:
        selectedMonth = 'February'
        break
      case 3:
        selectedMonth = 'March'
        break
      case 4:
        selectedMonth = 'April'
        break
      case 5:
        selectedMonth = 'May'
        break
      case 6:
        selectedMonth = 'June'
        break
      case 7:
        selectedMonth = 'July'
        break
      case 8:
        selectedMonth = 'August'
        break
      case 9:
        selectedMonth = 'September'
        break
      case 10:
        selectedMonth = 'October'
        break
      case 11:
        selectedMonth = 'November'
        break
      case 12:
        selectedMonth = 'December'
        break
    }

    const title = `${selectedDayDate}, ${selectedMonth} ${selectedDay.getDate()} ${selectedDay.getFullYear()}`
    setDay(title)
    getHabitOfDay(selectedDayDate)
    AsyncStorage.getItem('habitOfChosenDay').then((value) => {
      setHabitOfDay(JSON.parse(value))
    })

  },[])

  const renderIcon = (icon) => {
    switch (icon) {
      case 0:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='flower' color='#94CEF2' size={26}/>
      case 1:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='dumbbell' color='#94CEF2' size={26}/>
      case 2:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='book-open-variant' color='#94CEF2' size={26}/>
      case 3:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='dog' color='#94CEF2' size={26}/>
      case 4:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='cat' color='#94CEF2' size={26}/>
      case 5:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='cash' color='#94CEF2' size={26}/>
      case 6:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='gamepad-variant' color='#94CEF2' size={26}/>
      case 7:
        return <MaterialCommunityIcons style={styles.modifiedIcon} name='music' color='#94CEF2' size={26}/>
    }
  }

  const renderHabit = ({item}) => (
    <ItemContainer>
      {renderIcon(item.icon)}
      <TextSection>
        <Title>{item.content}</Title>
        <Time>{item.time}</Time>
      </TextSection>
      <View></View>
    </ItemContainer>
  )

  return (
    <Container>
      <BackButton onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color={'#94CEF2'}/>
      </BackButton>
      <ContentSections>
        <StyledText>{day}</StyledText>
        <HabitContainer>
          <FlatList
            data={habitOfDay}
            renderItem={renderHabit}
            keyExtractor={item=>String(item.id)}
            scrollEnabled={true}
          />  
        </HabitContainer>
      </ContentSections>
    </Container>
  )
}

export default Detail

const styles = StyleSheet.create({
  modifiedIcon: {
    marginLeft: 20,
  },

  modifiedText: {
    color: '#FFFFFF'
  },  
})


