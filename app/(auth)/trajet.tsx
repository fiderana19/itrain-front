import Marginer from '@/components/personalized/Marginer';
import { PersonalizedTitle } from '@/components/personalized/PersonalizedTitle';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, Button, StyleSheet, View, Text, ScrollView, ImageBackground, Modal, TextInput, Pressable, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {
  const [trajets , setTrajets] = useState([])
  const [gare_depart, setGareDepart] = useState("")
  const [gare_arrive, setGareArrive] = useState("")
  const [duree_trajet, setDuree] = useState("")
  const [heure_depart, setHeureDepart] = useState("")
  const [heure_arrive, setHeureArrive] = useState("")
  const [billet, setBillet] = useState("")
  const [train_id, setTrain_id] = useState("")
  const [date_trajet , setSelectedDate] = useState(null);
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const dt = moment()

  const [edittrajet_id, setEditTrajetId] = useState("")
  const [editgare_depart, setEditGareDepart] = useState("")
  const [editgare_arrive, setEditGareArrive] = useState("")
  const [editduree_trajet, setEditDuree] = useState("")
  const [editheure_depart, setEditHeureDepart] = useState("")
  const [editheure_arrive, setEditHeureArrive] = useState("")
  const [editbillet, setEditBillet] = useState("")
  const [edittrain_id, setEditTrain_id] = useState("")
  const [editdate_trajet , setEditSelectedDate] = useState(null);

  const [addvisible , setAddVisible] = useState(false)
  const [editvisible , setEditVisible] = useState(false)

  useEffect(() => {
    fetchTrajets()

    verifyToken()
  }, [])
  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token')

    if(token === '') {
      router.replace('/home')           
    }
  }

  const showCalendar = () => {
    setShow(true)
  }

  const handleDayPress = (day: any) => {    
    setSelectedDate(day.dateString)

    setShow(false)
  }

  const showEditCalendar = () => {
    setEditShow(true)
  }

  const handleEditDayPress = (day: any) => {    
    setEditSelectedDate(day.dateString)

    setEditShow(false)
  }
  
  const fetchTrajets = async () => {
    const token = await AsyncStorage.getItem('token')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'GET',
        url: `http://192.168.43.184:3002/trajet/`,
      })
      console.log(response.data)
        setTrajets(response.data)     
    } catch (error) {
      console.log(error)
    }
  }

  const submitForm = async (e: any) => {
    const token = await AsyncStorage.getItem('token')
    console.log(date_trajet)

    if(train_id !== '' ) {
      try {
        const response  = await axios({
          headers: {
            Authorization: `Bearer ${ token }`
          },
          method: 'POST',
          url: `http://192.168.43.184:3002/trajet/create/`,
          data: { date_trajet, gare_depart, gare_arrive, duree_trajet, heure_depart, heure_arrive, billet, train_id }
        })
          console.log(response.data);  
          setGareDepart("")  
          setGareArrive("")  
          setDuree("")
          setHeureDepart("")
          setHeureArrive("")
          setBillet("")
          setTrain_id("") 
          setSelectedDate(null)   
          fetchTrajets()
          setAddVisible(false)    
          Alert.alert("Ajout", "Ajout réussie !", [
            {text: "Ok" , onPress: ()=>{}}
          ])              
      } catch (error) {
        console.log(error)
      }  
    } else {
      console.log('erreur')
    }

  }

  const submitEditForm = async (e: any) => {
    const token = await AsyncStorage.getItem('token')
    console.log(edittrajet_id,{ date_trajet: editdate_trajet, gare_depart: editgare_depart, gare_arrive: editgare_arrive, duree_trajet: editduree_trajet, heure_depart: editheure_depart, heure_arrive: editheure_arrive, billet: editbillet, train_id: edittrain_id })

      try {
        const response  = await axios({
          headers: {
            Authorization: `Bearer ${ token }`
          },
          method: 'PATCH',
          url: `http://192.168.43.184:3002/trajet/edit/${ edittrajet_id }`,
          data: { date_trajet: editdate_trajet, gare_depart: editgare_depart, gare_arrive: editgare_arrive, duree_trajet: editduree_trajet, heure_depart: editheure_depart, heure_arrive: editheure_arrive, billet: editbillet, train_id: edittrain_id }
        })
          console.log(response.data);  
          fetchTrajets()
          setEditVisible(false)     
          Alert.alert("Modification", "Modification réussie !", [
            {text: "Ok" , onPress: ()=>{}}
          ])           
      } catch (error) {
        console.log(error)
      }  

  }

  const handleEdit = async (item: any) => {
    setEditTrajetId(item.trajet_id)
    setEditGareDepart(item.gare_depart)
    setEditGareArrive(item.gare_arrive)
    setEditDuree(item.duree_trajet)
    setEditHeureDepart(item.heure_depart)
    setEditHeureArrive(item.heure_arrive)
    setEditBillet(item.billet)
    setEditTrain_id(item.train_id)
    setEditSelectedDate(item.date_trajet)

    setEditVisible(true)
  }

  const deleteHandler = async (trajet: any) => {
    Alert.alert("Suppression", "Voulez-vous vraiment supprimer ce train ?", [
      {text: "Oui", onPress: ()=>handleDelete(trajet)},
      {text: "Non" , onPress: ()=>{}}
    ])
  }

  const handleDelete = async (trajet: any) => {
    const token = await AsyncStorage.getItem('token')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'DELETE',
        url: `http://192.168.43.184:3002/trajet/delete/${ trajet }`,
      })
      console.log(response.data);
      Alert.alert("Suppression", "Supression réussie !", [
        {text: "Ok" , onPress: ()=>{}}
      ])          
    } catch (error) {
      console.log(error)
    }
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
              LISTE DES TRAJETS
            </Text>
            <Marginer value={15} />
            <View style={styles.btn}>
              <Pressable onPress={()=>{setAddVisible(true)}} style={ stylesPerso.btnDefault }>
                <Ionicons name='add-circle' style={stylesPerso.iconfont} />
                <Text>AJOUTER</Text>
              </Pressable>
            </View>
            <Marginer value={15} />
          </View>
          { trajets && trajets.map((trajet: any, index) => (
            <View style={trajetbox.item} key={index}>
              <Text style={trajetbox.itemtitle}>
                { trajet.gare_depart } vers  { trajet.gare_arrive }
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
              <Text style={trajetbox.itemtrain}>
                Train n°  { trajet.train_id }
              </Text>
              <Text style={trajetbox.itembillet}>
                { trajet.billet } MGA
              </Text>
              <Marginer value={10} />
              <View style={styles.flexend}>
                <Pressable onPress={()=>{handleEdit(trajet)}}>
                  <View style={stylesPerso.btnPrimary}>
                    <Ionicons name='pencil-outline' style={stylesPerso.iconfont} />
                    <Text>Modifier</Text>
                  </View>
                </Pressable>
                <Pressable onPress={()=>{deleteHandler(trajet.trajet_id)}}>
                  <View style={stylesPerso.btnDanger}>
                    <Ionicons name='trash-outline' style={stylesPerso.iconfont}/>
                    <Text>Supprimer</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )) }
        </View>

        {/* Modal d'ajout de trajet */}
        <Modal animationType='slide' visible={addvisible}>
        <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setAddVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
          <Text style={styles.font}>
            AJOUTER UNE TRAJET
          </Text>
          <Marginer value={15} />  
          <View>
            <Text>Date du trajet : </Text>
            <View style={styles.calendarview}>
              <Ionicons  name='calendar' style={styles.calendaricon} onPress={showCalendar} /> 
              <TextInput
              style={styles.input}
              value={(date_trajet) ? (date_trajet) : 'Selectionner une date'}
              />
            </View>
            {show && (
            <Calendar
            onDayPress={handleDayPress}
            style={stylesPerso.cal}
            />
            )}
            <Text>Gare de depart : </Text>
            <TextInput
            style={styles.input}
            value={gare_depart}
            onChangeText={(e : any)=>{
                setGareDepart(e)
            }} 
            />
            <Text>Gare d'arrivé : </Text>
            <TextInput
            style={styles.input}
            value={gare_arrive}
            onChangeText={(e : any)=>{
                setGareArrive(e)
            }} 
            />
            <Text>Durée du trajet : </Text>
            <TextInput
            style={styles.input}
            value={duree_trajet}
            onChangeText={(e : any)=>{
                setDuree(e)
            }} 
            />
            <Text>Heure de depart : </Text>
            <TextInput
            style={styles.input}
            value={heure_depart}
            onChangeText={(e : any)=>{
                setHeureDepart(e)
            }} 
            />
            <Text>Heure d'arrivé : </Text>
            <TextInput
            style={styles.input}
            value={heure_arrive}
            onChangeText={(e : any)=>{
                setHeureArrive(e)
            }} 
            />
            <Text>Billet : </Text>
            <TextInput
            style={styles.input}
            value={billet}
            onChangeText={(e : any)=>{
                setBillet(e)
            }} 
            />
            <Text>Train : </Text>
            <TextInput
            style={styles.input}
            value={train_id}
            onChangeText={(e : any)=>{
                setTrain_id(e)
            }} 
            />

            <Button
            title="Ajouter"
            onPress={submitForm}
            />
          </View>
        </ScrollView>
        </Modal>

        {/* Modal de modification de trajet */}
        <Modal animationType='slide' visible={editvisible}>
        <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setEditVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
          <Text style={styles.font}>
            MODIFIER TRAJET
          </Text>
          <Marginer value={5} />  
          <View>
            <Text>Date du trajet : </Text>
            <View style={styles.calendarview}>
              <Ionicons  name='calendar' style={styles.calendaricon} onPress={showEditCalendar} /> 
              <TextInput
              style={styles.input}
              value={(editdate_trajet) ? (editdate_trajet) : 'Selectionner une date'}
              />
            </View>
            {editshow && (
            <Calendar
            onDayPress={handleEditDayPress}
            style={stylesPerso.cal}
            />
            )}
            <Text>Gare de depart : </Text>
            <TextInput
            style={styles.input}
            value={editgare_depart}
            onChangeText={(e : any)=>{
                setEditGareDepart(e)
            }} 
            />
            <Text>Gare d'arrivé : </Text>
            <TextInput
            style={styles.input}
            value={editgare_arrive}
            onChangeText={(e : any)=>{
                setEditGareArrive(e)
            }} 
            />
            <Text>Durée du trajet : </Text>
            <TextInput
            style={styles.input}
            value={editduree_trajet}
            onChangeText={(e : any)=>{
                setEditDuree(e)
            }} 
            />
            <Text>Heure de depart : </Text>
            <TextInput
            style={styles.input}
            value={editheure_depart}
            onChangeText={(e : any)=>{
                setEditHeureDepart(e)
            }} 
            />
            <Text>Heure d'arrivé : </Text>
            <TextInput
            style={styles.input}
            value={editheure_arrive}
            onChangeText={(e : any)=>{
                setEditHeureArrive(e)
            }} 
            />
            <Text>Billet : </Text>
            <TextInput
            style={styles.input}
            value={editbillet}
            onChangeText={(e : any)=>{
                setEditBillet(e)
            }} 
            />
            <Text>Train : </Text>
            <TextInput
            style={styles.input}
            value={edittrain_id}
            onChangeText={(e : any)=>{
                setEditTrain_id(e)
            }} 
            />

            <Button
            title="Modifier"
            onPress={submitEditForm}
            />
          </View>
        </ScrollView>
        </Modal>

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
  comptepagescroll : {
    padding: 50,
    height: 1000
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
    fontSize : 24 , 
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
    paddingLeft: '85%',
    paddingVertical: 15,
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

});
