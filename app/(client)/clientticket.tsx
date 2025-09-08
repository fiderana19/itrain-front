import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import {printToFileAsync} from 'expo-print'
import { shareAsync } from 'expo-sharing'
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

export default function HomeScreen() {
  const [billets , setBillets] = useState([])
  const [numero_train, setNumeroTrain] = useState("")
  const [classe, setClasse] = useState("")
  const [nbr_place, setNbrPlace] = useState("")
  const [nom, setNom] = useState("")
  const [telephone, setTelephone] = useState("")
  const [gare_depart, setGareDepart] = useState("")
  const [gare_arrive, setGareArrive] = useState("")
  const [heure_depart, setHeureDepart] = useState("")
  const [heure_arrive, setHeureArrive] = useState("")
  const [date_trajet , setSelectedDate] = useState(null);
  const [dt , setDt] = useState("");

  useEffect(() => {
    fetchBillet()

    verifyToken()
  }, [])
  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token')

    if(token === '') {
      router.replace('/home')           
    }
  }

  const fetchBillet = async () => {
    const token = await AsyncStorage.getItem('token')
    const uid = await AsyncStorage.getItem('uid')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'GET',
        url: `http://192.168.43.184:3002/reservation/billet/${ uid }`,
      })
      console.log(response.data)
        setBillets(response.data)     
    } catch (error) {
      console.log(error)
    }
  }
  const handleGenerate = async (item: any) => {
    setNumeroTrain(item.numero_train)
    setClasse(item.classe)
    setNbrPlace(item.nbr_place)
    setNom(item.nom)
    setTelephone(item.telephone)
    setGareDepart(item.gare_depart)
    setGareArrive(item.gare_arrive)
    setHeureDepart(item.heure_depart)
    setHeureArrive(item.heure_arrive)
    setSelectedDate(item.date_trajet)
    console.log(item.date_trajet)

    console.log("beau", numero_train,classe, nbr_place, nom, telephone,gare_depart,gare_arrive, heure_depart,heure_arrive,date_trajet )

    generateTicket()
  }
  const html = `
  <html>
  <body>
  <div style="padding: 25px;font-weight: normal; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
      <div style="display: flex;justify-content: space-between;">
          <div>
              <h2 style="color: darkcyan;font-size: 50px; font-weight: bolder;">i-train</h2>
          </div>
          <div style="text-align: right;">
                  <h3 style="font-size: 28px;color: gray;font-weight: 500;">Départ</h3>
                  <h3 style="font-size: 35px;font-weight: 500;">${ date_trajet }</h3>
          </div>
          
      </div> 
      <div style="display: flex; justify-content: space-between;margin: 25px 0;">
          <div>
              <h3 style="font-size: 45px; font-weight: bolder;">${ heure_depart }</h3>
              <h3 style="font-size: 28px;font-weight: 500;">${ gare_depart }</h3>
          </div>
          <div style="font-size: 35px;color: gray;display: flex;flex-direction: column;justify-content: center;"><p>------></p></div>
          <div style="text-align: right;">
              <h3 style="font-size: 45px; font-weight: bolder;">${ heure_arrive }</h3>
              <h3 style="font-size: 28px;font-weight: 500;">${ gare_arrive }</h3>
          </div>
      </div>
      <div style="display: flex; justify-content: space-between;margin: 25px 0;">
          <div>
              <h3 style="font-weight: 500;color: gray;font-size: 28px;">TRAIN</h3>
              <h3 style="font-weight: 500;font-size: 30px;">${ numero_train }</h3>
          </div>
          <div>
              <h3  style="font-weight: 500;color: gray;font-size: 28px;">CLASSE</h3>
              <h3 style="font-weight: 500;font-size: 30px;">${ classe }</h3>
          </div>
          <div style="text-align: right;">
              <h3 style="font-weight: 500;color: gray;font-size: 28px;">NOMBRE DE PLACE</h3>
              <h3 style="font-weight: 500;font-size: 30px;">${ nbr_place }</h3>
          </div>
      </div>
      <div style="display: flex; justify-content: space-between;margin: 25px 0;">
          <div>
              <h3  style="font-weight: 500;color: gray;font-size: 28px;">PASSAGER</h3>
              <h3 style="font-weight: 500;font-size: 30px;">${ nom }</h3>
          </div>
          <div style="text-align: right;">
              <h3  style="font-weight: 500;color: gray;font-size: 28px;">TELEPHONE</h3>
              <h3 style="font-weight: 500;font-size: 30px;">${ telephone }</h3>
          </div>
      </div>
  </div>
</body>
  </html>
  `

  const generateTicket = async () => {
    const file = printToFileAsync({
      html: html,
      base64: false
    })

    await shareAsync((await file).uri)
  }

  
  const formater = (date: any) => {
    return moment(date).format('YYYY-MM-DD')
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}>
          <Marginer value={15} />
          <View style={styles.acc}>
            <Text style={styles.title}>
              Mes billets reservés
            </Text>
            <Marginer value={15} />
          </View>
          { billets && billets.map((trajet: any, index) => (
            <View style={trajetbox.item} key={index}>
              <Text style={trajetbox.itemtitle}>
                { trajet.gare_depart } vers { trajet.gare_arrive }
              </Text>
              <Text style={styles.trajetinfo}>
                { formater(trajet.date_trajet) }
              </Text>
              <View style={styles.flexy} >
                  <Text style={trajetbox.itemheure}> { trajet.heure_depart }</Text> 
                  <Text style={trajetbox.itemduree}>-----   { trajet.duree_trajet }  ----</Text>
                  <Text style={trajetbox.itemheure}> { trajet.heure_arrive }</Text>
              </View>
              <View style={styles.flexy}>
                <Text style={trajetbox.itemville}> { trajet.gare_depart }</Text>
                <Text style={trajetbox.itemville}> { trajet.gare_arrive }</Text>
              </View>
              <Text style={trajetbox.itembillet}>
                { trajet.billet } MGA
              </Text>
              <Text style={trajetbox.itemtext}>
                Train n°  { trajet.numero_train }
              </Text>
              <Text style={trajetbox.itemtextt}>
                Classe:   { trajet.classe }
              </Text>
              <Text style={trajetbox.itemdispo}>
                { trajet.nbr_place } places
              </Text>
              <Text style={trajetbox.itembillet}>
                Montant total:   { trajet.billet*trajet.nbr_place } MGA
              </Text>
              <Marginer value={10} />
              <Pressable onPress={()=>{handleGenerate(trajet)}}>
                  <View style={stylesPerso.btnPrimary}>
                    <Ionicons color={'#fff'} name='ticket-outline' style={stylesPerso.iconfont} />
                    <Text style={{color: '#fff'}}>Generer un billet</Text>
                  </View>
                </Pressable>
            </View>
          )) }
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  comptepage : {
    padding: 50
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
  acc : {
    width: '100%',
    height : 'auto',
    textAlign: 'center'
  },
  title : {
    color : colorBlue ,
    fontSize : 22 , 
    textAlign: 'center',
    fontWeight : 'bold',
  } , 
  trajet :{
    paddingHorizontal : 10,
    paddingVertical: 25
  },
  trajettitle : {
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight : 'bold',
  },
  flexy : {
    display : 'flex', 
    alignItems : 'center' ,
    textAlign : 'center',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  flexend : {
    display : 'flex', 
    alignItems : 'center' ,
    textAlign : 'center',
    flexDirection : 'row',
    justifyContent : 'flex-end',
    gap: 5
  },
  box : {
    width : '100%' ,
    minHeight : 150 ,
    backgroundColor : colorBlue ,
    borderRadius : 5 ,
    marginVertical : 10 ,
    padding : 20
  } ,
  font : {
    color : colorBlue ,
    fontSize : 27 , 
    textAlign : 'center' , 
    fontWeight : 'bold'
  },
  trajetinfo : {
    fontSize : 18 , 
    textAlign : 'center' , 
  }
  ,
  trajetville : {
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight: 'semibold'
  },
  calendarview: {
    position: 'relative',

  },
  calendaricon: {
    position: 'absolute',
    fontSize: 20,
    paddingLeft: '90%',
    paddingVertical: 10,
    paddingRight: 15,
  },
  close: {
    textAlign:'right',
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeicon: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  closeview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

});
