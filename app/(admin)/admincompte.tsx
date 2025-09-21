import { colorBlue } from "@/constants/Colors";
import { page, stylesPerso, trajetbox } from "@/src/styles/GeneralStyles";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import Marginer from "@/components/personalized/Marginer";
import { Ionicons } from "@expo/vector-icons";
import useGetUserById from "@/hooks/api/useGetUserById";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { token, logout } = useAuth();
  const Profile = "../../assets/photo/man-user-circle-icon.png";
  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUserById(token ? JSON.parse(atob(token.split(".")[1])).id : "");

  async function handleLogout() {
    await logout();

    router.replace("/home");
  }

  return (
    <ScrollView style={stylesPerso.container}>
      {user && (
        <View style={page.paddingnormal}>
          <Marginer value={15} />
          <Text style={styles.userfont}> Les informations du compte </Text>
          <Marginer value={15} />
          <Image source={require(Profile)} style={styles.photo} />
          <Marginer value={25} />
          <Text> Nom : </Text>
          <Text style={styles.userfont}> {user[0].nom} </Text>
          <Text> Telephone : </Text>
          <Text style={styles.userfont}> {user[0].telephone} </Text>
          <Text> Adresse mail : </Text>
          <Text style={styles.userfont}> {user[0].email} </Text>
          <Marginer value={30} />
          <Pressable style={stylesPerso.btnPrimary} onPress={handleLogout}>
            <Ionicons
              color={"#fff"}
              name="log-out"
              style={trajetbox.dispoicon}
            />
            <Text style={{ color: "#fff" }}>Se deconnecter</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  comptepage: {
    padding: 50,
  },
  userinfo: {
    marginTop: 20,
  },
  photo: {
    margin: "auto",
    width: 100,
    height: 100,
    borderColor: "blue",
    borderRadius: 100,
  },
  font: {
    color: colorBlue,
    fontSize: 27,
    textAlign: "center",
    fontWeight: "bold",
  },
  userfont: {
    color: "black",
    fontSize: 18,
    textAlign: "right",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 2,
    borderColor: "grey",
    minWidth: 200,
    textAlignVertical: "center",
    paddingLeft: 10,
    padding: 10,
    borderRadius: 5,
    marginBottom: 7,
    color: "black",
  },
});
