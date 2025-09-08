import { colorBlue } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View , Text , ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("ett0", isAuthenticated)
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
