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
import { useAuth } from "../../context/AuthContext";
import useGetUserById from "@/hooks/api/useGetUserById";

export default function HomeScreen() {
  const { token, logout } = useAuth();
  const { data: user, isLoading } = useGetUserById(
    token ? JSON.parse(atob(token.split(".")[1])).id : "",
  );
  const Profile = "../../assets/photo/man-user-circle-icon.png";

  const handleLogout = async () => {
    await logout();

    router.replace("/home");
  };

  return (
    <ScrollView style={stylesPerso.container}>
      <View style={page.paddingnormal}>
        <Marginer value={15} />
        <Text style={styles.userfont}> Les informations du compte </Text>
        {isLoading && (
          <View>
            <Ionicons name="wifi-outline" style={styles.loading} />
          </View>
        )}
        {user && (
          <View>
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
              <Text style={{ color: "#fff", marginLeft: 10 }}>
                Se deconnecter
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    fontSize: 55,
    textAlign: "center",
    marginVertical: 25,
  },
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
