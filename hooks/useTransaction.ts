import {useState, useEffect} from 'react'
import Realm from 'realm'
import { TransactionType } from '@/src/types'

const transactionSchema ={
    name : 'Transaction' ,
    properties :{
        id : 'int' ,
        raison : 'string',
        type: 'string' ,
        date : 'string',
        description : 'string' ,
        montant : 'int'
    },
    primaryKey : 'id'
}


export default function useTransaction(){
    const [realm , setRealm] = useState<Realm>()
    useEffect(()=>{
        const openRealm = async() =>{
            const realInst = await Realm.open({schema : [transactionSchema]})
            setRealm(realInst)
        }

        openRealm()

        return ()=>{
            if (realm !== null && !realm?.isClosed) {
                realm?.close()
            }
        }
    },[])

    const addTransaction = (item : TransactionType)=>{
        if (realm) {
            realm.write(()=>{
                realm.create('Transaction', item)
            })
        }
    }

    const getTransactions = ()=>{
        if (realm) {
            return realm.objects('Transaction')
        }
        return []
    }

    const deleteTransaction = (id : number)=>{
        if (realm) {
            realm.write(()=>{
                let t = realm.objectForPrimaryKey('Transaction' ,id)
                if (t) {
                    realm.delete(t)
                }
            })
        }
    }   

    return {addTransaction , getTransactions , deleteTransaction}

}