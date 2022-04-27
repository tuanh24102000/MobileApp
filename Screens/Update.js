import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import DatePicker from 'react-native-datepicker';

const db = SQLite.openDatabase("dbName", 2.0);

const Update  = ({ route, navigation }) => {
    const [activityname, setActivityname] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [timeofattending, setTimeofattending] = useState("");
    const [nameofreporter, setNameofreporter] = useState("");
 //const { result } = route.params;


  const updateHandle = () => {
    if (activityname.length === 0) {
        Alert.alert("Warning !!! Please enter activity name");
      }
      else if( location.length === 0){Alert.alert("Warning !!! Please select bedroom")}
      else if( date.length === 0){Alert.alert("Warning !!! Please enter datetime")}
      else if( timeofattending.length === 0){Alert.alert("Warning !!! Please enter monthly price")}
      else if( nameofreporter.length === 0){Alert.alert("Warning !!! Please select furniture type")}
      else {
        try {
          db.transaction((tx) => {
            tx.executeSql(
                'UPDATE DATABASE SET Activityname=?, Location=?, Date=?, Timeofattending=?, Nameofreporter=? WHERE Id=?',
                [activityname, location, date, timeofattending, nameofreporter],
              (tx, results) => {
                console.log(results.rowsAffected);
              }
            );
          });
          Alert.alert("Update Completed");
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      }
};

  return (         
    <View style={styles.body}>
    <Text style={styles.text}>Update Form</Text>
    <TextInput
      placeholder="Activity Name"
      style={styles.input}
      onChangeText={(value) => setActivityname(value)}
      value={activityname}
    />
    <TextInput
      placeholder="Location"
      style={styles.input}
      onChangeText={(value) => setLocation(value)}
      value={location}
    />
    <DatePicker
            style={styles.datePicker}
            date={date}
            mode="date"
            placeholder="Date(Required)"
            format="DD-MM-YYYY"
            minDate="01-01-2015"
            maxDate="01-01-2025"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: 36,
                fontSize: 20,
              },
              dateIcon: {
                position: 'relative',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
            }}
              onDateChange={(date) => {
              setDate(date);
            }}
            />
    <TextInput
      style={styles.input}
      placeholder="Time of attending"
      onChangeText={(value) => setTimeofattending(value)}
      value={timeofattending}
    />
    <TextInput
      style={styles.input}
      placeholder="Name of the reporter"
      onChangeText={(value) => setNameofreporter(value)}
      value={nameofreporter}
    />
    <View>
    <CustomButton title="UPDATE" handlePress ={updateHandle} />
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      },
      text: {
        fontSize: 40,
        fontWeight: "bold",
        margin: 15,
      },
      input: {
        borderWidth: 1,
        height: 50,
        width: 300,
        borderRadius: 2,
        textAlign:"left",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
      },
      datePicker: {
        alignItems: "center",
        justifyContent:"center",
        height:60,
        width: 370,
        fontSize:20,
      },
});
export default Update;