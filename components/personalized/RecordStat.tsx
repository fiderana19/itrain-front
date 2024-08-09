import { colorBlue } from '@/constants/Colors';
import useStorage from '@/hooks/useStorage';
import { TransactionType } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform , Text , ScrollView , View } from 'react-native';
import { TransactionItem } from './TransactionItem';

export default function RecordStat() {
  const {getRecord} = useStorage()
  const [records , setRecords] = useState<{revenue : TransactionType , depense : TransactionType}>()
  useEffect(()=>{
    setInterval(()=>{
      getRecord().then((e:any)=>{
        setRecords(e)
      }).catch((err:any)=>{})
    },1000)
  },[])

    return (
        <View style={styles.box}>
            <Ionicons name='information-circle' color='white' size={28}/>
            <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white' , marginBottom : 8}}>
              Les records de depenses et revenues 
            </Text>
            {records?.revenue &&
            <TransactionItem 
            data={{
              date : records?.revenue.date ,description : '' , 
              montant : records?.revenue.montant , type : 'revenue' , raison : records?.revenue.raison
            }}
            select={()=>{}}
            />}
            { records?.depense &&
            <TransactionItem 
            data={{
              date : records?.depense.date ,description : '' , 
              montant : records?.depense.montant , type : 'depenses' , raison : records?.depense.raison
            }}
            select={()=>{}}
            />}
        </View>
    )
}
const styles = StyleSheet.create({
  box : {
    width : '100%' ,
    minHeight : 150 ,
    backgroundColor : colorBlue ,
    borderRadius : 20 ,
    marginVertical : 10 ,
    padding : 20
  }
});