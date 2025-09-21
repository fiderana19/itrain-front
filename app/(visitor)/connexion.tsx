import Marginer from "@/components/personalized/Marginer";
import { colorBlue } from "@/constants/Colors";
import { page, stylesPerso } from "@/src/styles/GeneralStyles";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { LoginUserType } from "@/types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "@/validation/user.validation";

export default function LoginPageScreen() {
  const {
    handleSubmit: submit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });
  const { login } = useAuth();

  const loginSubmit = async (data: LoginUserType) => {
    await login(data);
  };

  return (
    <ScrollView style={stylesPerso.container}>
      <View style={page.paddingnormal}>
        <Marginer value={15} />
        <Text style={styles.font}>SE CONNECTER</Text>
        <Text>Veuillez vous connecter pour pouvoir reserver des billets </Text>
        <Marginer value={20} />
        <View>
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
          {errors.email && (
            <Text style={styles.errors}>{errors.email.message}</Text>
          )}
          <Text>Mot de passe : </Text>
          <Controller
            name="motdepasse"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={stylesPerso.inputReal}
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.motdepasse && (
            <Text style={styles.errors}>{errors.motdepasse.message}</Text>
          )}
          <Marginer value={5} />
          <Button title="Se connecter" onPress={submit(loginSubmit)} />
        </View>
        <Marginer value={40} />
        <Link href="/signup" style={styles.link}>
          <Text> Créer un compte </Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  font: {
    color: colorBlue,
    fontSize: 27,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    paddingLeft: 10,
    padding: 10,
    borderRadius: 5,
    color: "black",
  },
  link: {
    textDecorationLine: "underline",
    textAlign: "center",
  },
  errors: {
    marginBottom: 5,
    color: "red",
    textAlign: "left",
  },
});
