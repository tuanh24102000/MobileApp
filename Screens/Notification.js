import React, { useState } from "react";
import { Text, View, TouchableOpacity, Vibration, Modal } from 'react-native'
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import CustomButton from "../Components/CustomButton";


const Notification = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const turnModal = () => {
        setModalVisible(!modalVisible);
      };
    const RingABell = async () => {
        const { sound } = await Audio.Sound.createAsync(
        require("../assets/bell.mp3")
        );
        await sound.playAsync();
      };

    const Vibrate = () => {
        Vibration.vibrate(500);
      };
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100,
        }}>
        <View>
        <CustomButton
        title="CLICK HERE"
        handlePress={turnModal}
        />
        </View>
        <Modal
        animationType="slide"
           transparent={true}
           visible={modalVisible}>
        <View
        style = {{
            margin: 20,
            marginTop: 50,
            backgroundColor: "rgb(60, 179,113)",
            borderRadius: 20,
            padding: 35,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
               width: 0,
               height: 2,
                },
            }}>
        <Text style={{
            marginBottom: 20,
            textAlign: "center",
            fontSize:20
            }}>Notification</Text>
            <TouchableOpacity
            style = {{
                width: 300,
                height: 50,
                borderWidth: 3,
                backgroundColor: "lightblue",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                marginTop:20,
                marginHorizontal:5,
            }}
            onPress={RingABell}
            >
                <Text
                style = {{
                    alignItems:"center",
                    justifyContent:"center",
                    paddingHorizontal:20,
                    fontSize:20,
                    textTransform:"uppercase",
                    color:"black"
                }}
                    >Ring Bell</Text>
            </TouchableOpacity> 
            <TouchableOpacity
            style = {{
                width: 300,
                height: 50,
                borderWidth: 3,
                backgroundColor: "lightblue",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                marginTop:20,
                marginHorizontal:5,
            }}
            onPress={Vibrate}
            >
                <Text
                style = {{
                    alignItems:"center",
                    justifyContent:"center",
                    paddingHorizontal:20,
                    fontSize:20,
                    textTransform:"uppercase",
                    color:"black"
                }}
                    >Vibrate</Text>
            </TouchableOpacity> 
            <TouchableOpacity
            style = {{
                width: 300,
                height: 50,
                borderWidth: 3,
                backgroundColor: "lightblue",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                marginTop:20,
                marginHorizontal:5,
            }}
            onPress={ ()=> setModalVisible(!modalVisible)}
            >
                <Text
                style = {{
                    alignItems:"center",
                    justifyContent:"center",
                    paddingHorizontal:20,
                    fontSize:20,
                    textTransform:"uppercase",
                    color:"black"
                }}
                    >Cancel</Text>
            </TouchableOpacity> 
        </View>
        </Modal>
        </View>
    )
}
export default Notification;