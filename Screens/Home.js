import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomButton from '../Components/CustomButton'
import * as SQlite from "expo-sqlite"
import DatePicker from 'react-native-datepicker'

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
        if (activityname.length === 0) {
          Alert.alert("Please enter activity name!")
        }
        else if(date.length === 0){
          Alert.alert("Please enter date!")
        }
        else if (nameofreporter.length === 0) {
            Alert.alert("Please enter name of reporter");
          } 
        else {
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
    const search = () => {
      navigation.navigate("Search")
    };
    const notification = () => {
      navigation.navigate("Notification")
    };
    const createTable = () => {
        database.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, Activityname TEXT, Location TEXT, Date TEXT, Timeofattending TEXT, Nameofreporter TEXT);"
          );
        });
      };
      return (
        <ScrollView>
        <View style={styles.body}>
          <Text style={styles.text}>Home</Text>
          <TextInput
            style={styles.input}
            placeholder="Activity Name (Required)"
            onChangeText={(value) => setActivityname(value)}
            value={activityname}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
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
                fontSize: 15,
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
            placeholder="Name of Reporter (Required)"
            onChangeText={(value) => setNameofreporter(value)}
            value={nameofreporter}
          />
          <CustomButton title="Submit" handlePress={submit}/>
          <View style = {{flexDirection:"row"}}>
          <CustomButton title="Show All" handlePress ={showResult} />
          <CustomButton title="Search" handlePress= {search}/>
          </View>
          <TouchableOpacity
          onPress={notification}
          style={styles.touch}>
            <Text
            style = {{
              alignItems:"center",
              justifyContent:"center",
              paddingHorizontal:20,
              fontSize:15,
              textTransform:"uppercase",
              color:"black"}}>Notification</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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
      fontSize: 15,
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
    touch:
    {
      paddingLeft: 1,
      width: 370,
      height: 50,
      borderWidth: 3,
      backgroundColor: "orange",
      fontSize: 250,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      marginTop:20,
      marginHorizontal:5,
    }
  });

export default Home