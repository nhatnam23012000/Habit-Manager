import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const openDb = () => {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("app.db");
  return db;
}

export const db = openDb()

export function createHabitTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists habit (id integer primary key not null, done int, content text, repeat text, time text, icon int);",
      [],
      ()=>console.log('created table'),
      (_,error)=>{console.log(error.message)}
    )
  })
}

const updateHabitStorage = async (valueToAdd) => {
  try {
    const val = JSON.stringify(valueToAdd)
    await AsyncStorage.setItem('currentHabit', val)
  } catch (error) {
    console.log(error)
  }
}

export function getHabitList() {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from habit",
      [],
      (_,{ rows: _array }) => {
        updateHabitStorage(_array)
      }
    )
  })
}

export function addHabit( title, repeat, time, icon) {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into habit (done, content, repeat, time, icon) values (0, ?, ?, ?, ?)",
      [title, repeat, time, icon],
      ()=>{
        
      },
      (_,error)=>console.log(error.message)
    )
  })
}

export function getHabitOfToday(day) {
  switch (day) {
    case 0:
      day = 'Sun'
      break
    case 1:
      day = 'Mon'
      break
    case 2:
      day = 'Tue'
      break
    case 3:
      day = 'Wed'
      break
    case 4:
      day = 'Thu'
      break
    case 5:
      day = 'Fri'
      break
    case 6:
      day = 'Sat'
      break
  }
  db.transaction((tx) => {
    tx.executeSql(
      "select * from habit where repeat=? and done=0",
      [day],
      (_,{ rows: _array }) => {
        const val = JSON.stringify(_array._array)
        AsyncStorage.setItem('todayHabit', val)
      }
    )
  })
}

export function getHabitOfDay (day) {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from habit where repeat=?",
      [day],
      (_,{ rows: _array }) => {
        const val = JSON.stringify(_array._array)
        AsyncStorage.setItem('habitOfChosenDay', val)
      }
    )
  })
}

export function updateDoneOfHabit (id, val) {
  db.transaction((tx) => {
    tx.executeSql(
      'update habit set done=? where id=?',
      [val, id],
      ()=>{
      }
    )
  })
}

export function updateHabit(id, valueChanged) {
  db.transaction((tx) => {
    tx.executeSql(
      'update habit set content=?, icon=?, repeat=?, time=? where id=?',
      [valueChanged.content, valueChanged.icon, valueChanged.repeat, valueChanged.time, id]
    )
  })
}

export function resetDoneOfHabit () {
  db.transaction((tx) => {
    tx.executeSql(
      'update habit set done=0 where done=1',
      [],
      (_, {rowsAffected: rowsAffected}) => {
        if (rowsAffected === 0) {
          AsyncStorage.setItem('streak', '0')
        }
      }
    )
  })
}

export function deleteHabit(id) {
  db.transaction((tx) => {
    tx.executeSql(
      'delete from habit where id = ?',
      [id]
    )
  })
}

export function createMissionTable() {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists missions (id integer primary key not null, active int, content text, track text, reward int);",
      []
    )
  })
}

function addMission(active, content, track, reward) {
  db.transaction((tx) => {
    tx.executeSql(
      'insert into missions (active, content, track, reward) values (?, ?, ?, ?)',
      [active, content, track, reward]
    )
  })
}

export function getActiveMission() {
  db.transaction((tx) => {
    tx.executeSql(
      'select * from missions where active = 1;',
      [],
      (_,{ rows: _array }) => {
        const val = JSON.stringify(_array._array)
        AsyncStorage.setItem('missionList', val)
      }
    )
  })
}

export function updateActiveMission(id, active) {
  db.transaction((tx) => {
    tx.executeSql(
      'update missions set active=? where id=?',
      [active, id],
      () => {
        getActiveMission()
      }
    )
  })
}

function getInactiveMission() {
  db.transaction((tx) => {
    tx.executeSql(
      'select id from mission where active=0',
      [],
      (_,{ rows: _array }) => {
        return _array._array
      }
    )
  })
}

export function addNewActiveMission() {
  const idArray = getInactiveMission()
  if (idArray.length == 0){
    return
  }
  const id = idArray[Math.floor(Math.random()*idArray.length)].id
  updateActiveMission(id, 1)
}

