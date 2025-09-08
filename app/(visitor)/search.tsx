import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { StyleSheet, View , Text , Button , ScrollView , TextInput } from 'react-native';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';
import moment from 'moment';

export default function SignupPageScreen() {
  const [trajets , setTrajets] = useState([])
  const [selectdepart, setSelectDepart] = useState("")
  const [selectarrive, setSelectArrive] = useState("")
  const [selectedDate , setSelectedDate] = useState(null);
  const [noItem , setNoItem] = useState(false);
  const [show, setShow] = useState(false);
  const ville: any = [
    {key: 'Antananarivo', value: "Antananarivo"},
    {key: 'Antsirabe', value: "Antsirabe"},
    {key: 'Fianarantsoa', value: "Fianarantsoa"},
    {key: 'Manakara', value: "Manakara"},
    {key: 'Toamasina', value: "Toamasina"},
  ]
  useEffect(() => {

  }, [])


  const searchTrajet = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(selectdepart , 'depart' , selectarrive , 'arrive', selectedDate )

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'POST',
        url: `http://192.168.43.184:3002/trajet/search`,
        data: {depart: selectdepart, arrive: selectarrive, date: selectedDate }
      })
      console.log(response.data)
      setTrajets(response.data)
        setNoItem(true)
    } catch (error) {
      console.log(error, 'eto') 
    }
  }

  const showCalendar = () => {
    setShow(true)
  }

  const handleDayPress = (day: any) => {    
    setSelectedDate(day.dateString)

    setShow(false)
  }

  const formater = (date: any) => {
    return moment(date).format('YYYY-MM-DD')
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}>
        <Marginer value={15} />   
          <Text style={styles.font}>
            RECHERCHER UN TRAJET
          </Text>
          <Marginer value={15} />  
          <View>
            <Text>Gare de depart : </Text>
            <SelectList 
              data={ville}
              setSelected={setSelectDepart}
              searchPlaceholder='Saisir la ville'
              placeholder='Gare de depart'
              boxStyles={{borderRadius:5,paddingVertical:10}}
             />
             <Marginer value={5} />
            <Text>Gare d'arrivé : </Text>
            <SelectList 
              data={ville}
              setSelected={setSelectArrive}
              searchPlaceholder="Saisir la ville"
              placeholder="Gare d'arrivé"
              boxStyles={{borderRadius:5,paddingVertical:10}}
             />
            <Marginer value={5} />

            <Text>Date : </Text>
            <View style={styles.calendarview}>
              <Ionicons  name='calendar' style={styles.calendaricon} onPress={showCalendar} /> 
              <TextInput
              style={styles.input}
              value={(selectedDate) ? (selectedDate) : 'Selectionner une date'}
              />
            </View>
            {show && (
            <Calendar
            onDayPress={handleDayPress}
            style={styles.cal}
            />
            )}
            <Button
            title="Rechercher"
            onPress={searchTrajet}
            />
          </View>
          <Marginer value={50} />  
          {noItem && trajets.length === 0 ? <View>
            <Ionicons style={styles.iconno} name='close' />
            <Text style={styles.textno}>Pas de trajets disponibles</Text>
          </View>: <></>}
          {trajets && trajets.map((trajet: any, index) => (
            <View style={trajetbox.item} key={index}>
              <Text style={trajetbox.itemtitle}>
                { trajet.gare_depart } vers { trajet.gare_arrive }
              </Text>
              <Marginer value={10} />
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
              <Text style={trajetbox.itemtext}>
                Train n°  { trajet.numero_train }
              </Text>
              <Text style={trajetbox.itemtextt}>
                Classe:   { trajet.classe }
              </Text>
              <Text style={trajetbox.itembillet}>
                { trajet.billet } MGA
              </Text>
              <Text style={trajetbox.itemdispo}>
                <Ionicons name='person' style={trajetbox.dispoicon} />
                <Text>{ trajet.places_disponibles } place(s) disponible(s)</Text>
              </Text>
              <Marginer value={10} />
              <Link href='/connexion' style={stylesPerso.btnPrimary}>
                    <Text>Reserver</Text>
              </Link>
            </View>
          )) }
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  comptepage : {
    paddingVertical: 50,
    paddingHorizontal: 15
  },
  box : {
    width : 'auto' ,
    marginHorizontal: 15,
    minHeight : 150 ,
    backgroundColor : colorBlue ,
    borderRadius : 5 ,
    marginVertical : 10 ,
    padding : 20
  } ,
  flexy : {
    display : 'flex', 
    alignItems : 'center' ,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  trajettitle : {
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight : 'bold',
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
    zIndex: 500
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
  cal: {
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 25
  },
  textno: {
    fontSize: 20,
    textAlign: 'center'
  },
  iconno: {
    fontSize: 100,
    textAlign: 'center'
  }
});
