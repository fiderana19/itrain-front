import { colorBlue } from "@/constants/Colors";
import { page, stylesPerso, trajetbox } from "@/src/styles/GeneralStyles";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  Button,
  Pressable,
  Image,
  Alert,
} from "react-native";
import Marginer from "@/components/personalized/Marginer";
import { Controller, useForm } from "react-hook-form";
import useGetAllVille from "@/hooks/api/useGetAllVille";
import usePostVille from "@/hooks/api/usePostVille";
import useEditVile from "@/hooks/api/useEditVille";
import useDeleteVille from "@/hooks/api/useDeleteVille";
import { CreateVilleType, EditVilleType } from "@/types/ville.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { VilleValidation } from "@/validation/ville.validation";

export default function HomeScreen() {
  const { data: villes, isLoading, refetch } = useGetAllVille();
  const { mutateAsync: villeCreate } = usePostVille({
    action() {
      refetch();
    },
  });
  const { mutateAsync: villeEdit } = useEditVile({
    action() {
      refetch();
    },
  });
  const { mutateAsync: villeDelete } = useDeleteVille({
    action() {
      refetch();
    },
  });
  const {
    handleSubmit: submitCreate,
    formState: { errors: create_errors },
    control: create_control,
    setValue: setAddValue,
  } = useForm<CreateVilleType>({
    resolver: yupResolver(VilleValidation),
  });
  const {
    handleSubmit: submitEdit,
    formState: { errors: edit_errors },
    control: edit_control,
    setValue: setEditValue,
    reset,
  } = useForm<EditVilleType>({});
  const [selectedVille, setSelectedVille] = useState<EditVilleType | null>(
    null,
  );

  const [addvisible, setAddVisible] = useState<boolean>(false);
  const [editvisible, setEditVisible] = useState<boolean>(false);
  const Bg = "../../assets/photo/run.jpg";

  useEffect(() => {
    setAddValue("photo_ville", "a");
  }, []);

  const createVille = async (data: CreateVilleType) => {
    await villeCreate(data);
    setAddVisible(false);
  };

  const handleEdit = async (item: EditVilleType) => {
    setSelectedVille(item);
    setEditValue("photo_ville", item?.photo_ville);

    setEditVisible(true);
  };

  const editVille = async (data: EditVilleType) => {
    await villeEdit(data);

    setEditVisible(false);
  };

  const deleteHandler = async (code_ville: string) => {
    Alert.alert("Suppression", "Voulez-vous vraiment supprimer cette ville ?", [
      { text: "Oui", onPress: () => handleDelete(code_ville) },
      { text: "Non", onPress: () => {} },
    ]);
  };

  const handleDelete = async (code_ville: string) => {
    await villeDelete(code_ville);
  };

  return (
    <ScrollView style={stylesPerso.container}>
      <View style={page.paddingnormal}>
        <Marginer value={15} />
        <View style={styles.acc}>
          <Text style={styles.title}>LISTE DES VILLES</Text>
          <Marginer value={15} />
          <View style={styles.btn}>
            <Pressable
              onPress={() => {
                setAddVisible(true);
              }}
              style={stylesPerso.btnDefault}
            >
              <Ionicons name="add-circle" style={stylesPerso.iconfont} />
              <Text>AJOUTER</Text>
            </Pressable>
          </View>
          <Marginer value={15} />
        </View>
        {villes &&
          villes.map((ville: any, index: any) => (
            <View key={index} style={item.item}>
              <Image source={require(Bg)} style={item.bg} />
              <View style={item.descri}>
                <Text style={trajetbox.itembillet}>
                  {" "}
                  {ville?.nom_ville} {ville?.code_ville}{" "}
                </Text>
                <View style={styles.flexend}>
                  <Pressable
                    onPress={() => {
                      handleEdit(ville);
                    }}
                  >
                    <View style={stylesPerso.btnPrimary}>
                      <Ionicons
                        name="pencil-outline"
                        style={stylesPerso.iconfont}
                      />
                      <Text>Modifier</Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      deleteHandler(ville?.code_ville);
                    }}
                  >
                    <View style={stylesPerso.btnDanger}>
                      <Ionicons
                        name="trash-outline"
                        style={stylesPerso.iconfont}
                      />
                      <Text>Supprimer</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

        <Modal animationType="slide" visible={addvisible}>
          <ScrollView style={styles.comptepagescroll}>
            <Pressable
              onPress={() => {
                setAddVisible(false);
              }}
              style={styles.closeview}
            >
              <Ionicons name="close" style={styles.closeicon} />
              <Text style={styles.close}> Fermer</Text>
            </Pressable>
            <Text style={styles.font}>AJOUTER UNE VILLE</Text>
            <Marginer value={5} />
            <View>
              <Text>Code de la ville : </Text>
              <Controller
                name="code_ville"
                control={create_control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {create_errors.code_ville && (
                <Text style={styles.errors}>
                  {create_errors.code_ville.message}
                </Text>
              )}
              <Text>Nom : </Text>
              <Controller
                name="nom_ville"
                control={create_control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {create_errors.nom_ville && (
                <Text style={styles.errors}>
                  {create_errors.nom_ville.message}
                </Text>
              )}
              <Button title="Ajouter" onPress={submitCreate(createVille)} />
            </View>
          </ScrollView>
        </Modal>

        <Modal animationType="slide" visible={editvisible}>
          <ScrollView style={styles.comptepagescroll}>
            <Pressable
              onPress={() => {
                setEditVisible(false);
              }}
              style={styles.closeview}
            >
              <Ionicons name="close" style={styles.closeicon} />
              <Text style={styles.close}> Fermer</Text>
            </Pressable>
            <Text style={styles.font}>MODIFIER VILLE</Text>
            <Marginer value={5} />
            {selectedVille && (
              <View>
                <Text>Code de la ville : </Text>
                <Controller
                  name="code_ville"
                  control={edit_control}
                  defaultValue={selectedVille?.code_ville}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={stylesPerso.inputReal}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {edit_errors.code_ville && (
                  <Text style={styles.errors}>
                    {edit_errors.code_ville.message}
                  </Text>
                )}
                <Text>Nom : </Text>
                <Controller
                  name="nom_ville"
                  control={edit_control}
                  defaultValue={selectedVille?.nom_ville}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={stylesPerso.inputReal}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {edit_errors.nom_ville && (
                  <Text style={styles.errors}>
                    {edit_errors.nom_ville.message}
                  </Text>
                )}
                <Button title="Modifier" onPress={submitEdit(editVille)} />
              </View>
            )}
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errors: {
    marginBottom: 5,
    color: "red",
    textAlign: "left",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
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
    color: "white",
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
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  trajetville: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "semibold",
  },
  comptepage: {
    padding: 50,
  },
  comptepagescroll: {
    padding: 50,
    height: 1000,
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

const item = StyleSheet.create({
  bg: {
    width: "100%",
    objectFit: "cover",
    maxHeight: 150,
  },
  item: {
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    height: 230,
  },
  descri: {
    padding: 10,
    height: "auto",
  },
});
