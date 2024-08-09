import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso } from '@/src/styles/GeneralStyles';
import { StyleSheet, View , Text , Button , ScrollView , TextInput } from 'react-native';
import axios from 'axios'
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link , useRouter } from 'expo-router';

export default function SignupPageScreen() {
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [motdepasse, setMotdepasse] = useState("")

  const [errorNom , setErrorNom] = useState("")
  const [errorMail , setErrorMail] = useState("")
  const [errorTelephone , setErrorTelephone] = useState("")
  const [errorMotdepasse , setErrorMotdepasse] = useState("")

  const router = useRouter()

  const submitForm = async (e: any) => {
    setErrorNom("")
    setErrorMail("")
    setErrorTelephone("")
    setErrorMotdepasse("")
    if(nom == "") {
      setErrorNom("Veuillez entrez votre nom !")
    }
    if(telephone == "") {
      setErrorTelephone("Veuillez entrez votre telephone !")
    }
    if(motdepasse.length < 5) {
      setErrorMotdepasse("Le mot de passe doit être 6 caratères au minimum !")
    }

    if(nom != "" && telephone != "" && motdepasse.length > 5) {
      try {
        const response  = await axios({
          method: 'POST',
          url: `http://192.168.43.184:3002/user/signin`,
          data: {nom , email , telephone, motdepasse}
        })
          console.log(response.data);
  
          router.replace('/connexion')        
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}> 
          <Text style={styles.font}>
            CREER UN COMPTE
          </Text>
          <Marginer value={10} />  
          <View>
            <Text>Nom d'utilisateur : </Text>
            <TextInput
            style={errorNom ? stylesPerso.inputError : stylesPerso.inputReal}
            value={nom}
            onChangeText={(e : any)=>{
                setNom(e)
            }} 
            />
            {errorNom && <Text style={{color : 'red'}}> {errorNom} </Text>}
            <Text>Adresse mail : </Text>
            <TextInput
            style={stylesPerso.inputReal}
            value={email}
            onChangeText={  (e : any)=>{
              setEmail(e)
            }}
            />
            <Text>Telephone : </Text>
            <TextInput
            style={errorTelephone ? stylesPerso.inputError : stylesPerso.inputReal}
            value={telephone}
            onChangeText={(e : any)=>{
              setTelephone(e)
            }}
            />
            {errorTelephone && <Text style={{color : 'red'}}> {errorTelephone} </Text>}
            <Text>Mot de passe : </Text>
            <TextInput
            style={errorMotdepasse ? stylesPerso.inputError : stylesPerso.inputReal}
            value={motdepasse}
            onChangeText={(e : any)=>{
              setMotdepasse(e)
            }}
            />
            {errorMotdepasse && <Text style={{color : 'red'}}> {errorMotdepasse} </Text>}
            <Button
            title="Creer"
            onPress={submitForm}
            />
          </View>
          <Marginer value={50} />  
          <Link href='/connexion' style={styles.link}><Text> Vous avez deja un compte ? Se connecter</Text></Link>
        </View>
        <Marginer value={50} />  
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
  },
  link: {
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
});
