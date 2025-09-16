import Marginer from '@/components/personalized/Marginer';
import { colorBlue } from '@/constants/Colors';
import { page, stylesPerso, trajetbox } from '@/src/styles/GeneralStyles';
import { StyleSheet, View, Text, Button, ScrollView, TextInput, Pressable, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import useSearchTrajet from '@/hooks/api/useSearchTrajet';
import { SearchTrajetType } from '@/types/trajet.type';
import { SearchTrajetValidation } from '@/validation/trajet.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { ReservationPlacingType } from '@/types/reservation.type';
import { useAuth } from '../../context/AuthContext';
import usePostReservation from '@/hooks/api/usePostReservation';
import useGetAllReservation from '@/hooks/api/useGetAllReservation';
import { ReservationPlacingValidation } from '@/validation/reservation.validation';

export default function SignupPageScreen() {
  const { token } = useAuth();
  const { handleSubmit: submit, formState: { errors }, control, setValue } = useForm<SearchTrajetType>({
    resolver: yupResolver(SearchTrajetValidation)
  });
  const { mutateAsync: search, data: trajets, reset, isPending } = useSearchTrajet();
  const [show, setShow] = useState(false);
  const [selectedTrajet, setSelectedTrajet] = useState<any>();
  const [showpanier, setShowPanier] = useState(false);
  const { handleSubmit: reserver, formState: { errors: reserver_errors}, control: reserver_control, setValue: setValueReserver } = useForm<ReservationPlacingType>({
    resolver: yupResolver(ReservationPlacingValidation)
  })
  const { refetch } = useGetAllReservation();
  const { mutateAsync: createReservation } = usePostReservation({action() {
    refetch()
  },})
  useEffect(() => {
    setValueReserver('utilisateur_id', token ? JSON.parse(atob(token?.split('.')[1])).id : '' )
  }, [token])

  const ville: any = [
    {key: 'Antananarivo', value: "Antananarivo"},
    {key: 'Antsirabe', value: "Antsirabe"},
    {key: 'Fianarantsoa', value: "Fianarantsoa"},
    {key: 'Manakara', value: "Manakara"},
    {key: 'Toamasina', value: "Toamasina"},
  ]

  const submitReserver = async (data: ReservationPlacingType) => {
    await createReservation(data);
    reset();
    setShowPanier(false);
  }

  const searchTrajet = async (data: SearchTrajetType) => {
    await search(data);
  }

  const showCalendar = () => {
    setShow(true)
  }

  const handleDayPress = (day: any) => {    
    setValue('date', day.dateString)

    setShow(false)
  }

  const selectTrajet = async (item: any) => {
    setSelectedTrajet(item);
    setValueReserver('date_reservation', moment().format('YYYY-MM-DD'))
    setValueReserver('trajet_id', item?.trajet_id);
    setShowPanier(true);
  }

  const formater = (date: any) => {
    return moment(date).format('YYYY-MM-DD')
  }

  return (
      <ScrollView style={stylesPerso.container}>
        <View style={page.paddingnormal}>
        <Marginer value={15} /> 
          <Text style={styles.font}>
            RECHERCHER UN TRAJET
          </Text>
          <Marginer value={15} />  
          <View>
            <Text>Gare de depart : </Text>
            <Controller 
              name="depart"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectList 
                  data={ville}
                  setSelected={onChange}
                  searchPlaceholder='Saisir la ville'
                  placeholder='Gare de depart'
                  boxStyles={{borderRadius:5,paddingVertical:10}}
                />
              )}
            />
            {errors.depart && <Text style={styles.errors}>{errors.depart.message}</Text>}
             <Marginer value={5} />
            <Text>Gare d'arrivé : </Text>
            <Controller 
              name="arrive"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectList 
                  data={ville}
                  setSelected={onChange}
                  searchPlaceholder='Saisir la ville'
                  placeholder='Gare de depart'
                  boxStyles={{borderRadius:5,paddingVertical:10}}
                />
              )}
            />
            {errors.arrive && <Text style={styles.errors}>{errors.arrive.message}</Text>}
            <Marginer value={5} />
            <Text>Date : </Text>
            <View style={styles.calendarview}>
              <Ionicons  name='calendar' style={styles.calendaricon} onPress={showCalendar} /> 
              <Controller 
                name="date"
                control={control}
                render={({ field: { value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    aria-disabled
                    placeholder='Sectionner la date du trajet...'
                  />
                )}
              />
            </View>
            {show && (
            <Calendar
            onDayPress={handleDayPress}
            style={styles.cal}
            />
            )}
            {errors.date && <Text style={styles.errors}>{errors.date.message}</Text>}
            <Button
            title="Rechercher"
            onPress={submit(searchTrajet)}
            />
          </View>
          <Marginer value={50} />  
          {
          isPending && 
          <View>
            <Ionicons name='wifi-outline' style={styles.loading} />
          </View>
          }          
          { trajets?.data?.length === 0 ? <View>
            <Ionicons style={styles.iconno} name='close' />
            <Text style={styles.textno}>Pas de trajets disponibles</Text>
          </View>: <></>}
          { trajets && trajets?.data.map((trajet: any, index: any) => (
            <View style={trajetbox.item} key={index}>
              <Text style={trajetbox.itemtitle}>
                { trajet.gare_depart } vers { trajet.gare_arrive }
              </Text>
              <Marginer value={10} />
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
              <Text style={trajetbox.itemtext}>
                Train n°  { trajet.numero_train }
              </Text>
              <Text style={trajetbox.itemtextt}>
                Classe:   { trajet.classe }
              </Text>
              <Text style={trajetbox.itembillet}>
              { trajet.billet } MGA
              </Text>
              <Text style={trajetbox.itemdispo}>
                <Ionicons  name='person' style={trajetbox.dispoicon} />
                <Text>{ trajet.places_disponibles } place(s) disponible(s)</Text>
              </Text>
              <Marginer value={10} />
              <Pressable onPress={() => selectTrajet(trajet)}>
                <Text style={stylesPerso.btnPrimary}>Reserver</Text>
              </Pressable>
            </View>
          )) }
      </View>
          <Modal visible={showpanier} animationType='slide'>
            <ScrollView style={page.paddingnormal}>
              <Pressable onPress={()=>{setShowPanier(false)}} style={styles.closeview}>
                <Ionicons name='close' style={styles.closeicon} /><Text style={styles.close}> Fermer</Text>
              </Pressable>
              <Text style={trajetbox.itemdispo}>Reservation de billet(s)</Text>
              <View style={trajetbox.item}>
                <Text style={trajetbox.itemtitle}>
                  { selectedTrajet?.gare_depart } vers { selectedTrajet?.gare_arrive }
                </Text>
                <Marginer value={10} />
                <Text style={styles.trajetinfo}>
                  { formater(selectedTrajet?.date_trajet) }
                </Text>
                <View style={styles.flexy} >
                    <Text style={trajetbox.itemheure}> { selectedTrajet?.heure_depart }</Text> 
                    <Text style={trajetbox.itemduree}>-----   { selectedTrajet?.duree_trajet }  ----</Text>
                    <Text style={trajetbox.itemheure}> { selectedTrajet?.heure_arrive }</Text>
                </View>
                <View style={styles.flexy}>
                  <Text style={trajetbox.itemville}> { selectedTrajet?.gare_depart }</Text>
                  <Text style={trajetbox.itemville}> { selectedTrajet?.gare_arrive }</Text>
                </View>
                <Text style={trajetbox.itemtext}>
                Train n°  { selectedTrajet?.numero_train }
              </Text>
              <Text style={trajetbox.itemtextt}>
                Classe:   { selectedTrajet?.classe }
              </Text>
                <Text style={trajetbox.itembillet}>
                { selectedTrajet?.billet } MGA
                </Text>
                <Text style={trajetbox.itemdispo}>
                  <Ionicons name='person' style={trajetbox.dispoicon} />
                  <Text>{selectedTrajet?.places_disponibles} place(s) disponible(s)</Text>
                </Text>
                <Marginer value={10} />
              </View>
              <Marginer value={10} />
              <Text>Nombre de place : </Text>
              <Controller 
                name='nbr_place'
                control={reserver_control}
                render={({
                  field: { value, onChange }
                }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChange} 
                  /> 
                )}
              />
              {reserver_errors.nbr_place && <Text style={styles.errors}>{reserver_errors.nbr_place.message}</Text>}
              <Pressable onPress={reserver(submitReserver)}>
                  <Text style={stylesPerso.btnSuccess}>Valider</Text>
              </Pressable>
            </ScrollView>
          </Modal>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    fontSize: 55,
    textAlign: 'center',
    marginVertical: 25
  },
  errors: {
    marginBottom: 5,
    color: 'red',
    textAlign: "left"
  },
  cal: {
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 25
  },
  comptepage : {
    paddingVertical: 50,
    paddingHorizontal: 15
  },
  box : {
    width : 'auto' ,
    marginHorizontal: 15,
    minHeight : 150 ,
    backgroundColor : colorBlue ,
    borderRadius : 5 ,
    marginVertical : 10 ,
    padding : 20
  } ,
  flexy : {
    display : 'flex', 
    alignItems : 'center' ,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  trajettitle : {
    fontSize : 20 , 
    textAlign : 'center' , 
    fontWeight : 'bold',
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
    paddingLeft: '90%',
    paddingVertical: 10,
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
  textno: {
    fontSize: 20,
    textAlign: 'center'
  },
  iconno: {
    fontSize: 100,
    textAlign: 'center'
  }


});
