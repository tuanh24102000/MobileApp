import { View, FlatList, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as SQLite from "expo-sqlite"
import ResultItem from '../Components/ResultItem'

const database = SQLite.openDatabase("dbName", 2.0)

const Result = ({navigation}) => {
    const [activityname, setActivityname] = useState("")
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [timeofattending, setTimeofattending] = useState("");
    const [nameofreporter, setNameofreporter] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        getResult();
    }, [])

    const getData = () => {
        try {
            database.transaction((tx) => {
              console.log(123);
              tx.executeSql("SELECT Activityname, Location, Date, Timeofattending, Nameofreporter FROM DATABASE;", [], (tx, result) => {
                console.log(JSON.stringify(result.rows));
                var len = result.rows.length;
                console.log(len);
                if (len > 0) {  
                  const resultActivityname= result.rows.item(0).Activityname;
                  const resultLocation = result.rows.item(0).Location;
                  const resultDate = result.rows.item(0).Date;
                  const resultTimeofattending = result.rows.item(0).Timeofattending;
                  const resultNameofreporter = result.rows.item(0).Nameofreporter;
                  setActivityname(resultActivityname);
                  setLocation(resultLocation);
                  setDate(resultDate);
                  setTimeofattending(resultTimeofattending);
                  setNameofreporter(resultNameofreporter);
                }
              });
            });
          } catch (error) {
            console.log(error);
          }
    }

    const getResult = () => {
        try {
          database.transaction((tx) => {
            tx.executeSql("SELECT * FROM DATABASE", [], (tx, result) => {
              var len = result.rows.length;
              console.log(JSON.stringify(result.rows));
              for (let i = 0; i < len; i++) {
                let row = result.rows.item(i);
                setData((prevState) => [
                  ...prevState,
                  {Id: row.Id, Activityname: row.Activityname, Location: row.Location, Date: row.Date, Timeofattending: row.Timeofattending, Nameofreporter: row.Nameofreporter },
                ]);
              }
            });
          });
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.Id)}
        renderItem={({ item }) => (
          <ResultItem result={item} navigation={navigation} />
        )}
      />
    </View>
    )
}

export default Result
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
  });