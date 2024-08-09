import { colorBlue, colorGreen, colorRed } from '@/constants/Colors';
import useStorage from '@/hooks/useStorage';
import { formatMoney } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import React , {useState,useEffect} from 'react';
import { StyleSheet, Image, Platform , Text , ScrollView , View } from 'react-native';

export default function StatByMonth() {

  const [data , setData] = useState<{month :string , depense : number , revenue : number}[]>()
  const {getLastMonth} = useStorage()
  useEffect(()=>{
    setInterval(()=>{
      getLastMonth().then((res:any)=>{
        setData(res)
      }).catch((err:any)=>{})  
    },1000)
  },[])

    return (
        <View style={styles.box}>
            <Ionicons name='information-circle' color='white' size={28}/>
            <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white' , marginBottom : 8}}>
              Vos revenues et depenses ces derniers mois
            </Text>
            <Text style={{textAlign : 'justify' , fontSize : 18 , marginBottom : 5}}>
              Voici une comparaison de vos revenues et depenses dans les 3 derniers mois :
            </Text>
           {
            data?.map((item:any ,index)=>
            <View key={index} style={styles.petitbox}>
            <View style={styles.aligne}>
              <Ionicons color={colorGreen} name='add-circle' size={25} />
              <Text style={{color : colorGreen , marginLeft : 5 , fontWeight : 'bold'}}>{formatMoney(item.revenue)} ar</Text>              
            </View>
            <View style={styles.aligne}>
              <Ionicons color={colorRed} name='remove-circle' size={25} />
              <Text style={{color : colorRed , marginLeft : 5 , fontWeight : 'bold'}}>{formatMoney(item.depense)} ar</Text>              
            </View>
           </View> 
            )
           }
           
        </View>
    );
};


const styles = StyleSheet.create({
    petitbox : {
     backgroundColor : 'white' ,
     width : '100%',
     padding : 10 ,
     borderRadius : 8 ,
     marginVertical : 4 ,
     display : 'flex',
     alignItems : 'center' ,
     justifyContent : 'space-between', 
     flexDirection : 'row'
    },
     text : {
       fontWeight : 'bold' , 
       fontSize : 18 , 
       color : "white"
     } , 
     flex :{
       display : 'flex' ,
       justifyContent : 'space-between' ,
       alignItems : 'center' , 
       flexDirection : 'row' ,
       marginVertical  :15
     } ,
     flexText : {
       display : 'flex' ,
       alignItems : 'center' , 
       flexDirection : 'row' ,
     },
     flexy : {
       display : 'flex', 
       alignItems : 'center' ,
       flexDirection : 'row',
       marginVertical :2
     },
     box : {
       width : '100%' ,
       minHeight : 150 ,
       backgroundColor : colorBlue ,
       borderRadius : 20 ,
       marginVertical : 10 ,
       padding : 20
     } ,
     aligne : {
       display: 'flex' ,
       flexDirection : 'row' ,
       alignItems : 'center',
       width : '49%'
     }
   });