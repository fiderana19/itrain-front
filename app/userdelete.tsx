import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import { StyleSheet, View , Text , Button , ScrollView , TextInput } from 'react-native';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link , useRouter } from 'expo-router';

export default function EditUserScreen() {
  const [motdepasse, setMotdepasse] = useState("")
  const [mdp, setMdp] = useState("")
  const router = useRouter()
  const [confirm, setConfirm] = useState("")
  const [user , setUser] = useState({utilisateur_id: "" , nom: "" , prenom: "" , email: "" , telephone : "" , is_admin: "" , motdepasse: "" , })

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
    const uid = await AsyncStorage.getItem('uid')
    const token = await AsyncStorage.getItem('token')

    if(motdepasse === confirm) {
      console.log("yesss" , motdepasse , confirm);

      try {
        const response  = await axios({
          headers: {
            Authorization: `Bearer ${ token }`
          },  
          method: 'GET',
          url: `http://localhost:3002/user/get/${ uid }`,
        })
        console.log(response.data[0]); 
        setUser(response.data[0])
        setMdp(response.data[0].motdepasse)
        console.log(mdp, "eto")
      } catch (error) {
        console.log(error)
      }

      if(motdepasse === mdp) {
        console.log("tay");
        try {
          // const response  = await axios({
          //   method: 'DELETE',
          //   url: `http://localhost:3002/user/delete/${ id }`,
          // })
          // console.log(response.data);  
          AsyncStorage.setItem('token' , '')
          AsyncStorage.setItem('uid' , '')
          AsyncStorage.setItem('isadmin' , '')
          router.replace('/login')           
        } catch (error) {
          console.log(error)
        }
      }  else {
        console.log("Mot de passe incorrect");
      }
    } else {
      console.log("Confirmation mot de passe incorrect ! ");
    }
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={styles.comptepage}> 
          <Text style={styles.font}>
            CONFIRMER LA SUPPRESSION DU COMPTE
          </Text>
          <Marginer value={10} />  
          <View>
            <Text>Mot de passe : </Text>
            <TextInput
            placeholderTextColor="#000"
            style={styles.input}
            value={motdepasse}
            onChangeText={(e : any)=>{
              setMotdepasse(e)
            }}
            />
            <Text>Confirmer Mot de passe : </Text>
            <TextInput
            placeholderTextColor="#000"
            style={styles.input}
            value={confirm}
            onChangeText={(e : any)=>{
              setConfirm(e)
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
