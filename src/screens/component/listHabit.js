import React, {useEffect, useState} from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getHabitOfToday, updateDoneOfHabit} from '../../components/DatabaseManager'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import {checkMissionStatus} from '../../components/MissionController'


const windowWidth = Dimensions.get('window').width;

const ListHabit = (props) => {

  const [listHabitToday, setListHabitToday] = useState(null)

  const ItemContainer = styled.TouchableOpacity`
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

  useEffect(() => {
    let secTimer = setInterval(() => {
      const today = new window.Date()
      getHabitOfToday(today.getDay())
      AsyncStorage.getItem('todayHabit').then((value) => {
        setListHabitToday(JSON.parse(value))
      })
    }, 1000)

    return () => clearInterval(secTimer)
  })


  const updateStreak = () => {
    AsyncStorage.getItem('streak').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('streak', '1')
      } else {
        const valToAdd = JSON.parse(value) + 1
        AsyncStorage.getItem('lastStreakUpdate').then((day) => {
          const today = new window.Date()
          const todayDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}}`
          if (day === null) {
            AsyncStorage.setItem('lastStreakUpdate', todayDate)
            AsyncStorage.setItem('streak', JSON.stringify(valToAdd))
          }
          else if (day !== todayDate){
            AsyncStorage.setItem('lastStreakUpdate', todayDate)
            AsyncStorage.setItem('streak', JSON.stringify(valToAdd))
          }
        })
      }
    })
  }

  const checkDone = (id, time) => {
    const nowHour = new window.Date().getHours()
    if(time.split(':')[0] == nowHour) {
      updateDoneOfHabit(id, 1)
      updateStreak()
      checkMissionStatus(props.setComplete1, props.setComplete2)
      props.setNotifySuccess(true)
      props.updateMoney(15)
    }
    else {
      props.setNotifyError(true)
    }
  }

  const onHold = (item) => {
    props.navigation.navigate('Edit', {item: item})
  }

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
    <ItemContainer onLongPress={() => onHold(item)}>
      {renderIcon(item.icon)}
      <TextSection>
        <Title>{item.content}</Title>
        <Time>{item.time}</Time>
      </TextSection>
      <TouchableOpacity onPress={() => checkDone(item.id, item.time)}>
        <FontAwesome5 style={styles.modifiedCheckBox} name='check-square' color='#94CEF2' size={26}/>
      </TouchableOpacity>
    </ItemContainer>
  )
  

  return (
    <>
      <FlatList
        data={listHabitToday}
        renderItem={renderHabit}
        keyExtractor={item=>String(item.id)}
        scrollEnabled={true}
      />

    </>

  )
}

export default ListHabit

const styles = StyleSheet.create({
  modifiedIcon: {
    marginLeft: 20,
  },

  modifiedText: {
    color: '#FFFFFF'
  },  

  modifiedCheckBox: {
    marginRight: 20
  },

  styledModal: {
    width: windowWidth-80,
    height: 150,
    justifyContent: 'center',
    borderRadius: 30,
    shadowRadius: 10
  }
})

