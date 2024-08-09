import { stylesPerso } from '@/src/styles/GeneralStyles';
import { TransactionType } from '@/src/types';
import { formatMoney } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View , Button , Dimensions, ScrollView , Text, TouchableOpacity} from 'react-native';
import { MoneyContainer } from './MoneyContainer';

export function TransactionItem({ data , select}: PropsWithChildren & { data: TransactionType , select : (data : TransactionType)=> void }) {
  
  return (
    <TouchableOpacity onPress={()=>select(data)}>
      <View style={styles.box}>
          <View style={styles.head}>
              <Text style={{fontWeight : 'bold'}}>{data.date}</Text>
              <MoneyContainer value={`${formatMoney(data.montant)} ar`} isCredit={data.type == 'revenue'}/>
          </View>
          <View style={{paddingVertical : 4}}>
              <View style={styles.text}>
                  <Text style={{fontWeight : 'bold'}}>Raison : </Text><Text>{data.raison}</Text>
              </View>
          </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor : "silver" , 
    borderRadius : 10, 
    width : '100%' ,
    padding : 10 ,
    marginBottom : 5
  },
  head: {
    display : 'flex' ,
    justifyContent : "space-between",
    alignItems : 'center',
    flexDirection : 'row'
  },
  text: {
    display : 'flex' ,
    justifyContent : "flex-start",
    alignItems : 'center',
    flexDirection : 'row'
  },
});
