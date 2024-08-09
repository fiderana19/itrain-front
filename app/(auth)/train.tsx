import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Modal, TextInput, Button, Pressable, ImageBackground, Image, Alert } from 'react-native';
import axios from 'axios';
import Marginer from '@/components/personalized/Marginer';

export default function HomeScreen() {
  const [trains , setTrains] = useState([])
  const [numero_train, setNumero] = useState("")
  const [capacite, setCapacite] = useState("")
  const [classe, setClasse] = useState("")

  const [edittrain_id, setEditTrainId] = useState("")
  const [editnumero_train, setEditNumero] = useState("")
  const [editcapacite, setEditCapacite] = useState("")
  const [editclasse, setEditClasse] = useState("")

  const [addvisible , setAddVisible] = useState(false)
  const [editvisible , setEditVisible] = useState(false)
  const Bg = '../../assets/photo/train.jpg';  

  useEffect(() => {
    fetchTrain()
    verifyToken()
  }, [])
  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token')

    if(token === '') {
      router.replace('/home')           
    }
  }
  
  const fetchTrain = async () => {
    const token = await AsyncStorage.getItem('token')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'GET',
        url: `http://192.168.43.184:3002/train/`,
      })
        setTrains(response.data)  
        console.log(response.data)   
    } catch (error) {
      console.log(error)
    }
  }

  const submitForm = async (e: any) => {
    const token = await AsyncStorage.getItem('token')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'POST',
        url: `http://192.168.43.184:3002/train/create/`,
        data: { numero_train, capacite, classe }
      })
        console.log(response.data);  
        setNumero("")
        setCapacite("")
        setClasse("")
        fetchTrain()
        setAddVisible(false)    
        Alert.alert("Ajout", "Ajout réussie !", [
          {text: "Ok" , onPress: ()=>{}}
        ])          
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (item: any) => {
    setEditTrainId(item.train_id)
    setEditNumero(item.numero_train)
    setEditCapacite(item.capacite)
    setEditClasse(item.classe)

    console.log(editcapacite)

    setEditVisible(true)
  }

  const submitEditForm = async (e: any) => {
    const token = await AsyncStorage.getItem('token')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'PATCH',
        url: `http://192.168.43.184:3002/train/edit/${ edittrain_id }`,
        data: { numero_train: editnumero_train, capacite: editcapacite, classe: editclasse }
      })
        console.log(response.data);
        console.log(edittrain_id , editnumero_train);
        fetchTrain() 
        setEditVisible(false)  
        Alert.alert("Modification", "Modification réussie !", [
          {text: "Ok" , onPress: ()=>{}}
        ])        
    } catch (error) {
      console.log(error)
    }
  }

  const deleteHandler = async (train: any) => {
    Alert.alert("Suppression", "Voulez-vous vraiment supprimer ce train ?", [
      {text: "Oui", onPress: ()=>handleDelete(train)},
      {text: "Non" , onPress: ()=>{}}
    ])
  }

  const handleDelete = async (train: any) => {
    const token = await AsyncStorage.getItem('token')

    try {
      const response  = await axios({
        headers: {
          Authorization: `Bearer ${ token }`
        },
        method: 'DELETE',
        url: `http://192.168.43.184:3002/train/delete/${ train }`,
      })
      fetchTrain()
      console.log(response.data);
      Alert.alert("Suppression", "Suppression réussie !", [
        {text: "Ok" , onPress: ()=>{}}
      ])          
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}>
          <Marginer value={15} />
          <View style={styles.acc}>
            <Text style={styles.title}>
              LISTE DES TRAINS
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
          { trains && trains.map((train: any, index) => (
          <View key={index} style={item.item}>
            <Image source={require(Bg)} style={item.bg} />
            <View style={item.descri}> 
              <Text style={trajetbox.itembillet}> Train N° { train.numero_train } </Text>
              <Text style={trajetbox.itemville}> Capacite :  { train.capacite } </Text>
              <Text style={trajetbox.itemville}> Classe :  { train.classe } </Text>
              <View style={styles.flexend}>
                <Pressable onPress={()=>{handleEdit(train)}}>
                  <View style={stylesPerso.btnPrimary}>
                    <Ionicons name='pencil-outline' style={stylesPerso.iconfont} />
                    <Text>Modifier</Text>
                  </View>
                </Pressable>
                <Pressable onPress={()=>{deleteHandler(train.train_id)}}>
                  <View style={stylesPerso.btnDanger}>
                    <Ionicons name='trash-outline' style={stylesPerso.iconfont}/>
                    <Text>Supprimer</Text>
                  </View>
                </Pressable>
              </View>
            </View> 
          </View>
          )) }
        </View>

        {/* Modal d'ajout de train */}
        <Modal animationType='slide' visible={addvisible}>
          <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setAddVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
            <Text style={styles.font}>
              AJOUTER UN TRAIN 
            </Text>
            <Marginer value={5} />  
            <View>
              <Text>Numero du train : </Text>
              <TextInput
              style={styles.input}
              value={numero_train}
              onChangeText={(e : any)=>{
                  setNumero(e)
              }} 
              />
              <Text>Capacité : </Text>
              <TextInput
              style={styles.input}
              value={capacite}
              onChangeText={(e : any)=>{
                  setCapacite(e)
              }} 
              />
              <Text>Classe : </Text>
              <TextInput
              style={styles.input}
              value={classe}
              onChangeText={(e : any)=>{
                  setClasse(e)
              }} 
              />
              <Button
              title="Ajouter"
              onPress={submitForm}
              />
            </View>
          </ScrollView>
        </Modal>


        {/* Modal de modification de train */}
        <Modal animationType='slide' visible={editvisible}>
          <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setEditVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
            <Text style={styles.font}>
              MODIFIER TRAIN 
            </Text>
            <Marginer value={5} />  
            <View>
              <Text>Numero du train : </Text>
              <TextInput
              style={styles.input}
              value={editnumero_train}
              onChangeText={(e : any)=>{
                  setEditNumero(e)
              }} 
              />
              <Text>Capacité : </Text>
              <TextInput
              style={styles.input}
              value={editcapacite}
              onChangeText={(e : any)=>{
                  setEditCapacite(e)
              }} 
              />
              <Text>Classe : </Text>
              <TextInput
              style={styles.input}
              value={editclasse}
              onChangeText={(e : any)=>{
                  setEditClasse(e)
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
    color: 'white'
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
    color : 'white' ,
    fontSize : 20 , 
    textAlign : 'center' , 
  }
  ,
  trajetville : {
    color : 'white' ,
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight: 'semibold'
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


const item = StyleSheet.create({
  bg: {
    width: '100%',
    objectFit: 'cover',
    maxHeight: 150,
  },
  item: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    height: 280
  },
  descri: {
    padding: 10,
    height: 'auto'
  }
});
