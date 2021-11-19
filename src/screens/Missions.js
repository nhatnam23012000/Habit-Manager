import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons';
import {getActiveMission} from '../components/DatabaseManager'
import { replaceMission } from '../components/MissionController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modalbox'

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  background-color: #010D26;
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const RewardColumn = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`

const RewardText = styled.Text`
  font-family: 'OpenSans_600SemiBold';
  font-size: 12px;
  color: #94CEF2;
  margin-top: 5px;
`

const Title = styled.Text`
  font-size: 14px;
  font-family: 'OpenSans_600SemiBold';
  color: #94CEF2;
  width: 50%;
  text-align: center;
`

const ReplaceButton = styled.TouchableOpacity`
  width: 60px;
  height: 25px;
  background-color: #034C8C;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 10px;
`

const ReplaceText = styled.Text`
  font-size: 10px;
  font-family: 'OpenSans_600SemiBold';
  color: #94CEF2;
`

const ModalContainer = styled.View`
  width: 100%;
`

const Info = styled.Text`
  font-size: 16px;
  font-family: 'OpenSans_600SemiBold';
  color: #94CEF2;
  margin: 0px 0px 20px 0px;
`

const ConfirmChange = styled.TouchableOpacity`
  background-color: #94CEF2;
  width: 100px;
  height: 40px;
  align-self: center;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`

export default function Missions() {

  const [missionArray, setMissionArray] = useState()
  const [notifyReplaced, setNotifyReplaced] = useState(false)
  const [notifyError, setNotifyError] = useState(false)

  useEffect(() => {
    let secTimer = setInterval(() => {

      getActiveMission()
      AsyncStorage.getItem('missionList').then((value) => {
        setMissionArray(JSON.parse(value));
      })
    }, 1000)

    return () => clearInterval(secTimer)
  })

  const triggerReplace = (item) => {
    AsyncStorage.getItem('lastTimeReplaced').then((value) => {
      const today = new window.Date()
      const todayDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}}`
      if (value === null) {
        AsyncStorage.setItem('lastTimeReplaced', todayDate)
        replaceMission(item.id)
        setNotifyReplaced(true)
      } else {
        if (value === todayDate) {
          setNotifyError(true)
          return
        }
        else {
          replaceMission(item.id)
          setNotifyReplaced(true)
          AsyncStorage.setItem('lastTimeReplaced', todayDate)
        }
      }
    })

  }

  const renderMission = ({item}) =>(
    <ItemContainer>
      <RewardColumn>
        <FontAwesome name="money" size={24} color="#94CEF2" />
        <RewardText>Reward: {item.reward}</RewardText>
      </RewardColumn>
      <Title>{item.content}</Title>
      <ReplaceButton onPress={()=> triggerReplace(item)}>
        <ReplaceText>Replace</ReplaceText>
      </ReplaceButton>
    </ItemContainer>
  )

  return (
    <Container>
      {
        (missionArray === []) ? <Info style={styles.notifyText}>There is no mission! Come back later!</Info> 
        : 
        <FlatList
          style={styles.flatList}
          renderItem={renderMission}
          data={missionArray}
          keyExtractor={item=>String(item.id)}
          scrollEnabled={true}
        />
      }
      
      <Modal
        style={styles.styledModal}
        isOpen={notifyReplaced}
        position='center'
      >
        <ModalContainer>
          <Info style={styles.title}>Mission has been changed!</Info>
          <ConfirmChange onPress={() => setNotifyReplaced(false)}>
            <Info style={styles.styledText}>Confirm</Info>
          </ConfirmChange>
        </ModalContainer>
      </Modal>

      <Modal
        style={styles.styledModal}
        isOpen={notifyError}
        position='center'
      >
        <ModalContainer>
          <Info style={styles.title}>You can't replace quest yet, come back tomorrow!</Info>
          <ConfirmChange style={styles.error} onPress={() => setNotifyError(false)}>
            <Info style={styles.styledText}>Cancel</Info>
          </ConfirmChange>
        </ModalContainer>
      </Modal>
    </Container>
  )
}

const styles = StyleSheet.create({
  flatList: {
    marginTop: 80,
  },
  title: {
    alignSelf: 'center',
    width: '80%',
    textAlign: 'center'
  },
  styledText: {
    marginBottom: 0,
    color: '#000000',
  },
  styledModal: {
    width: windowWidth-80,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowRadius: 10
  },
  error: {
    backgroundColor: '#E60000'
  },
  notifyText: {
    textAlign: 'center',
  }
})
