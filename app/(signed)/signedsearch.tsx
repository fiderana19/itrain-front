import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { StyleSheet, View, Text, Button, ScrollView, TextInput, Pressable, Modal, Alert } from 'react-native';
import axios from 'axios'
import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import format from 'date-fns/format'
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function SignupPageScreen() {
  const [trajets , setTrajets] = useState([])
  const [selectdepart, setSelectDepart] = useState("")
  const [selectarrive, setSelectArrive] = useState("")
  const [selectedDate , setSelectedDate] = useState(null);
  const [date_reservation , setDateReservation] = useState(new Date());
  const [show, setShow] = useState(false);

  const [edittrajet_id, setEditTrajetId] = useState("")
  const [editnumero_train, setEditNumeroTrain] = useState("")
  const [editclasse, setEditClasse] = useState("")
  const [editgare_depart, setEditGareDepart] = useState("")
  const [editgare_arrive, setEditGareArrive] = useState("")
  const [editduree_trajet, setEditDuree] = useState("")
  const [editheure_depart, setEditHeureDepart] = useState("")
  const [editheure_arrive, setEditHeureArrive] = useState("")
  const [editbillet, setEditBillet] = useState("")
  const [editdispo, setEditDispo] = useState("")
  const [edittrain_id, setEditTrain_id] = useState("")
  const [editdate_trajet , setEditSelectedDate] = useState(null);
  const [showpanier, setShowPanier] = useState(false)
  const [noItem , setNoItem] = useState(false);

  const [nbrplace, setNbrPlace] = useState("")

  const ville: any = [
    {key: 'Antananarivo', value: "Antananarivo"},
    {key: 'Antsirabe', value: "Antsirabe"},
    {key: 'Fianarantsoa', value: "Fianarantsoa"},
    {key: 'Manakara', value: "Manakara"},
    {key: 'Toamasina', value: "Toamasina"},
  ]

  const submitReserver = async (e: any) => {
    console.log(selectdepart , 'depart' , selectarrive , 'arrive', selectedDate )
    const uid = await AsyncStorage.getItem('uid')
    const curren = moment().format('YYYY-MM-DD')

    console.log( curren, 'date', uid ,'id' , nbrplace , 'nb' , edittrajet_id, 'trajet')
    if(nbrplace > editdispo) {
      Alert.alert("Erreur", "Plus de places disponibles pour ces nombres de place !", [
        {text: 'Ok' , onPress: ()=>{}}
      ])
    } else {
      try {
        const response  = await axios({
          method: 'POST',
          url: `http://192.168.43.184:3002/reservation/create`,
          data: { date_reservation: curren , nbr_place: nbrplace , utilisateur_id: uid, trajet_id: edittrajet_id  }
        })
          console.log(response.data);
          Alert.alert("Reservation", "Reservation réussie !", [
            {text: "Ok" , onPress: ()=>{}}
          ])      
          setShowPanier(false)
          searchTrajet()
          setNoItem(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

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
    } catch (error) {
      console.log(error)
    }
  }

  const showCalendar = () => {
    setShow(true)
  }

  const handleDayPress = (day: any) => {    
    setSelectedDate(day.dateString)

    setShow(false)
  }

  const selectTrajet = async (item: any) => {
    setEditTrajetId(item.trajet_id)
    setEditGareDepart(item.gare_depart)
    setEditGareArrive(item.gare_arrive)
    setEditDuree(item.duree_trajet)
    setEditHeureDepart(item.heure_depart)
    setEditHeureArrive(item.heure_arrive)
    setEditBillet(item.billet)
    setEditTrain_id(item.train_id)
    setEditClasse(item.classe)
    setEditDispo(item.places_disponibles)
    setEditNumeroTrain(item.numero_train)
    setEditSelectedDate(item.date_trajet)

    setShowPanier(true)
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
            style={stylesPerso.cal}
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
          { trajets && trajets.map((trajet: any, index) => (
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
                <Ionicons  name='person' style={trajetbox.dispoicon} />
                <Text>{ trajet.places_disponibles } place(s) disponible(s)</Text>
              </Text>
              <Marginer value={10} />
              <Pressable onPress={() => selectTrajet(trajet)}>
                <Text style={stylesPerso.btnPrimary}>Reserver</Text>
              </Pressable>
            </View>
          )) }
      </View>
          <Modal visible={showpanier} animationType='slide'>
            <ScrollView style={page.paddingnormal}>
              <Pressable onPress={()=>{setShowPanier(false)}} style={styles.closeview}>
                <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
              </Pressable>
              <Text style={trajetbox.itemdispo}>Reservation de billet(s)</Text>
              <View style={trajetbox.item}>
                <Text style={trajetbox.itemtitle}>
                  { editgare_depart } vers { editgare_arrive }
                </Text>
                <Marginer value={10} />
                <Text style={styles.trajetinfo}>
                  { formater(editdate_trajet) }
                </Text>
                <View style={styles.flexy} >
                    <Text style={trajetbox.itemheure}> { editheure_depart }</Text> 
                    <Text style={trajetbox.itemduree}>-----   { editduree_trajet }  ----</Text>
                    <Text style={trajetbox.itemheure}> { editheure_arrive }</Text>
                </View>
                <View style={styles.flexy}>
                  <Text style={trajetbox.itemville}> { editgare_depart }</Text>
                  <Text style={trajetbox.itemville}> { editgare_arrive }</Text>
                </View>
                <Text style={trajetbox.itemtext}>
                Train n°  { editnumero_train }
              </Text>
              <Text style={trajetbox.itemtextt}>
                Classe:   { editclasse }
              </Text>
                <Text style={trajetbox.itembillet}>
                { editbillet } MGA
                </Text>
                <Text style={trajetbox.itemdispo}>
                  <Ionicons name='person' style={trajetbox.dispoicon} />
                  <Text>{editdispo} place(s) disponible(s)</Text>
                </Text>
                <Marginer value={10} />
              </View>
              <Marginer value={10} />
              <Text>Nombre de place : </Text>
              <TextInput
              style={styles.input}
              value={nbrplace}
              onChangeText={(e : any)=>{
                  setNbrPlace(e)
              }} 
              />     

              <Pressable onPress={submitReserver}>
                  <Text style={stylesPerso.btnSuccess}>Valider</Text>
              </Pressable>
       
            </ScrollView>
          </Modal>
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
  textno: {
    fontSize: 20,
    textAlign: 'center'
  },
  iconno: {
    fontSize: 100,
    textAlign: 'center'
  }


});
