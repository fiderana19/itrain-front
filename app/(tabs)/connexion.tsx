import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso } from '@/src/styles/GeneralStyles';
import { StyleSheet, View , Text , Button , ScrollView , TextInput } from 'react-native';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router'

export default function LoginPageScreen() {
  const [email, setEmail] = useState("")
  const [motdepasse, setMotdepasse] = useState("")
  const router = useRouter()

  useEffect(() => {
  }, [])
  

  const submitForm = async (e: any) => {
    try {   
      const response  = await axios({
        method: 'POST',
        url: `http://192.168.43.184:3002/user/login`,
        data: {email , motdepasse}
      })        
        await AsyncStorage.setItem('token' , response.data.token)
        AsyncStorage.setItem('uid' ,  response.data.uid.toString())
        await AsyncStorage.setItem('isadmin' , response.data.isadmin)

        const token = await AsyncStorage.getItem('token')
        const uid = await AsyncStorage.getItem('uid')
        const isadmin = await AsyncStorage.getItem('isadmin')

        if(isadmin == '1') {
          router.replace('/authhome')          
        }
        if(isadmin == '0') {
          router.replace('/signedhome')
        }
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}> 
        <Marginer value={15} />  
          <Text style={styles.font}>
            SE CONNECTER
          </Text>
          <Text>Veuillez vous connecter pour pouvoir reserver des billets </Text>
          <Marginer value={20} />  
          <View>
            <Text>Adresse mail ou Telephone : </Text>
            <TextInput
            style={stylesPerso.inputReal}
            value={email}
            onChangeText={  (e : any)=>{
              setEmail(e)
            }}
            />
            <Text>Mot de passe : </Text>
            <TextInput
            style={stylesPerso.inputReal}
            value={motdepasse}
            onChangeText={(e : any)=>{
              setMotdepasse(e)
            }}
            />
            <Button
            title="Se connecter"
            onPress={submitForm}
            />
          </View>
          <Marginer value={40} />  
          <Link href='/signup' style={styles.link}><Text> Créer un compte </Text></Link>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  comptepage : {
  },
  font : {
    color : colorBlue ,
    fontSize : 27 , 
    textAlign : 'center' , 
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
  },
  link: {
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});
