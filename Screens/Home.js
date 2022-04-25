import { View, Text, Alert, TextInput, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../Components/CustomButton'
import * as SQlite from "expo-sqlite"

const database = SQlite.openDatabase("dbName", 1.0)

const Home = ({navigation}) => {
    const [activityname, setActivityname] = useState("")
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [timeofattending, setTimeofattending] = useState("");
    const [nameofreporter, setNameofreporter] = useState("");

    useEffect(() =>{
        createTable();
    }, []);
    
    const submit = () => {
        if (activityname.length === 0 || location.length === 0 || date.length === 0 
            || timeofattending.length === 0|| nameofreporter.length === 0) {
            Alert.alert("Warning !!! Please enter inputs !!!");
          } else {
            try {
              database.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO DATABASE (Activityname, Location, Date, Timeofattending, Nameofreporter) VALUES (?,?,?,?,?);",
                  [activityname, location, date, timeofattending, nameofreporter],
                  (tx, results) => {
                    console.log(results.rowsAffected);
                  }
                );
              });
              Alert.alert("Input Entered")
              navigation.navigate("Result");
            } catch (error) {
              console.log(error);
            }
          }
    };

    const showResult = () =>{
        navigation.navigate("Result");
    };
    const createTable = () => {
        database.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, Activityname TEXT, Location TEXT, Date TEXT, Timeofattending TEXT, Nameofreporter TEXT);"
          );
        });
      };
      return (
        <View style={styles.body}>
          <Text style={styles.text}>Home</Text>
          <TextInput
            style={styles.input}
            placeholder="Activity Name"
            onChangeText={(value) => setActivityname(value)}
            value={activityname}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={(value) => setLocation(value)}
            value={location}
          />
           <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={(value) => setDate(value)}
            value={date}
          />
           <TextInput
            style={styles.input}
            placeholder="Time of attending"
            onChangeText={(value) => setTimeofattending(value)}
            value={timeofattending}
          />
           <TextInput
            style={styles.input}
            placeholder="Name of Reporter"
            onChangeText={(value) => setNameofreporter(value)}
            value={nameofreporter}
          />
          <View style = {{flexDirection:"row"}}>
          <CustomButton title="Show All" handlePress ={showResult} />
          <CustomButton title="Search" />
          <CustomButton title="Submit" handlePress={submit}/>
          </View>
        </View>
        )
}

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
      borderRadius: 5,
      textAlign: "center",
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
  });

export default Home