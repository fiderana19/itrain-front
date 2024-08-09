import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { StyleSheet, View, Text, ScrollView, Pressable, Image, ImageBackground } from 'react-native';
import React, { useEffect , useState } from 'react';
import { Link , router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Marginer from '@/components/personalized/Marginer';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const Manakara = '../../assets/photo/man-user-circle-icon.png';
  const [user , setUser] = useState({ utilisateur_id: "" , nom: "" , email: "" , telephone: "" })

  useEffect(() => {
    verifyToken()
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem('token')
    const uid = await AsyncStorage.getItem('uid')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'GET',
        url: `http://192.168.43.184:3002/user/get/${ uid }`,
      })
        setUser(response.data[0])       
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async () => {
    await AsyncStorage.setItem('token' , '')
    
    router.replace('/home')           
  }
  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token')

    // if(token === '') {
    //   router.replace('/home')           
    // }
  }


  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}>
        <Marginer value={15} />
          <Text style={styles.userfont}> Les informations du compte </Text>
          <Marginer value={15} />
          <Image source={require(Manakara)} style={styles.photo} /> 
          <Marginer value={25} />
          <Text> Nom :  </Text>
          <Text style={styles.userfont}> { user.nom } </Text>
          <Text> Telephone :  </Text>
          <Text style={styles.userfont}> { user.telephone } </Text>
          <Text> Adresse mail :  </Text>
          <Text style={styles.userfont}> { user.email } </Text>
          <Marginer value={30} />
          <Pressable style={stylesPerso.btnPrimary} onPress={handleLogout} >
            <Ionicons color={'#fff'} name='log-out' style={trajetbox.dispoicon} />
            <Text style={{color: '#fff'}}>Se deconnecter</Text>
          </Pressable>  
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  comptepage : {
    padding: 50
  },
  userinfo: {
    marginTop: 20
  },
  photo : {
    margin: 'auto',
    width: 100,
    height: 100,
    borderColor: 'blue',
    borderRadius: 100
  },
  font : {
    color : colorBlue ,
    fontSize : 27 , 
    textAlign : 'center' , 
    fontWeight : 'bold'
  },
  userfont : {
    color : 'black' ,
    fontSize : 18 , 
    textAlign : 'right' , 
    fontWeight : 'bold'
  },
  input: {
    borderWidth: 2,
    borderColor: 'grey',
    minWidth: 200,
    textAlignVertical: 'center',
    paddingLeft: 10,
    padding: 10,
    borderRadius: 5,
    marginBottom: 7,
    color: "black"
  }
});


