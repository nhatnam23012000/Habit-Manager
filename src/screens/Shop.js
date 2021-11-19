import React, {useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modalbox'
import house from '../../assets/house1.png'
import cafe from '../../assets/cafe.png'
import office1 from '../../assets/office1.png'
import office2 from '../../assets/office2.png'

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  background-color: #010D26;
  flex: 1;
  height: 100%;
  width: 100%;
`

const TopSections = styled.View`
  background-color: #034C8C;
  height: 33%;
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
  margin-top: 60px;
`

const ChartInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 200px;
  margin-top: 60px;
`

const CityInfo = styled.View``

const InfoIcon = styled.View``

const CityNameContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

const ModalContainer = styled.View`
  width: 100%;
`

const UnderlineTextInput = styled.TextInput`
  width: 80%;
  height: 40px;
  border-bottom-color: #A9A9A9;
  border-bottom-width: 1px;
  align-self: center;
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

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 20px;
`

const ShopTitle = styled.Text`
  font-size: 20px;
  font-family: 'OpenSans_600SemiBold';
  color: #94CEF2;
  position: absolute;
  top: 30px;
  left: 45%;
`

const ShopItemContainer = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border: 2px solid #234586;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  opacity: ${props => (props.disabled===true) ? 0.5 : 1};
`

const ImageContainer = styled.Image`
  max-width: 100px;
  max-height: 80px;
  opacity: ${props => (props.disabled===true) ? 0.5 : 1};
`

const ItemTitle = styled.Text`
  font-family: 'OpenSans_600SemiBold';
  font-size: 14px;
  color: #94CEF2;
  opacity: ${props => (props.disabled===true) ? 0.5 : 1};
`

const CostContainer = styled.View`
  display: flex;
  flex-direction: row;
  opacity: ${props => (props.disabled===true) ? 0.5 : 1};
`

const CostText = styled.Text`
  font-family: 'OpenSans_600SemiBold';
  font-size: 24px;
  color: #94CEF2;
  opacity: ${props => (props.disabled===true) ? 0.5 : 1};
`

const Shop = ({navigation}) => {
  const [image, setImage] = useState(null) 
  const [username, setUsername] = useState()
  const [cityName, setCityName] = useState()
  const [tempText, setTempText] = useState('')
  const [streak, setStreak] = useState(null)
  const [cityLvl, setCityLvl] = useState(null)
  const [money, setMoney] = useState(null)
  const [isUserNameModalVisible, setIsUserNameModalVisible] = useState(false)
  const [isCityNameModalVisible, setIsCityNameModalVisible] = useState(false)
  const [notifySuccess, setNotifySuccess] = useState(false)
  const [notifyError, setNotifyError] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('userName').then(value => {
      if (value !== null) {
        setUsername(value)
      }
    })

    AsyncStorage.getItem('imageUri').then(value => {
      if(value !== null) {
        setImage(value)
      }
    })

    AsyncStorage.getItem('cityName').then(value => {
      if(value !== null) {
        setCityName(value)
      }
    })

    AsyncStorage.getItem('streak').then(value => {
      if(value !== null) {
        setStreak(value)
      }
      else {
        AsyncStorage.setItem('streak', '0')
      }
    })

    AsyncStorage.getItem('cityLvl').then(value => {
      if(value !== null) {
        setCityLvl(value)
      }
      else {
        AsyncStorage.setItem('cityLvl', '0')
      }
    })

    AsyncStorage.getItem('money').then(value => {
      if(value !== null) {
        setMoney(value)
      }
      else {
        AsyncStorage.setItem('money', '0')
      }
    })
  }, [])

  const showUserNamePopup = () => {
    setIsUserNameModalVisible(true)
  }

  const changeUserName = () => {
    if (tempText !== '') {
      setUsername(tempText)
      AsyncStorage.setItem('userName', tempText)
    }
    setIsUserNameModalVisible(false)
  }

  const showCityNamePopup = () => {
    setIsCityNameModalVisible(true)
  }

  const changeCityName = () => {
    if (tempText !== '') {
      setCityName(tempText)
      AsyncStorage.setItem('cityName', tempText)
    }
    setIsCityNameModalVisible(false)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri)
      AsyncStorage.setItem('imageUri', result.uri)
    }
  }

  const buyItem = (cost) => {
    if (money >= cost) {
      setNotifySuccess(true)
      AsyncStorage.setItem('cityLvl', JSON.stringify(parseInt(cityLvl) + 1)).then(() => {
        AsyncStorage.getItem('cityLvl').then((value) => {
          setCityLvl(value)
        })
      })
      AsyncStorage.setItem('money', JSON.stringify(money - cost)).then(() => {
        AsyncStorage.getItem('money').then((value) => {
          setMoney(value)
        })
      })
    } else{
      setNotifyError(true)
    }
  }

  const shopItem = [
    {
      key: 0,
      name: 'Cottage',
      cost: 100,
      image: house,
      require: 0
    },
    {
      key: 1,
      name: 'Restaurant',
      cost: 400,
      image: cafe,
      require: 1
    },
    {
      key: 2,
      name: 'Small Office',
      cost: 800,
      image: office1,
      require: 2
    },
    {
      key: 3,
      name: 'Business center',
      cost: 1000,
      image: office2,
      require: 3
    }
  ]

  const renderItemInShop =  ({item}) => (
    <ShopItemContainer
      disabled={(cityLvl == item.require) ? false : true}
      onPress={()=>buyItem(item.cost)}
    >
      <ImageContainer disabled={(cityLvl >= item.require) ? false : true} source={item.image}/>
      <ItemTitle disabled={(cityLvl >= item.require) ? false : true}>{item.name}</ItemTitle>
      <CostContainer disabled={(cityLvl >= item.require) ? false : true}>
        <CostText>{item.cost}</CostText>
        <FontAwesome5 style={styles.alignIcon} name='money-bill' size={20} color='#94CEF2'/>
      </CostContainer>
    </ShopItemContainer>
  )

  return (
    <Container>

    <TopSections>
      <BackBtn onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color={'#94CEF2'}/>
      </BackBtn>
      <ShopTitle>Shop</ShopTitle>
      <UserInfo>
        <TouchableOpacity onPress={showUserNamePopup}>
          <Info>{(username) ? username : 'username'}</Info>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          {
            (image) ? <ProfileImage source={{uri: image}}/> : <ProfileImage source={require('../../assets/test-img.png')} />
          }
        </TouchableOpacity>
        <CityNameContainer>
          <TouchableOpacity onPress={showCityNamePopup}>
            <Info>{(cityName) ? cityName : 'City Name'} </Info>
          </TouchableOpacity>
            <FontAwesome5 name='city' size={20} color='#94CEF2'/>
        </CityNameContainer>
      </UserInfo>
      <ChartInfo>
          <CityInfo>
            <Info>Streak: {(streak) ?streak : '0'}</Info>
            <Info>City Level: {(cityLvl) ?cityLvl : '0'}</Info>
            <Info>Money: {(money) ?money : '0'}</Info>
          </CityInfo>
          <InfoIcon>
            <Ionicons style={styles.styledIcon} name='star' size={20} color='#94CEF2'/>
            <Ionicons style={styles.styledIcon} name='business' size={20} color='#94CEF2'/>
            <FontAwesome5 style={styles.styledIcon} name='money-bill' size={20} color='#94CEF2'/>
          </InfoIcon>
      </ChartInfo>
    </TopSections>
    <ContentSections>
      <FlatList
        data={shopItem}
        keyExtractor={item=> String(item.key)}
        numColumns={2}
        renderItem={renderItemInShop}
      >

      </FlatList>
    </ContentSections>
    <Modal
        style={styles.styledModal}
        isOpen={isUserNameModalVisible}
        position='center'
      >
        <ModalContainer>
          <UnderlineTextInput
            placeholder='Edit your username'
            onChangeText={setTempText}
          ></UnderlineTextInput>
          <ConfirmChange onPress={changeUserName}>
            <Info style={styles.styledText}>Confirm</Info>
          </ConfirmChange>
        </ModalContainer>
      </Modal>

      <Modal
        style={styles.styledModal}
        isOpen={isCityNameModalVisible}
        position='center'
      >
        <ModalContainer>
          <UnderlineTextInput
            placeholder='Edit your city`s name'
            onChangeText={setTempText}
          ></UnderlineTextInput>
          <ConfirmChange onPress={changeCityName}>
            <Info style={styles.styledText}>Confirm</Info>
          </ConfirmChange>
        </ModalContainer>
      </Modal>

      <Modal
        style={styles.styledModal}
        isOpen={notifySuccess}
        position='center'
      >
        <ModalContainer>
          <Info style={styles.title}>You got a new building! Congratulations!</Info>
          <ConfirmChange onPress={() => {
              setNotifySuccess(false)
              navigation.goBack()
            }}>
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
          <Info style={styles.title}>You can't buy this building</Info>
          <ConfirmChange onPress={() => setNotifyError(false)}>
            <Info style={styles.styledText}>Confirm</Info>
          </ConfirmChange>
        </ModalContainer>
      </Modal>

    </Container>
  )
}

export default Shop

const styles = StyleSheet.create({

  alignIcon: {
    marginTop: 5,
    marginLeft: 5
  },

  styledIcon: {
    marginBottom: 20
  },

  styledTouch: {
    marginTop: 20
  },

  styledText: {
    marginBottom: 0,
    color: '#000000'
  },

  styledModal: {
    width: windowWidth-80,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowRadius: 10
  },

  title: {
    alignSelf: 'center',
  }
})
