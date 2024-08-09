import { colorGreen, colorRed } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View , Button , Dimensions, ScrollView , Text} from 'react-native';

export function MoneyContainer({ value , isCredit }: PropsWithChildren & { value: string , isCredit : boolean }) {
const styles = StyleSheet.create({
    badge:{
        backgroundColor : isCredit ? colorGreen : colorRed,
        borderRadius : 30 ,
        color: 'white',
        fontSize :17 ,
        fontWeight : 'bold',
        paddingHorizontal : 8 ,
        paddingVertical : 1
    }
});
    return (
    <Text style={styles.badge}>
        {value}
    </Text>
  );

  
}

