import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const Container = styled.View`
  background-color: #010D26;
  flex: 1;
  height: 100%;
  width: 100%;
`

const TopSections = styled.View`
  background-color: #034C8C;
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

const ProfileImage = styled.Image`
  width: 85px;
  height: 85px;
`

const Info = styled.Text`
  font-size: 16px;
  font-family: 'OpenSans_600SemiBold';
  color: #94CEF2;
  margin: 0px 0px 20px 0px;
`

const UserInfo = styled.View`
  width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ChartInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 200px;
`

const CityInfo = styled.View``

const InfoIcon = styled.View``

const CityNameContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

const HabitContainer = styled.ScrollView`
  margin-top: 10px;
`

export default function Dashboard() {
  const [image, setImage] = useState(null) 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <Container>
      <TopSections>
        <UserInfo>
          <Info>name</Info>
          <TouchableOpacity onPress={pickImage}>
            {
              (image) ? <ProfileImage source={{uri: image}}/> : <ProfileImage source={require('../../assets/test-img.png')} />
            }
          </TouchableOpacity>
          <CityNameContainer>
            <Info>City name</Info>
            <TouchableOpacity>
              <Ionicons name='pencil' size={20} color='#94CEF2'/>
            </TouchableOpacity>
          </CityNameContainer>
        </UserInfo>
        <ChartInfo>
            <CityInfo>
              <Info>Streak: </Info>
              <Info>City Level: </Info>
              <Info>Money: </Info>
            </CityInfo>
            <InfoIcon>
              <Ionicons style={styles.styledIcon} name='star' size={20} color='#94CEF2'/>
              <Ionicons style={styles.styledIcon} name='business' size={20} color='#94CEF2'/>
              <FontAwesome5 style={styles.styledIcon} name='money-bill' size={20} color='#94CEF2'/>
            </InfoIcon>
        </ChartInfo>
      </TopSections>
      <ContentSections>
        <Info>
          Today's habit
        </Info>
        <HabitContainer>

        </HabitContainer>
      </ContentSections>
    </Container>
  )
}

const styles = StyleSheet.create({
  styledIcon: {
    marginBottom: 20
  }
})
