import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import {db, addHabit, getHabitList} from '../components/DatabaseManager'
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
  top: 10px;
  left: 10px;
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
  margin-top: 12px;
`

const CustomTextInput = styled.TextInput`
  border: 1px solid #94CEF2;
  border-radius: 10px;
  color: #94CEF2;
  margin-top: 90px;
  width: 295px;
  height: 40px;
  padding: 10px;
  font-family: 'OpenSans_600SemiBold';
`

const PickerContainer = styled.View`
  border: 1px solid #94CEF2;
  width: 338px;
  height: 50px;
  border-radius: 10px;
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DateElement = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props => (props.selected) ? '#94CEF2' : '#010D26'};
`

const Date = styled.Text`
  font-size: 20px;
  font-family: 'OpenSans_600SemiBold';
  color: ${props => (props.selected) ? '#010D26' : '#94CEF2'};
`

const TimeContainer = styled.TouchableOpacity`
  width: 280px;
  height: 42px;
  border: 1px solid #94CEF2;
  border-radius: 10px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const IconPicker = styled.ScrollView`
  margin-top: 20px;
  margin-left: 20px;
  height: 48px;
`
const IconElement = styled.TouchableOpacity`
  border: 1px solid #94CEF2;
  border-radius: 50px;
  margin-right: 25px;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => (props.selected)? '#94CEF2' : '#010D26'};
`

const ConfirmButton = styled.TouchableOpacity`
  width: 260px;
  height: 44px;
  margin-bottom: 150px;
  background-color: #034C8C;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Create({navigation}) {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [repeat, setRepeat] = useState('Mon')
  const [time, setTime] = useState('9:00')
  const [icon, setIcon] = useState(0)
  const [date, setDate] = useState(new window.Date())

  const changeToMon = () => {
    setRepeat('Mon')
  }

  const changeToTue = () => {
    setRepeat('Tue')
  }

  const changeToWed = () => {
    setRepeat('Wed')
  }

  const changeToThu = () => {
    setRepeat('Thu')
  }

  const changeToFri = () => {
    setRepeat('Fri')
  }

  const changeToSat = () => {
    setRepeat('Sat')
  }

  const changeToSun = () => {
    setRepeat('Sun')
  }

  const showTimePicker = () => {
    setShow(true)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    let tempDate = new window.Date(currentDate)
    let formattedTime = `${tempDate.getHours()}:${tempDate.getMinutes()}`
    setTime(formattedTime)
  };

  const iconArray = [
    {
      key: 0,
      name: 'flower',
      onPress: ()=>{setIcon(0)}
    },
    {
      key: 1,
      name:'dumbbell',
      onPress: ()=>{setIcon(1)}
    },
    {
      key: 2,
      name: 'book-open-variant',
      onPress: ()=>{setIcon(2)}
    },
    {
      key: 3,
      name: 'dog',
      onPress: ()=>{setIcon(3)}
    },
    {
      key: 4,
      name: 'cat',
      onPress: ()=>{setIcon(4)}
    },
    {
      key: 5,
      name:'cash',
      onPress: ()=>{setIcon(5)}
    },
    {
      key: 6,
      name: 'gamepad-variant',
      onPress: ()=>{setIcon(6)}
    },
    {
      key: 7,
      name: 'music',
      onPress: ()=>{setIcon(7)}
    }
  ]

  const confirmAddHabit = () => {
    addHabit(title, repeat, time, icon)
    getHabitList()
    navigation.replace('Home')
  }

  return (
    <Container>
      <BackButton onPress={() => navigation.replace('Home')}>
        <Ionicons name="arrow-back" size={35} color={'#94CEF2'}/>
      </BackButton>
      <ContentSections>
        <StyledText>Create new habit</StyledText>
        <CustomTextInput
          onChangeText={setTitle}
          placeholder="Title of the habit"
          placeholderTextColor="#94CEF2"
          
        />
        <StyledText style={styles.modifiedText}>Repeat</StyledText>
        <PickerContainer>
          <DateElement onPress={changeToMon} selected={repeat === 'Mon' ? true : false}>
            <Date selected={repeat === 'Mon' ? true : false}>Mon</Date>
          </DateElement>
          <DateElement onPress={changeToTue} selected={repeat === 'Tue' ? true : false}>
            <Date selected={repeat === 'Tue' ? true : false}>Tue</Date>
          </DateElement>
          <DateElement onPress={changeToWed} selected={repeat === 'Wed' ? true : false}>
            <Date selected={repeat === 'Wed' ? true : false}>Wed</Date>
          </DateElement>
          <DateElement onPress={changeToThu} selected={repeat === 'Thu' ? true : false}>
            <Date selected={repeat === 'Thu' ? true : false}>Thu</Date>
          </DateElement>
          <DateElement onPress={changeToFri} selected={repeat === 'Fri' ? true : false}>
            <Date selected={repeat === 'Fri' ? true : false}>Fri</Date>
          </DateElement>
          <DateElement onPress={changeToSat} selected={repeat === 'Sat' ? true : false}>
            <Date selected={repeat === 'Sat' ? true : false}>Sat</Date>
          </DateElement>
          <DateElement onPress={changeToSun} selected={repeat === 'Sun' ? true : false}>
            <Date selected={repeat === 'Sun' ? true : false}>Sun</Date>
          </DateElement>
        </PickerContainer>
        <StyledText style={styles.modifiedText}>Time</StyledText>
        <TimeContainer onPress={showTimePicker}>
          <StyledText style={styles.centeredText}>{time}</StyledText>
        </TimeContainer>
        <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            mode="time"
            is24Hour={true}
            display="default"
            value={date}
            onChange={onChange}
          />
        )}
        </View>
        <StyledText style={styles.modifiedText}>Icon</StyledText>
        <IconPicker
          horizontal={true}
          showHorizontalIndicator={false}
        >
          {
            iconArray.map((ele)=>
              <IconElement key={ele.key} selected={ele.key === icon ? true : false} onPress={ele.onPress}>
                <MaterialCommunityIcons name={ele.name} color={(ele.key === icon? '#010D26' : '#94CEF2')} size={24}/>
              </IconElement>
            )
          }
        </IconPicker>
        <ConfirmButton onPress={confirmAddHabit}>
          <StyledText style={styles.centeredText}>Confirm</StyledText>
        </ConfirmButton>
      </ContentSections>
    </Container>
  )
}

const styles = StyleSheet.create({
  modifiedText: {
    marginTop: 30
  },
  centeredText: {
    marginTop: 0
  }
})
