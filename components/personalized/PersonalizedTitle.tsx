import { colorBlue } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View , Dimensions, ScrollView , Text} from 'react-native';

export function PersonalizedTitle({ title , icon }: PropsWithChildren & { title: string , icon : any}) {
  return (
    <View style={styles.screen}>
        <Ionicons color={colorBlue} size={35} name={icon} />
        <Text style={styles.text}>{title.toLocaleUpperCase()}</Text>
    </View>
  );
}
const w = Dimensions.get('screen').width

const styles = StyleSheet.create({
 screen:{
    display : "flex" ,
    justifyContent : "space-between" , 
    alignItems : "center",
    flexDirection : 'row',
    marginBottom : 10 , 
 }, 
 text : {
    fontSize : 20 , 
    fontWeight : "bold",
    color : colorBlue
 }
});
