import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import { StyleSheet, View , Text , Button , ScrollView , TextInput } from 'react-native';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';

export default function EditUserScreen() {
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [motdepasse, setMotdepasse] = useState("")
  const router = useRouter()

  useEffect(() => {
    verifyToken()
  }, [])

  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token')

    if(token === '') {
      router.replace('/login')           
    }
  }

  const submitForm = async (e: any) => {
    const token = await AsyncStorage.getItem('token')
    const uid = await AsyncStorage.getItem('uid')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'PATCH',
        url: `http://localhost:3002/user/edit/${ uid }`,
        data: {nom , prenom , email , telephone, motdepasse}
      })
        console.log(response.data);        
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={styles.comptepage}> 
          <Text style={styles.font}>
            MODIFIER LES INFORMATIONS DU COMPTE
          </Text>
          <Marginer value={5} />  
          <View>
            <Text>Nom d'utilisateur : </Text>
            <TextInput
            style={styles.input}
            value={nom}
            onChangeText={(e : any)=>{
                setNom(e)
            }} 
            />
            <Text>Prenom d'utilisateur : </Text>
            <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={(e : any)=>{
              setPrenom(e)
            }}
            />
            <Text>Adresse mail : </Text>
            <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            style={styles.input}
            value={email}
            onChangeText={  (e : any)=>{
              setEmail(e)
            }}
            />
            <Text>Telephone : </Text>
            <TextInput
            style={styles.input}
            value={telephone}
            onChangeText={(e : any)=>{
              setTelephone(e)
            }}
            />
            <Text>Mot de passe : </Text>
            <TextInput
            style={styles.input}
            value={motdepasse}
            onChangeText={(e : any)=>{
              setMotdepasse(e)
            }}
            />
            <Button
            title="Sumbit"
            onPress={submitForm}
            />
          </View>
          <Marginer value={5} />  
          <Link href='/compte' style={stylesPerso.btnDefault}>Annuler</Link>  
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  comptepage : {
    padding: 50
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
  }
});
