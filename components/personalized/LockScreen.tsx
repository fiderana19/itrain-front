import { colorBlue } from "@/constants/Colors";
import useStorage from "@/hooks/useStorage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from 'expo-router';

const LockScreen = () => {
    
    const [mdp , setMdp] = useState('')
    const {setLockCode , getCode , verifyCode} = useStorage()
    const navigation = useNavigation()
    const [isHavingCode , setIsHavingCode] = useState<boolean>()
    const router = useRouter();


    useEffect(()=>{
        getCode().then((e:any)=>{
            console.log(e);
            if (e.toString().length > 3) {
                setIsHavingCode(true)
            }else{
                setIsHavingCode(false)
            }
        }).catch((err:any)=>{
            setIsHavingCode(false)
        })
    },[])

    const handlePress = (n : number)=>{
        if (mdp.length >= 3) {
            let newMdp = mdp+ n.toString();
            setMdp(newMdp)
            if (isHavingCode) {
                verifyCode(newMdp).then((e :any)=>{
                    if (e.valid) {
                        router.push('/home')
                    }else{
                        setMdp('')
                    }
                }).catch((err:any)=>{})                    
            }else{
                setLockCode(newMdp).then((e :any)=>{
                    Alert.alert('Mot de passe enregistré!')
                    router.push('/home')
                }).catch((err:any)=>{})    
            }
        }else{
            let newMdp = mdp+ n.toString();
            setMdp(newMdp)                    
        }
    }

    return (
        <View style={{width : '100%' ,  paddingHorizontal : '12%'}}>
                <Text style={{textAlign : 'center' , fontSize : 28 , fontWeight : 'bold'}}>
                    {mdp}
                </Text>
                <View style={styles.flexy}>
                    {
                        [1,1,1,1].map((e:any , index)=>
                        <Ionicons name="at-circle" key={index} size={16}/>                        
                        )
                    }
                </View>
            <View style={{marginVertical : 20}}>
                <Text style={{color : colorBlue , fontSize : 25 , textAlign : 'center'}}>
                {isHavingCode ? 
                    'Le code de deverouillage:' : 
                    'Créer vôtre code :'    
                }
                </Text>
            </View>
            <View style={{width : '100%'}}>
                <View style={styles.flex}>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(1)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>1</Text>    
                    </Pressable>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(2)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>2</Text>    
                    </Pressable>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(3)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>3</Text>    
                    </Pressable>
                </View>
                <View style={styles.flex}>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(4)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>4</Text>    
                    </Pressable>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(5)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>5</Text>    
                    </Pressable>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(6)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>6</Text>    
                    </Pressable>
                </View>
                <View style={styles.flex}>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(7)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>7</Text>    
                    </Pressable>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(8)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>8</Text>    
                    </Pressable>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(9)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>9</Text>    
                    </Pressable>
                </View>
                <View style={styles.flexy}>
                    <Pressable style={styles.nombre} onPress={()=>handlePress(0)}>
                        <Text style={{fontWeight : 'bold' , fontSize : 20 , color : 'white'}}>0</Text>    
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default LockScreen;

  
const styles = StyleSheet.create({
    nombre : {
        backgroundColor : colorBlue ,
        width : 50 , 
        height : 50 , 
        borderRadius : 40 ,
        display : 'flex' ,
        justifyContent : 'center' , 
        alignItems : 'center' ,
        flexDirection : 'row'
    } , 
    flex : {
        display : 'flex' ,
        justifyContent : 'space-around' , 
        alignItems : 'center' ,
        flexDirection : 'row',
        width : '100%' , 
        marginVertical : 10
    },
    flexy : {
        display : 'flex' ,
        justifyContent : 'center' , 
        alignItems : 'center' ,
        flexDirection : 'row',
        width : '100%' , 
        marginVertical : 10
    }
  })
