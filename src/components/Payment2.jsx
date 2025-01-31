import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "./constants";
import axios from "axios";
import { BASE_URL } from "../utils/apiconfig";
import {
  getBookingData,
  getDOBData,
  getToken,
  storeBookingData,
  storeSignData,
  getSignData,
} from "../utils/auth";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";

const Payment2 = ({ id, user_id, data, type, agree }) => {
  const cost = "1";
  const navigation = useNavigation();
  const [IsLoading, setIsLoading] = useState(false);

  const payWithUPI = async () => {
    const dateData = await getBookingData();
    const dobData = await getDOBData();

    console.log("date", dateData);

    try {
      setIsLoading(true);
      let formDData = "";
      if (type == 1) {
        formDData = {
          service_id: id,
          service_user_id: user_id,
          dob: dobData,
          gender: data.gender,
          mobile: data.phone,
          reason: data.reason,
          date: dateData?.date,
          time: dateData?.time,
          description: data.problem,
          name: data.name,
          email: data.email,
          address: data.address,
        };
      } else if (type == 2) {
        formDData = {
          service_id: id,
          service_user_id: user_id,
          dob: dobData,
          gender: data.gender,
          mobile: data.phone,
          email: data.email,
          f_name: data.f_name,
          m_name: data.m_name,
          time_birth: data.time_birth,
          place_birth: data.place_birth,
          date: dateData?.date,
          time: dateData?.time,
        };
      }
      if (Object.values(formDData).some((field) => field === "")) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "All fields are required!",
          autoHide: true,
          visibilityTime: 2500,
          position: "bottom",
          topOffset: 0,
          swipeable: true,
        });
      } else {
        const formData = new FormData();
        formData.append("service_id", id);
        formData.append("service_user_id", user_id);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("sign", data.signature);
        formData.append("dob", dobData);
        formData.append("gender", data.gender);
        formData.append("mobile", data.phone);
        formData.append("date", dateData?.date);
        formData.append("time", dateData?.time);
        if (type == 1) {
          formData.append("reason", data.reason);
          formData.append("description", data.problem);
          formData.append("address", data.address);
        } else if (type == 2) {
          formData.append("f_name", data.f_name);
          formData.append("m_name", data.m_name);
          formData.append("time_birth", data.time_birth);
          formData.append("place_birth", data.place_birth);
        }

        if (data?.document) {
          const uri = data.document.uri;
          const fileInfo = await FileSystem.getInfoAsync(uri);
          const fileName = fileInfo.uri.split("/").pop();
          const fileType = fileInfo.uri.split(".").pop();

          formData.append("document", {
            uri: uri,
            name: fileName,
            type: `image/${fileType}`,
          });
        }

        const token = await getToken();
        const response = await axios.post(`${BASE_URL}/add_booking`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == 200) {
          setIsLoading(false);
          await storeBookingData("", "");
          Toast.show({
            type: "success",
            text1: response.data.message,
            autoHide: true,
            visibilityTime: 2500,
            position: "bottom",
            topOffset: 0,
            swipeable: true,
          });
          setTimeout(() => {
            navigation.navigate("Upcoming Bookings");
          }, 1000);
        }
      }
    } catch (error) {
      setIsLoading(false);
      if (dateData == null) {
        Toast.show({
          type: "error",
          text1: "All fields are required!",
          autoHide: true,
          visibilityTime: 2500,
          position: "bottom",
          topOffset: 0,
          swipeable: true,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "An error occurred. Please try again.",
          autoHide: true,
          visibilityTime: 2500,
          position: "bottom",
          topOffset: 0,
          swipeable: true,
        });
      }
    }
    // const upiURL = `upi://pay?pa=pudumaitamilselvan@okicici&pn=John Doe&tn=Payment&am=${cost}&cu=INR`;

    // try {
    //   const supported = await Linking.canOpenURL(upiURL);

    //   if (supported) {
    //     await Linking.openURL(upiURL);
    //   } else {
    //     Alert.alert("Error", "UPI app not installed on your device");
    //   }
    // } catch (error) {
    //   Alert.alert("Error", "Unable to initiate UPI payment");
    //   console.error(error);
    // }
  };
  if (IsLoading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }
  return (
    <TouchableOpacity
      disabled={!agree}
      onPress={payWithUPI}
      style={styles.btn_container}
    >
      <Toast />
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
