import { TransactionType } from '@/src/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useStorage(){

    const addTransaction = async (data  : TransactionType)=>{
        const realdata : TransactionType = {
            ...data , id : new Date().getTime()
        }
        let values : TransactionType[] = await getTransactions()
        values.push(realdata)
        AsyncStorage.setItem('app' , JSON.stringify(values))
    }
    const getTransactions= async()=>{
        const values = await AsyncStorage.getItem('app')
        if (!values) return []
        return JSON.parse(values)
    }

    const setLockCode = async (code :string)=>{
        AsyncStorage.setItem('app-code' , code)
    }

    const verifyCode = async (code :string)=>{
        const c = await AsyncStorage.getItem('app-code')
        const valid = code == c ;
        return {valid}
    }

    const getCode = async ()=>{
        return await AsyncStorage.getItem('app-code')
    }

    const getFilter =async (descri : string) => {
        const values : TransactionType[] = await getTransactions()
        return values.filter((e:TransactionType)=>
            e.description.toLocaleLowerCase().includes(descri.toLocaleLowerCase())
        )
    }

    const getByDate = async (date : string)=>{
        const values : TransactionType[] = await getTransactions()
        return values.filter((e:TransactionType)=>
            e.date == date
        )
    }

    const verifyContentByDay = async(date : string)=>{
        const values : TransactionType[] = await getTransactions()
        let hasRevenue : boolean = false , hasDepense : boolean = false
        const f = values.filter((e:TransactionType)=> e.date == date)
        if(f.length == 0) { return {hasDep : false , hasRev : false}}
        f.map((e:TransactionType)=>{
            if (e.type == 'depenses') {
                hasDepense = true
            } else {
                hasRevenue = true                
            }
        })
        return {hasDep : hasDepense , hasRev : hasRevenue}
    }

    const getById = async(id : number)=>{
        const values : TransactionType[] = await getTransactions()
        let found = values.find((item:TransactionType)=> item.id == id)
        return found
    }

    const GetTotal = async()=>{
        const values : TransactionType[] = await getTransactions()
        let tRev : number = 0 , tDep : number = 0
        values.map((item:TransactionType)=>{
            if (item.type == 'depenses') {
                tDep += item.montant
            }else{
                tRev +=  item.montant
            }
        })
        return {total : tRev - tDep}
    }

    const deleteTransaction=async (id : number)=>{
        let values : TransactionType[] = await getTransactions()
        let newvalues = values.filter((item:TransactionType)=> item.id != id )
        AsyncStorage.setItem('app' , JSON.stringify(newvalues))
    }

    const getRecord = async()=>{
        let values : TransactionType[] = await getTransactions()
        let recDepId : number = 0, recRevId : number = 0 , maxRev : number = 0, maxDep  :number = 0
        values.map((item:TransactionType)=>{
            if (item.type == 'depenses' && item.montant > maxDep && item.id) {
                maxDep = item.montant
                recDepId = item.id
            }
            if (item.type == 'revenue' && item.montant > maxRev && item.id) {
                maxRev = item.montant
                recRevId = item.id
            }
        })
        return {revenue : await getById(recRevId) , depense  :await getById(recDepId)}
    }

    const getLastMonth = async ()=>{
        let values : TransactionType[] = await getTransactions()
        let month = new Date().getMonth() + 2, year = new Date().getFullYear()
        let total = []         
        for (let i = month-3; i < month; i++) {
            let rev = 0 , dep = 0 
            values.map((item:TransactionType)=>{                
                const [a , m , j] : string[] = item.date.split('-')                
                if (parseInt(m) == i && parseInt(a) == year ) {
                    if (item.type == 'revenue') {
                        rev += item.montant
                    }else{
                        dep += item.montant
                    }
                }
            })
            total.push({depense : dep , revenue : rev , month : i})
        }
        return total.reverse()
        
    }

    return {addTransaction, verifyContentByDay, getByDate , getFilter, getCode , verifyCode , setLockCode ,getRecord, GetTotal, getTransactions , deleteTransaction , getLastMonth}

}