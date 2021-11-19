import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateActiveMission, getActiveMission } from './DatabaseManager';

export function replaceMission(itemToReplace) {
  AsyncStorage.setItem(`${itemToReplace.track}`, '0')
  if (itemToReplace.id === 1) {
    updateActiveMission(1, 0)
    updateActiveMission(2, 1)
    AsyncStorage.setItem('missionMonday', '0')
  }
  else {
    updateActiveMission(1, 1)
    updateActiveMission(2, 0)
    AsyncStorage.setItem('mission5Streak', '0')
  }
}

function triggerDoneMission5Streak (setIsOpenModal) {
  setIsOpenModal(true)
  updateActiveMission(1, 0)
  AsyncStorage.getItem('money').then((value) => {
    if (value === null) {
      AsyncStorage.setItem('money', '50')
    } else {
      newValue = JSON.parse(value) + 50
      AsyncStorage.setItem('money', JSON.stringify(newValue))
    }
  })
}

function triggerDoneMissionMonday (setIsOpenModal) {
  setIsOpenModal(true)
  updateActiveMission(2,0)
  AsyncStorage.getItem('money').then((value) => {
    if (value === null) {
      AsyncStorage.setItem('money', '10')
    } else {
      newValue = JSON.parse(value) + 10
      AsyncStorage.setItem('money', JSON.stringify(newValue))
    }
  })
}

export function checkMissionStatus(setIsOpenFor1, setIsOpenFor2) {
  getActiveMission()
  AsyncStorage.getItem('missionList').then((value) => {
    const mission = JSON.parse(value)
    mission.forEach((item) => {
      if(item.id===1) {
        AsyncStorage.getItem(`${item.track}`).then((val) => {
          if (JSON.parse(val) === null) {
            AsyncStorage.getItem('streak').then((val) => {
              AsyncStorage.setItem('mission5Streak', val)
            })
          } else if (JSON.parse(val) === 5) {
            triggerDoneMission5Streak(setIsOpenFor1)
          } else {
            AsyncStorage.getItem('streak').then((val) => {
              AsyncStorage.setItem('mission5Streak', val)
            })
          }
        })
      } else if (item.id === 2) {
        const today = new window.Date().getDay()
        if(today === 1) {
          triggerDoneMissionMonday(setIsOpenFor2)
        }
      }
    })
  })

}
