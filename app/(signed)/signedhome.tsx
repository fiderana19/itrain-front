import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, Pressable } from 'react-native';

export default function HomeScreen() {
  const Manakara = '../../assets/photo/manakara.jpg';
  const Tana = '../../assets/photo/tana.jpg';
  const Antsirabe = '../../assets/photo/antsirabe.jpg';
  const Fianara = '../../assets/photo/fianara.jpg';
  const Bg = '../../assets/photo/soarano.jpg';  

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
      <ScrollView style={home.acc}>
        <ImageBackground source={require(Bg)} style={home.imgBg}>
          <View style={home.home}>
            <Text style={home.title}>
              Je reserve mon billet de train à Madagascar
            </Text>
            <Text style={home.resrvationtitle}>
              Reserver en ligne votre ticket dès maintenant 
            </Text>
            <Marginer value={20} />  
            <View style={home.btn}>
              <Link href="/signedsearch" style={stylesPerso.btnPrimary}>
                RESERVER
              </Link>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <ScrollView style={home.banner}>
        <Text style={home.font}>
          Partez en voyage les mains dans les poches !
        </Text>
      </ScrollView>
      <Marginer value={50} />  
      <ScrollView style={home.discover}>
        <Text style={home.discoverTitle}>
          Decouvrir les destinations disponibles sur l'application
        </Text>
        <Marginer value={5} />
        <View>
          <ScrollView horizontal={true}>
            <ImageBackground source={require(Fianara)} style={home.discoverItem}>
              <View style={home.discoverText}>
                <Text style={home.discoverTextChildren}>Fianarantsoa</Text>
              </View>
            </ImageBackground>

            <ImageBackground source={require(Tana)} style={home.discoverItem}>
              <View style={home.discoverText}>
                <Text style={home.discoverTextChildren}>Antananarivo</Text>
              </View>
            </ImageBackground>

            <ImageBackground source={require(Manakara)} style={home.discoverItem}>
              <View style={home.discoverText}>
                <Text style={home.discoverTextChildren}>Manakara</Text>
              </View>
            </ImageBackground>

            <ImageBackground source={require(Antsirabe)} style={home.discoverItem}>
              <View style={home.discoverText}>
                <Text style={home.discoverTextChildren}>Antsirabe</Text>
              </View>
            </ImageBackground>
          </ScrollView>
        </View>
      </ScrollView>
      <Marginer value={50} />  
    </View>
  </ScrollView>
  );
}

const home = StyleSheet.create({
  btn: {
    width: '50%',
    marginHorizontal: 'auto'
  },
  acc : {
    width: '100%',
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
    color : 'white',
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
  button : {
    padding: 5,
    borderColor: '#000',
    borderWidth: 1,
    textAlign : 'center',
  } ,
  discover : {
    padding: 5,
    height: 'auto'
  },
  discoverTitle: {
    color : colorBlue ,
    fontSize : 22 , 
    textAlign : 'left' , 
    fontWeight : 'bold',
  },
  discoverItem: {
    borderRadius: 5,
    borderWidth: 1,
    width: 300,
    objectFit: 'content',
    height: '100%',
    marginHorizontal: 3,
  },
  home :{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 600,
    backgroundColor: 'rgba(0 , 0 , 0 , .3)',
    padding: 25
  },
  imgBg : {
    width: '100%',
    objectFit: 'content',
    height: '100%',
  },
  discoverText: {
    marginTop: 150,
    height: 40,
    backgroundColor: 'rgba(0 , 0 , 0, .5)',
  },
  discoverTextChildren: {
    color: '#fff',
    fontSize : 18 , 
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontWeight : 'bold',
  }
});