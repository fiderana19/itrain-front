import { StyleSheet, View } from 'react-native';
import { PropsWithChildren } from 'react';

export default function Marginer({ value }: PropsWithChildren & { value : any}) {
    const styles = StyleSheet.create({
        box : {
          width : '100%' , 
          height: value
          }
      });

    return (
        <View style={styles.box}>
        </View>
    )
}
