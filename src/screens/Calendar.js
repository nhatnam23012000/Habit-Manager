import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import {Calendar, LocaleConfig} from 'react-native-calendars';

const Container = styled.View`
  background-color: #010D26;
  flex: 1;
  height: 100%;
  width: 100%;
`

export default function CalendarScreen({navigation}) {

  return (
    <Container>
      <Calendar
        theme={
          {
            calendarBackground: '#010D26',
            dayTextColor: '#94CEF2',
            textDayFontFamily: 'OpenSans_600SemiBold',
            textDayHeaderFontSize: 16,
            selectedDayTextColor: '#010D26',
            selectedDayBackgroundColor: '#034C8C',
            textDayHeaderFontFamily: 'OpenSans_600SemiBold',
            textDayHeaderFontSize: 14,
            textDayHeaderTextColor: '#94CEF2',
            textMonthFontFamily: 'OpenSans_600SemiBold',
            monthTextColor: '#94CEF2',
            textDisabledColor: 'rgba(148, 206, 242, 0.3)',
            todayBackgroundColor: '#034C8C',
            todayTextColor: '#010D26',
          }  
        }
        onDayPress={(day) => {navigation.navigate('Detail', {day: day})}}
        style={styles.customCalendar}
      />
    </Container>
  )
}

const styles = StyleSheet.create({
  customCalendar: {
    marginTop: '50%'
  }
})
