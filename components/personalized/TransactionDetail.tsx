import { colorBlue, colorRed } from '@/constants/Colors';
import { TransactionType } from '@/src/types';
import { formatMoney } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View , Dimensions, ScrollView  , Button, Text} from 'react-native';
import { MoneyContainer } from './MoneyContainer';

export function TransactionDetail({ item , deselect , deleteItem }: PropsWithChildren & { item: TransactionType , deselect : ()=>void , deleteItem : (id:number | undefined)=>void }) {
  return (
    <View style={styles.screen}>
        <ScrollView style={styles.box}>
        <View style={styles.head}>
              <Text style={{fontWeight : 'bold'}}>{item.date}</Text>
              <MoneyContainer value={`${formatMoney(item.montant)} ar`} isCredit={item.type == 'revenue'}/>
         </View>
         <View style={{paddingVertical : 8}}>
           <View style={styles.text}>
                  <Text style={{fontWeight : 'bold'}}>Raison : </Text><Text>{item.raison}</Text>
           </View>
         </View>
         <View style={{paddingVertical : 8}}>
            <Text style={{textAlign : 'justify' , minHeight : 100}}>{item.description}</Text>
          </View>
          <View>
              <Button onPress={()=>deleteItem(item.id)}  title='delete' color={colorRed}/>
              <View style={{margin : 5}}></View>
              <Button  title='ok' color={colorBlue}  onPress={deselect}/>
          </View>
        </ScrollView>
    </View>
  );
}
const w = Dimensions.get('screen').width

const styles = StyleSheet.create({
 screen:{
    width : '100%' , 
    height : '100%' ,
    position : 'absolute',
    zIndex : 100 ,
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 10 ,
    backgroundColor : '#ffffffa5'
  },
 box : {
    width : '100%',
    maxHeight : '85%',
    backgroundColor : 'white' , 
    padding : 20 ,
    borderRadius : 20 ,
    borderTopEndRadius : 20
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
