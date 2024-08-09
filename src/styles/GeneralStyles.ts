import { StyleSheet , Dimensions} from 'react-native';


const w = Dimensions.get('screen').width
const h = Dimensions.get('screen').height

export const stylesPerso = StyleSheet.create({
    container: {
        width : '100%' ,
        minHeight : '100%',
    },
    input : {
        padding : 5 ,
        fontSize : 15, 
        borderColor : 'skyblue',
        marginTop : 20 , 
        borderWidth : 1
    },
    iconfont: {
        fontSize: 20,
        marginRight: 5,
    },
    inputReal: {
        borderWidth: 2,
        borderColor: 'grey',
        minWidth: 200,
        textAlignVertical: 'center',
        paddingLeft: 10,
        padding: 8,
        borderRadius: 5,
        marginBottom: 7,
        color: "black"
    },
    inputError: {
        borderWidth: 2,
        borderColor: 'red',
        minWidth: 200,
        textAlignVertical: 'center',
        paddingLeft: 10,
        padding: 8,
        borderRadius: 5,
        marginBottom: 7,
        color: "black"
    },
    btnDefault : {
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: '600',
        fontSize: 17,
        borderRadius: 2,
        borderColor: 'black',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    btnPrimary : {
        backgroundColor: '#26a0d8',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: '600',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
    ,
    btnSuccess : {
        backgroundColor: '#20a34c',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 2,
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDanger : {
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontWeight: '600',
        fontSize: 20,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box : {
        width : '100%' ,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius : 5 ,
        marginVertical : 10 ,
        color: 'black',
        padding : 20
      } ,
      cal: {
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 25
      }
    
  });

export const page = StyleSheet.create({
    paddingnormal: {
        paddingHorizontal: 15,
        paddingVertical: 30
    } 
});
export const trajetbox = StyleSheet.create({
    item: {
        shadowColor: 'grey',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: .3,
        shadowRadius: 3,
        marginVertical: 5,
        padding: 13,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: 'white'   ,     
    },
    itemtitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#19d68e'
    },
    itemheure: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#252741'
    },
    itemduree: {
        fontSize: 14,
        color: 'grey'
    },
    itemville: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#252741'
    },
    itemtrain: {
        fontSize: 20,
        fontWeight: 'semibold',
        textAlign: 'center',
        color: '#252741'
    },
    itembillet: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#252741'
    },
    itemdispo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#252741',
        display: 'flex',
        flexDirection: 'row'
    },
    dispoicon: {
        fontSize: 20,
    },
    itemtext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#252741',
        display: 'flex',
        flexDirection: 'row'
    },
    itemtextt: {
        fontSize: 18,
        color: '#252741',
        display: 'flex',
        flexDirection: 'row'
    },
});