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
      ()=>console.log('it added'),
      (_,error)=>console.log(error.message)
    )
  })
}
