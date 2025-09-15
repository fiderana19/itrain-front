import { colorBlue } from '@/constants/Colors';
import { stylesPerso } from '@/src/styles/GeneralStyles';
import { StyleSheet, View , Text , ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
      <ScrollView style={stylesPerso.container}>
        <View>
          <View style={home.acc}>
            <Text style={home.title}>
              BIENVENUE DANS LA PAGE D'ADMINISTRATION
            </Text>
          </View>
        </View>
      </ScrollView>
  );
}

const home = StyleSheet.create({
  acc : {
    width: '100%',
    height : 'auto',
    textAlign: 'center'
  },
  title : {
    color : colorBlue ,
    fontSize : 22 , 
    textAlign: 'center',
    fontWeight : 'bold',
    paddingTop: 250,
  } , 
});
