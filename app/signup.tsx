import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso } from '@/src/styles/GeneralStyles';
import { StyleSheet, View , Text , Button , ScrollView , TextInput } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { LoginUserType, SignupUserType } from '@/types/user.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupValidation } from '@/validation/user.validation';
import useSignup from '@/hooks/api/useSignup';
import { useAuth } from '../context/AuthContext';
import { HTTP_STATUS } from '@/constants/HttpStatus';

export default function SignupPageScreen() {
  const { handleSubmit: submitSignup, formState: { errors }, control } = useForm<SignupUserType>({
    resolver: yupResolver(SignupValidation)
  });
  const { mutateAsync: signupUser } = useSignup({action() {
  },});
  const { login } = useAuth();

  const handleSignup = async (data: SignupUserType) => {
    const response = await signupUser(data);
    if(response?.status === HTTP_STATUS.CREATED) {
      const loginData: LoginUserType = {
        email: data?.email,
        motdepasse: data?.motdepasse
      };

      await login(loginData);
    }
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}> 
          <Text style={styles.font}>
            CREER UN COMPTE
          </Text>
          <Marginer value={10} />  
          <View>
            <Text>Nom d'utilisateur : </Text>
            <Controller 
              name="nom"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={stylesPerso.inputReal}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />            
            {errors.nom && <Text style={styles.errors}>{errors.nom.message}</Text>}
            <Text>Adresse mail : </Text>
            <Controller 
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={stylesPerso.inputReal}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />        
            {errors.email && <Text style={styles.errors}>{errors.email.message}</Text>}
            <Text>Telephone : </Text>
            <Controller 
              name="telephone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={stylesPerso.inputReal}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />            
            {errors.telephone && <Text style={styles.errors}>{errors.telephone.message}</Text>}
            <Text>Mot de passe : </Text>
            <Controller 
              name="motdepasse"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={stylesPerso.inputReal}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />            
            {errors.motdepasse && <Text style={styles.errors}>{errors.motdepasse.message}</Text>}
            <Button
              title="Creer"
              onPress={submitSignup(handleSignup)}
            />
          </View>
          <Marginer value={50} />  
          <Link href='/connexion' style={styles.link}><Text> Vous avez deja un compte ? Se connecter</Text></Link>
        </View>
        <Marginer value={50} />  
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  comptepage : {
    padding: 50
  },
  font : {
    color : colorBlue ,
    fontSize : 27 , 
    textAlign : 'center' , 
    fontWeight : 'bold'
  },
  input: {
    borderWidth: 2,
    borderColor: 'grey',
    minWidth: 200,
    textAlignVertical: 'center',
    paddingLeft: 10,
    padding: 10,
    borderRadius: 5,
    marginBottom: 7,
    color: "black"
  },
  link: {
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  errors: {
    marginBottom: 5,
    color: 'red',
    textAlign: "left"
  }
});
