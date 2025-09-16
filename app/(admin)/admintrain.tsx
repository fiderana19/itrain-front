import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Modal, TextInput, Button, Pressable, Image, Alert } from 'react-native';
import Marginer from '@/components/personalized/Marginer';
import useGetAllTrain from '@/hooks/api/useGetAllTrain';
import { Controller, useForm } from 'react-hook-form';
import { CreateTrainType, EditTrainType } from '@/types/train.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateTrainValidation, EditTrainValidation } from '@/validation/train.validation';
import usePostTrain from '@/hooks/api/usePostTrain';
import useEditTrain from '@/hooks/api/useEditTrain';
import useDeleteTrain from '@/hooks/api/useDeleteTrain';

export default function HomeScreen() {
  const { data: trains, isLoading, refetch } = useGetAllTrain();
  const { mutateAsync: trainCreate } = usePostTrain({action() {
    refetch();
  },});
  const { mutateAsync: trainEdit } = useEditTrain({action() {
    refetch();
  },});
  const { mutateAsync: trainDelete } = useDeleteTrain({action() {
    refetch();
  },})
  const { handleSubmit: submitCreate, formState: { errors: create_errors }, control: create_control } = useForm<CreateTrainType>({
    resolver: yupResolver(CreateTrainValidation)
  })
  const { handleSubmit: submitEdit, formState: { errors: edit_errors }, control: edit_control, setValue: setEditValue, reset } = useForm<EditTrainType>({
    resolver: yupResolver(EditTrainValidation)
  })
  const [selectedTrain, setSelectedTrain] = useState<EditTrainType | null>(null);

  const [addvisible , setAddVisible] = useState<boolean>(false)
  const [editvisible , setEditVisible] = useState<boolean>(false)
  const Bg = '../../assets/photo/train.jpg';  

  const createTrain = async (data: CreateTrainType) => {
    await trainCreate(data);
    setAddVisible(false);
  }

  const handleEdit = async (item: EditTrainType) => {
    setSelectedTrain(item);
    setEditValue('train_id', item?.train_id);

    setEditVisible(true)
  }

  const editTrain = async (data: EditTrainType) => {
    await trainEdit(data);

    setEditVisible(false);
  }

  const deleteHandler = async (train: string) => {
    Alert.alert("Suppression", "Voulez-vous vraiment supprimer ce train ?", [
      {text: "Oui", onPress: ()=>handleDelete(train)},
      {text: "Non" , onPress: ()=>{}}
    ])
  }

  const handleDelete = async (train: string) => {
    await trainDelete(train);
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}>
          <Marginer value={15} />
          <View style={styles.acc}>
            <Text style={styles.title}>
              LISTE DES TRAINS
            </Text>
            <Marginer value={15} />
            <View style={styles.btn}>
              <Pressable onPress={()=>{setAddVisible(true)}} style={ stylesPerso.btnDefault }>
                <Ionicons name='add-circle' style={stylesPerso.iconfont} />
                <Text>AJOUTER</Text>
              </Pressable>
            </View>
            <Marginer value={15} />
          </View>
          { trains && trains.map((train: any, index: any) => (
          <View key={index} style={item.item}>
            <Image source={require(Bg)} style={item.bg} />
            <View style={item.descri}> 
              <Text style={trajetbox.itembillet}> Train N° { train.numero_train } </Text>
              <Text style={trajetbox.itemville}> Capacite :  { train.capacite } </Text>
              <Text style={trajetbox.itemville}> Classe :  { train.classe } </Text>
              <View style={styles.flexend}>
                <Pressable onPress={()=>{handleEdit(train)}}>
                  <View style={stylesPerso.btnPrimary}>
                    <Ionicons name='pencil-outline' style={stylesPerso.iconfont} />
                    <Text>Modifier</Text>
                  </View>
                </Pressable>
                <Pressable onPress={()=>{deleteHandler(train.train_id)}}>
                  <View style={stylesPerso.btnDanger}>
                    <Ionicons name='trash-outline' style={stylesPerso.iconfont}/>
                    <Text>Supprimer</Text>
                  </View>
                </Pressable>
              </View>
            </View> 
          </View>
          )) }
        </View>

        {/* Modal d'ajout de train */}
        <Modal animationType='slide' visible={addvisible}>
          <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setAddVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
            <Text style={styles.font}>
              AJOUTER UN TRAIN 
            </Text>
            <Marginer value={5} />  
            <View>
              <Text>Numero du train : </Text>
              <Controller 
                name="numero_train"
                control={create_control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {create_errors.numero_train && <Text style={styles.errors}>{create_errors.numero_train.message}</Text>}
              <Text>Capacité : </Text>
              <Controller 
                name="capacite"
                control={create_control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {create_errors.capacite && <Text style={styles.errors}>{create_errors.capacite.message}</Text>}
              <Text>Classe : </Text>
              <Controller 
                name="classe"
                control={create_control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {create_errors.classe && <Text style={styles.errors}>{create_errors.classe.message}</Text>}
              <Button
              title="Ajouter"
              onPress={submitCreate(createTrain)}
              />
            </View>
          </ScrollView>
        </Modal>

        {/* Modal de modification de train */}
        <Modal animationType='slide' visible={editvisible}>
          <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setEditVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
            <Text style={styles.font}>
              MODIFIER TRAIN 
            </Text>
            <Marginer value={5} />  
            {
              selectedTrain && 
            <View>
              <Text>Numero du train : </Text>
              <Controller 
                name="numero_train"
                control={edit_control}
                defaultValue={selectedTrain?.numero_train}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {edit_errors.numero_train && <Text style={styles.errors}>{edit_errors.numero_train.message}</Text>}
              <Text>Capacité : </Text>
              <Controller 
                name="capacite"
                control={edit_control}
                defaultValue={selectedTrain?.capacite}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {edit_errors.capacite && <Text style={styles.errors}>{edit_errors.capacite.message}</Text>}
              <Text>Classe : </Text>
              <Controller 
                name="classe"
                control={edit_control}
                defaultValue={selectedTrain?.classe}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={stylesPerso.inputReal}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {edit_errors.classe && <Text style={styles.errors}>{edit_errors.classe.message}</Text>}
              <Button
                title="Modifier"
                onPress={submitEdit(editTrain)}
              />
            </View>
            }
          </ScrollView>
        </Modal>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
    errors: {
    marginBottom: 5,
    color: 'red',
    textAlign: "left"
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
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
  } , 
  trajet :{
    paddingHorizontal : 10,
    paddingVertical: 25
  },
  trajettitle : {
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight : 'bold',
    color: 'white'
  },
  flexy : {
    display : 'flex', 
    alignItems : 'center' ,
    textAlign : 'center',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  flexend : {
    display : 'flex', 
    alignItems : 'center' ,
    textAlign : 'center',
    flexDirection : 'row',
    justifyContent : 'flex-end',
    gap: 5
  },
  box : {
    width : '100%' ,
    minHeight : 150 ,
    backgroundColor : colorBlue ,
    borderRadius : 5 ,
    marginVertical : 10 ,
    padding : 20
  } ,
  font : {
    color : colorBlue ,
    fontSize : 27 , 
    textAlign : 'center' , 
    fontWeight : 'bold'
  },
  trajetinfo : {
    color : 'white' ,
    fontSize : 20 , 
    textAlign : 'center' , 
  }
  ,
  trajetville : {
    color : 'white' ,
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight: 'semibold'
  },
  comptepage : {
    padding: 50
  },
  comptepagescroll : {
    padding: 50,
    height: 1000
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
  close: {
    textAlign:'right',
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeicon: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  closeview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },


});


const item = StyleSheet.create({
  bg: {
    width: '100%',
    objectFit: 'cover',
    maxHeight: 150,
  },
  item: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    height: 280
  },
  descri: {
    padding: 10,
    height: 'auto'
  }
});
