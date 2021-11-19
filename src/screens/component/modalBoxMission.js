import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Modal from 'react-native-modalbox'

const windowWidth = Dimensions.get('window').width;

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

export function CompletedMission5Streak(props) {
  return (
    <Modal
      style={styles.styledModal}
      position='center'
      isOpen={props.openVar}
    >
    <ModalContainer>
      <Info style={styles.title}>Congratulation! You completed 'Get a streak of 5' mission. Got 50$. Keep it up!</Info>
      <ConfirmChange onPress={() => props.changeOpenVar(false)}>
        <Info style={styles.styledText}>Confirm</Info>
      </ConfirmChange>
    </ModalContainer>
  </Modal>
  )
}

export function CompletedMissionMonday(props) {
  return (
    <Modal
      style={styles.styledModal}
      position='center'
      isOpen={props.openVar}
    >
    <ModalContainer>
      <Info style={styles.title}>Congratulation! You completed 'Complete a habit on Monday' mission. Got 10$. Keep it up!</Info>
      <ConfirmChange onPress={() => props.changeOpenVar(false)}>
        <Info style={styles.styledText}>Confirm</Info>
      </ConfirmChange>
    </ModalContainer>
  </Modal>
  )
}

const styles = StyleSheet.create({
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
})
