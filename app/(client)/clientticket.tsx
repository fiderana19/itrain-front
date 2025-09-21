import Marginer from "@/components/personalized/Marginer";
import { colorBlue } from "@/constants/Colors";
import { page, stylesPerso, trajetbox } from "@/src/styles/GeneralStyles";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";
import useGetReservationByBillet from "@/hooks/api/useGetReservationByBillet";

export default function HomeScreen() {
  const { token } = useAuth();
  const { data: billets } = useGetReservationByBillet(
    token ? JSON.parse(atob(token.split(".")[1])).id : "",
  );

  const generateTicket = async (data: any) => {
    const html = `
      <html>
      <body>
      <div style="padding: 25px;font-weight: normal; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
          <div style="display: flex;justify-content: space-between;">
              <div>
                  <h2 style="color: darkcyan;font-size: 50px; font-weight: bolder;">i-train</h2>
              </div>
              <div style="text-align: right;">
                      <h3 style="font-size: 28px;color: gray;font-weight: 500;">Départ</h3>
                      <h3 style="font-size: 35px;font-weight: 500;">${data.date_trajet}</h3>
              </div>
          </div> 
          <div style="display: flex; justify-content: space-between;margin: 25px 0;">
              <div>
                  <h3 style="font-size: 45px; font-weight: bolder;">${data.heure_depart}</h3>
                  <h3 style="font-size: 28px;font-weight: 500;">${data.gare_depart}</h3>
              </div>
              <div style="font-size: 35px;color: gray;display: flex;flex-direction: column;justify-content: center;"><p>------></p></div>
              <div style="text-align: right;">
                  <h3 style="font-size: 45px; font-weight: bolder;">${data.heure_arrive}</h3>
                  <h3 style="font-size: 28px;font-weight: 500;">${data.gare_arrive}</h3>
              </div>
          </div>
          <div style="display: flex; justify-content: space-between;margin: 25px 0;">
              <div>
                  <h3 style="font-weight: 500;color: gray;font-size: 28px;">TRAIN</h3>
                  <h3 style="font-weight: 500;font-size: 30px;">${data.numero_train}</h3>
              </div>
              <div>
                  <h3  style="font-weight: 500;color: gray;font-size: 28px;">CLASSE</h3>
                  <h3 style="font-weight: 500;font-size: 30px;">${data.classe}</h3>
              </div>
              <div style="text-align: right;">
                  <h3 style="font-weight: 500;color: gray;font-size: 28px;">NOMBRE DE PLACE</h3>
                  <h3 style="font-weight: 500;font-size: 30px;">${data.nbr_place}</h3>
              </div>
          </div>
          <div style="display: flex; justify-content: space-between;margin: 25px 0;">
              <div>
                  <h3  style="font-weight: 500;color: gray;font-size: 28px;">PASSAGER</h3>
                  <h3 style="font-weight: 500;font-size: 30px;">${data.nom}</h3>
              </div>
              <div style="text-align: right;">
                  <h3  style="font-weight: 500;color: gray;font-size: 28px;">TELEPHONE</h3>
                  <h3 style="font-weight: 500;font-size: 30px;">${data.telephone}</h3>
              </div>
          </div>
        </div>
      </body>
      </html>
      `;
    const file = printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync((await file)?.uri);
  };

  const formater = (date: any) => {
    return moment(date).format("YYYY-MM-DD");
  };

  return (
    <ScrollView style={stylesPerso.container}>
      <View style={page.paddingnormal}>
        <Marginer value={15} />
        <View style={styles.acc}>
          <Text style={styles.title}>Mes billets reservés</Text>
          <Marginer value={15} />
        </View>
        {billets &&
          billets.map((trajet: any, index: any) => (
            <View style={trajetbox.item} key={index}>
              <Text style={trajetbox.itemtitle}>
                {trajet.gare_depart} vers {trajet.gare_arrive}
              </Text>
              <Text style={styles.trajetinfo}>
                {formater(trajet.date_trajet)}
              </Text>
              <View style={styles.flexy}>
                <Text style={trajetbox.itemheure}> {trajet.heure_depart}</Text>
                <Text style={trajetbox.itemduree}>
                  ----- {trajet.duree_trajet} ----
                </Text>
                <Text style={trajetbox.itemheure}> {trajet.heure_arrive}</Text>
              </View>
              <View style={styles.flexy}>
                <Text style={trajetbox.itemville}> {trajet.gare_depart}</Text>
                <Text style={trajetbox.itemville}> {trajet.gare_arrive}</Text>
              </View>
              <Text style={trajetbox.itembillet}>{trajet.billet} MGA</Text>
              <Text style={trajetbox.itemtext}>
                Train n° {trajet.numero_train}
              </Text>
              <Text style={trajetbox.itemtextt}>Classe: {trajet.classe}</Text>
              <Text style={trajetbox.itemdispo}>{trajet.nbr_place} places</Text>
              <Text style={trajetbox.itembillet}>
                Montant total: {trajet.billet * trajet.nbr_place} MGA
              </Text>
              <Marginer value={10} />
              <Pressable
                onPress={() => {
                  generateTicket(trajet);
                }}
              >
                <View style={stylesPerso.btnPrimary}>
                  <Ionicons
                    color={"#fff"}
                    name="ticket-outline"
                    style={stylesPerso.iconfont}
                  />
                  <Text style={{ color: "#fff" }}>Generer un billet</Text>
                </View>
              </Pressable>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  comptepage: {
    padding: 50,
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
  acc: {
    width: "100%",
    height: "auto",
    textAlign: "center",
  },
  title: {
    color: colorBlue,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  trajet: {
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  trajettitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  flexy: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexend: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
  box: {
    width: "100%",
    minHeight: 150,
    backgroundColor: colorBlue,
    borderRadius: 5,
    marginVertical: 10,
    padding: 20,
  },
  font: {
    color: colorBlue,
    fontSize: 27,
    textAlign: "center",
    fontWeight: "bold",
  },
  trajetinfo: {
    fontSize: 18,
    textAlign: "center",
  },
  trajetville: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "semibold",
  },
  calendarview: {
    position: "relative",
  },
  calendaricon: {
    position: "absolute",
    fontSize: 20,
    paddingLeft: "90%",
    paddingVertical: 10,
    paddingRight: 15,
  },
  close: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeicon: {
    fontSize: 22,
    fontWeight: "bold",
  },
  closeview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
