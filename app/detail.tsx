import { ActionsForm } from "@/components/personalized/ActionsForm";
import { PersonalizedTitle } from "@/components/personalized/PersonalizedTitle";
import { TransactionDetail } from "@/components/personalized/TransactionDetail";
import { TransactionItem } from "@/components/personalized/TransactionItem";
import useStorage from "@/hooks/useStorage";
import { TransactionType } from "@/src/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function DetailScreen({route} : {route : any}) {

  const [transactions , setTransactions] = useState<TransactionType[]>([])
  const [selectedData , setSelectedData] = useState<TransactionType | null>()
  const [havingSelected , setHavingSelected] = useState<boolean>(false)
  const {getByDate, deleteTransaction} = useStorage()
  const {date} = useLocalSearchParams()

  useEffect(()=>{
    setInterval(()=>{
      getData()
    },1000)
  },[])

  const getData = async()=>{
    if (date) {
      const data = await getByDate(date?.toString())
      setTransactions(data)        
    }
  }

  const selectData = (data : TransactionType)=>{
    setSelectedData(data)
    setHavingSelected(true)
  }

  const deletet = (id : number | undefined)=>{
    setSelectedData(null)
    if(id){deleteTransaction(id)}
    Alert.alert('transaction effacé')
    getData()
    setHavingSelected(false)
  }

  const deselectData = ()=>{
    setSelectedData(null)
    setHavingSelected(false)
  }

  return (
    <View style={styles.container}>
        <PersonalizedTitle title={`${date}`} icon='dashboard'/>
        {
        havingSelected && selectedData && <TransactionDetail deleteItem={deletet} deselect={deselectData} item={selectedData}  />
      }
      {  date && typeof date == 'string'  && <ActionsForm date={date} /> }
        <ScrollView style={{width : '100%' , maxHeight : '50%'}}>
          {
            transactions.map((e:TransactionType , index)=>
            <TransactionItem select={selectData}  key={index} data={e}/>
            )
          }
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    width : '100%' ,
    height : '100%' ,
    backgroundColor : 'white' ,
    padding : 8
  },
  box: {
    backgroundColor : "silver" , 
    borderRadius : 10, 
    width : '100%' ,
    padding : 10 , 
    minHeight : 100 ,
    marginBottom : 10
  },
  head: {
    display : 'flex' ,
    justifyContent : "space-between",
    alignItems : 'center',
    flexDirection : 'row'
  },
});
