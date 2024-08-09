import { colorBlue } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View , Dimensions, ScrollView , Text} from 'react-native';

export function StatContainer({ icon }: PropsWithChildren & { icon : any}) {
  return (
    <View style={styles.box}>
        <Ionicons color={colorBlue} size={35} name={icon} />
        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum illo ratione consequatur excepturi veritatis dolore ad asperiores temporibus. Ab, impedit?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 box:{
     backgroundColor : colorBlue ,
     padding : 8 ,
     borderRadius : 10
 }, 
 text : {
    fontSize : 20 , 
    fontWeight : "bold",
    color : colorBlue
 }
});
