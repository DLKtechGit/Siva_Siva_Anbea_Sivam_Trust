import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import React from "react";
import { COLORS } from "./constants";

const Payment2 = () => {
  const cost = "1";
  const payWithUPI = async () => {
    const upiURL = `upi://pay?pa=pudumaitamilselvan@okicici&pn=John Doe&tn=Payment&am=${cost}&cu=INR`;

    try {
      const supported = await Linking.canOpenURL(upiURL);

      if (supported) {
        await Linking.openURL(upiURL);
      } else {
        Alert.alert("Error", "UPI app not installed on your device");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to initiate UPI payment");
      console.error(error);
    }
  };
  return (
    <TouchableOpacity onPress={payWithUPI} style={styles.btn_container}>
      <Text style={styles.btn_txt}>Make payment</Text>
    </TouchableOpacity>
  );
};

export default Payment2;

const styles = StyleSheet.create({
  btn_container: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  btn_txt: {
    textAlign: "center",
    fontWeight: "600",
    color: COLORS.white,
    fontSize: 17,
  },
});
