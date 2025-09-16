import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import useDeleteTrajet from '@/hooks/api/useDeleteTrajet';
import useEditTrajet from '@/hooks/api/useEditTrajet';
import useGetAllTrajet from '@/hooks/api/useGetAllTrajet';
import usePostTrajet from '@/hooks/api/usePostTrajet';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { CreateTrajetType, EditTrajetType } from '@/types/trajet.type';
import { CreateTrajetValidation, EditTrajetValidation } from '@/validation/trajet.validation';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, View, Text, ScrollView, Modal, TextInput, Pressable, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {
  const { data: trajets, refetch } = useGetAllTrajet();
  const { handleSubmit: submitCreate, formState: { errors: create_errors }, control: create_control, setValue: setCreateValue, reset: createReset } = useForm<CreateTrajetType>({
    resolver: yupResolver(CreateTrajetValidation)
  })
  const { handleSubmit: submitEdit, formState: { errors: edit_errors }, control: edit_control, setValue: setEditValue, reset: editReset } = useForm<EditTrajetType>({
    resolver: yupResolver(EditTrajetValidation)
  })
  const { mutateAsync: postTrajet } = usePostTrajet({action() {
    refetch()
  },})
  const { mutateAsync: editTrajet } = useEditTrajet({action() {
    refetch()
  },});  
  const { mutateAsync: deleteTrajet } = useDeleteTrajet({action() {
    refetch()
  },});  
  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState<EditTrajetType | null>(null);
  const [addvisible , setAddVisible] = useState(false)
  const [editvisible , setEditVisible] = useState(false)

  const showCalendar = () => {
    setShow(true)
  }

  const handleDayPress = (day: any) => {    
    setCreateValue('date_trajet', day.dateString)

    setShow(false);
  }

  const showEditCalendar = () => {
    setEditShow(true)
  }

  const handleEditDayPress = (day: any) => {    
    setEditValue('date_trajet', day.dateString)

    setEditShow(false);
  }

  const handleCreate = async (data: CreateTrajetType) => {    
    await postTrajet(data);
    createReset();
    setAddVisible(false);
  }

  const handleEditSubmit = async (data: EditTrajetType) => {  
    await editTrajet(data);
    editReset();
    setSelectedTrajet(null);
    setEditVisible(false);
  }

  const handleEdit = async (item: EditTrajetType) => {
    setSelectedTrajet(item);
    setEditValue('trajet_id', item?.trajet_id)

    setEditVisible(true)
  }

  const deleteHandler = async (trajet: any) => {
    Alert.alert("Suppression", "Voulez-vous vraiment supprimer ce train ?", [
      {text: "Oui", onPress: ()=> {deleteTrajet(trajet)}},
      {text: "Non" , onPress: ()=>{}}
    ])
  }

  const formater = (date: any) => {
    return moment(date).format('YYYY-MM-DD')
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}>
          <Marginer value={15} />
          <View style={styles.acc}>
            <Text style={styles.title}>
              LISTE DES TRAJETS
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
          { trajets && trajets.map((trajet: any, index: any) => (
            <View style={trajetbox.item} key={index}>
              <Text style={trajetbox.itemtitle}>
                { trajet.gare_depart } vers  { trajet.gare_arrive }
              </Text>
              <Text style={styles.trajetinfo}>
                { formater(trajet.date_trajet) }
              </Text>
              <View style={styles.flexy} >
                  <Text style={trajetbox.itemheure}> { trajet.heure_depart }</Text> 
                  <Text style={trajetbox.itemduree}>-----   { trajet.duree_trajet }  ----</Text>
                  <Text style={trajetbox.itemheure}> { trajet.heure_arrive }</Text>
              </View>
              <View style={styles.flexy}>
                <Text style={trajetbox.itemville}> { trajet.gare_depart }</Text>
                <Text style={trajetbox.itemville}> { trajet.gare_arrive }</Text>
              </View>
              <Text style={trajetbox.itemtrain}>
                Train n°  { trajet.train_id }
              </Text>
              <Text style={trajetbox.itembillet}>
                { trajet.billet } MGA
              </Text>
              <Marginer value={10} />
              <View style={styles.flexend}>
                <Pressable onPress={()=>{handleEdit(trajet)}}>
                  <View style={stylesPerso.btnPrimary}>
                    <Ionicons name='pencil-outline' style={stylesPerso.iconfont} />
                    <Text>Modifier</Text>
                  </View>
                </Pressable>
                <Pressable onPress={()=>{deleteHandler(trajet.trajet_id)}}>
                  <View style={stylesPerso.btnDanger}>
                    <Ionicons name='trash-outline' style={stylesPerso.iconfont}/>
                    <Text>Supprimer</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )) }
        </View>

        {/* Modal d'ajout de trajet */}
        <Modal animationType='slide' visible={addvisible}>
        <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setAddVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
          <Text style={styles.font}>
            AJOUTER UNE TRAJET
          </Text>
          <Marginer value={15} />  
          <View>
            <Text>Date du trajet : </Text>
            <View style={styles.calendarview}>
              <Ionicons  name='calendar' style={styles.calendaricon} onPress={showCalendar} /> 
              <Controller 
                name="date_trajet"
                control={create_control}
                render={({ field: { value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    placeholder='Selectionner la date du trajet...'
                    aria-disabled
                  />
                )}
              />             
            </View>
            {show && (
            <Calendar
              onDayPress={handleDayPress}
              style={stylesPerso.cal}
            />
            )}
            {create_errors?.date_trajet && <Text style={styles.errors}>{create_errors?.date_trajet.message}</Text>}
            <Text>Gare de depart : </Text>
            <Controller 
              name="gare_depart"
              control={create_control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />      
            {create_errors?.gare_depart && <Text style={styles.errors}>{create_errors?.gare_depart.message}</Text>}
            <Text>Gare d'arrivé : </Text>
            <Controller 
              name="gare_arrive"
              control={create_control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />  
            {create_errors?.gare_arrive && <Text style={styles.errors}>{create_errors?.gare_arrive.message}</Text>}
            <Text>Durée du trajet : </Text>
            <Controller 
              name="duree_trajet"
              control={create_control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />  
            {create_errors?.duree_trajet && <Text style={styles.errors}>{create_errors?.duree_trajet.message}</Text>}
            <Text>Heure de depart : </Text>
            <Controller 
              name="heure_depart"
              control={create_control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />  
            {create_errors?.heure_depart && <Text style={styles.errors}>{create_errors?.heure_depart.message}</Text>}
            <Text>Heure d'arrivé : </Text>
            <Controller 
              name="heure_arrive"
              control={create_control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />  
            {create_errors?.heure_arrive && <Text style={styles.errors}>{create_errors?.heure_arrive.message}</Text>}
            <Text>Billet : </Text>
            <Controller 
              name="billet"
              control={create_control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />              
            {create_errors?.billet && <Text style={styles.errors}>{create_errors?.billet.message}</Text>}
            <Text>Train : </Text>
            <Controller 
              name="train_id"
              control={create_control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />  
            {create_errors?.train_id && <Text style={styles.errors}>{create_errors?.train_id.message}</Text>}
            <Button
            title="Ajouter"
            onPress={submitCreate(handleCreate)}
            />
          </View>
        </ScrollView>
        </Modal>

        {/* Modal de modification de trajet */}
        <Modal animationType='slide' visible={editvisible}>
        <ScrollView style={styles.comptepagescroll}> 
          <Pressable onPress={()=>{setEditVisible(false)}} style={styles.closeview}>
            <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
          </Pressable>
          <Text style={styles.font}>
            MODIFIER TRAJET
          </Text>
          <Marginer value={5} />  
          {
            selectedTrajet &&
            <View>
              <Text>Date du trajet : </Text>
              <View style={styles.calendarview}>
                <Ionicons  name='calendar' style={styles.calendaricon} onPress={showEditCalendar} /> 
                <Controller 
                  name="date_trajet"
                  defaultValue={formater(selectedTrajet?.date_trajet)}
                  control={edit_control}
                  render={({ field: { value } }) => (
                    <TextInput
                      style={styles.input}
                      value={value}
                      placeholder='Selectionner la date du trajet...'
                      aria-disabled
                    />
                  )}
                />             
              </View>
              {editshow && (
              <Calendar
                onDayPress={handleEditDayPress}
                style={stylesPerso.cal}
              />
              )}
              {edit_errors?.date_trajet && <Text style={styles.errors}>{edit_errors?.date_trajet.message}</Text>}
              <Text>Gare de depart : </Text>
              <Controller 
                name="gare_depart"
                control={edit_control}
                defaultValue={selectedTrajet?.gare_depart}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />      
              {edit_errors?.gare_depart && <Text style={styles.errors}>{edit_errors?.gare_depart.message}</Text>}
              <Text>Gare d'arrivé : </Text>
              <Controller 
                name="gare_arrive"
                control={edit_control}
                defaultValue={selectedTrajet?.gare_arrive}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />  
              {edit_errors?.gare_arrive && <Text style={styles.errors}>{edit_errors?.gare_arrive.message}</Text>}
              <Text>Durée du trajet : </Text>
              <Controller 
                name="duree_trajet"
                control={edit_control}
                defaultValue={selectedTrajet?.duree_trajet}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />  
              {edit_errors?.duree_trajet && <Text style={styles.errors}>{edit_errors?.duree_trajet.message}</Text>}
              <Text>Heure de depart : </Text>
              <Controller 
                name="heure_depart"
                control={edit_control}
                defaultValue={selectedTrajet?.heure_depart}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />  
              {edit_errors?.heure_depart && <Text style={styles.errors}>{edit_errors?.heure_depart.message}</Text>}
              <Text>Heure d'arrivé : </Text>
              <Controller 
                name="heure_arrive"
                control={edit_control}
                defaultValue={selectedTrajet?.heure_arrive}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />  
              {edit_errors?.heure_arrive && <Text style={styles.errors}>{edit_errors?.heure_arrive.message}</Text>}
              <Text>Billet : </Text>
              <Controller 
                name="billet"
                control={edit_control}
                defaultValue={selectedTrajet?.billet}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />              
              {edit_errors?.billet && <Text style={styles.errors}>{edit_errors?.billet.message}</Text>}
              <Text>Train : </Text>
              <Controller 
                name="train_id"
                control={edit_control}
                defaultValue={selectedTrajet?.train_id}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />  
              {edit_errors?.train_id && <Text style={styles.errors}>{edit_errors?.train_id.message}</Text>}
              <Button
                title="Modifier"
                onPress={submitEdit(handleEditSubmit)}
              />
            </View>
          }
        </ScrollView>
        </Modal>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
    fontSize : 24 , 
    textAlign : 'center' , 
    fontWeight : 'bold'
  },
  trajetinfo : {
    fontSize : 18 , 
    textAlign : 'center' , 
  }
  ,
  trajetville : {
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight: 'semibold'
  },
  calendarview: {
    position: 'relative',

  },
  calendaricon: {
    position: 'absolute',
    fontSize: 20,
    paddingLeft: '85%',
    paddingVertical: 15,
    paddingRight: 15,
    zIndex: 500
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
  errors: {
    marginBottom: 5,
    color: 'red',
    textAlign: "left"
  }
});
