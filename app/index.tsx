import { StyleSheet, View, Text, ImageBackground, Alert, Button } from 'react-native';
import { Link } from 'expo-router';
import { stylesPerso } from "@/src/styles/GeneralStyles";
import { colorBlue } from "@/constants/Colors";
import Marginer from '../components/personalized/Marginer';
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Calendar } from 'react-native-calendars';

export default function WelcomeScreen() {
 const Bg = '../assets/photo/bg1.jpg'; 

  useEffect(() => {
   
  }, [])

  
  return (
    <View style={styles.container}>
      <ImageBackground source={require(Bg)} style={myhome.imgBg}>
        <View style={myhome.home}>
          <Text style={myhome.title}>
            Reserver des billets de train en ligne
          </Text>
          <Marginer value={20} />  
          <View style={myhome.btn}>
            <Link href='/home' style={stylesPerso.btnSuccess} >C'est parti ! </Link>  
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  btn : {
    paddingHorizontal: 50
  },
  font : {
    color : colorBlue ,
    width: '100%',
    fontSize : 27 , 
    textAlign : 'center' , 
    fontWeight : 'bold'
  },
  container : {
    width : '100%' ,
    height : '100%' ,
    backgroundColor : 'white' ,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
});

const myhome = StyleSheet.create({
  btn: {
    width: '50%',
    marginHorizontal: 'auto'
  },
  acc : {
    width: '100%',
    height : '90%',
  },
  banner : {
    height: 230,
    width : '100%',
    backgroundColor: colorBlue,
    padding : 25,
  } , 
  font : {
    color : '#fff' ,
    fontSize : 22 , 
    textAlign : 'left' , 
    fontWeight : 'bold'
  } , 
  title : {
    color : 'white' ,
    fontSize : 25 , 
    textAlign : 'left' , 
    fontWeight : 'bold',
  } , 
  resrvationtitle : {
    color : '#fff' ,
    fontSize : 16 , 
    marginVertical: 5,
    textAlign : 'left' , 
  } , 
  home :{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0 , 0 , 0 , .2)',
    padding: 25
  },
  imgBg : {
    width: '100%',
    objectFit: 'content',
    height: '100%',
  },
});