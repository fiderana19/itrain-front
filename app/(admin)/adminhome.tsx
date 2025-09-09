import { colorBlue } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View , Text , ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("ett0", isAuthenticated)
    verifyToken()

    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
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
