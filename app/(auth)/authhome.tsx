import Marginer from '@/components/personalized/Marginer';
import { PersonalizedTitle } from '@/components/personalized/PersonalizedTitle';
import { colorBlue } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Button , StyleSheet, View , Text , ScrollView, ImageBackground } from 'react-native';

export default function HomeScreen() {

  useEffect(() => {
    verifyToken()
  }, [])
  const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token')

    if(token === '') {
      router.replace('/home')           
    }
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View>
          <View style={home.acc}>
            <Text style={home.title}>
              BIENVENUE DANS LA PAGE D'ADMINISTRATION
            </Text>
          </View>
        </View>
      </ScrollView>
  );
}

const home = StyleSheet.create({
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
    paddingTop: 250,
  } , 
});
