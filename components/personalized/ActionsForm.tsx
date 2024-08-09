import { colorBlue, colorGreen, colorRed } from '@/constants/Colors';
import useStorage from '@/hooks/useStorage';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import { TransactionType } from '@/src/types';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, View ,  TextInput ,  Button , Dimensions, ScrollView , Text, Alert  } from 'react-native';
// import DatePicker from 'react-native-date-picker';
// import DatePicker from 'react-native-datepicker-modal';

export function ActionsForm({date}:{date : string }) {

    const [raison , setRaison] = useState<string>('')
    const [description , setDescription] = useState<string>('')
    const [montant , setMontant] = useState<string>('')
    const [type , setType] = useState<string>('revenue')
    const [jour , setJour] = useState<string>('')
    const [mois , setMois] = useState<string>('')
    const [annee , setAnnee] = useState<string>('')

    const [hasRaisonError , setHasRaisonError] = useState<boolean>(false)
    const [hasDescriptionError , setHasDescriptionError] = useState<boolean>(false)
    const [hasMontantError , setHasMontantError] = useState<boolean>(false)
    const {addTransaction} = useStorage()

    function handleSubmit(){
        const rErr = raison.length < 3
        setHasRaisonError(rErr)
        const dErr = description.length < 3
        setHasDescriptionError(dErr)
        const mErr = !parseInt(montant) || parseInt(montant) < 1000 || montant.length < 3
        setHasMontantError(mErr)
        const isInvalid : boolean = rErr || dErr || mErr
        if (!isInvalid) {
            const data : TransactionType ={
                id : new Date().getTime() , raison , description , date , montant: parseInt(montant) , type
            }
            addTransaction(data)
            Alert.alert('transaction enregistré avec succès')
            setRaison('')
            setDescription('')
            setMontant('')
        }        
    }

    return (
        <View style={styles.box}>
            <View style={styles.flex}>
                <Button title='REVENUES' onPress={()=>setType('revenue')} color={type == 'revenue' ? colorBlue : 'silver'} />
                <Button title='DEPENSES' onPress={()=>setType('depenses')} color={type == 'depenses' ? colorBlue : 'silver'}/>
            </View>
            <TextInput 
                style={stylesPerso.input} 
                placeholder='raison' value={raison} 
                onChangeText={(e : any)=>{
                    setRaison(e)
                    setHasRaisonError(false)
                }} 
                />
            { hasRaisonError && <Text style={styles.error}>raison invalide</Text> }
            <TextInput style={stylesPerso.input} placeholder='description' value={description} onChangeText={setDescription} />
            { hasDescriptionError && <Text style={styles.error}>description invalide</Text> }
            <TextInput 
                style={stylesPerso.input} 
                placeholder='montant' 
                value={montant} 
                keyboardType='numeric'
                onChangeText={(m)=>{
                    if(/^\d+$/.test(m)){
                        setMontant(m)
                    }
                }} />
            { hasMontantError && <Text style={styles.error}>montant invalide</Text> }
            {/* <DatePicker date={date} onDateChange={setDate} /> */}
            <View style={{marginTop : 30 , marginBottom : 10}}>
                <Button title='ajouter' color={colorGreen} onPress={handleSubmit}/>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    date  :{
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row'
    },
    box:{
        width : '100%' , 
        padding : 10 ,
        borderRadius : 10,
        backgroundColor : 'white'
    }
    ,
    flex : {
        display : 'flex' ,
        justifyContent : 'center' ,
        alignItems : 'center' ,
        flexDirection :'row' , 
    } , 
    error : {
        color : 'red' ,
        fontSize : 12
    },
    flexy : {
        display : 'flex' ,
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
        marginTop : 10
    }

  });