import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../components/constants";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native";
import { CustomFonts } from "../../components/CustomFonts";
import DOBpicker from "../../components/DOBpicker";
import GenderToggle from "../../components/GenderToggle";
import FileUpload from "../../components/FileUpload";
import Signature from "../../components/Signature";
import DatePicker from "../../components/DatePicker";
import Payment2 from "../../components/Payment2";
import TimeSelection from "../../components/TimeSelection";
import HoroscopeToggle from "../../components/HoroscopeToggle";
import { CheckBox } from "@rneui/base";

const AstrologyForm = () => {
  const route = useRoute();
  const { id, user_id } = route.params;
  const navigation = useNavigation();
  const fontsloaded = CustomFonts();
  const [checkbox, setCheckbox] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    signature: "",
    gender: "",
    f_name: "",
    m_name: "",
    time_birth: "",
    place_birth: "",
    document: "",
  });
  if (!fontsloaded) {
    return null;
  }

  const handlechange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const handleGenderChange = (gender) => {
    setBookingData((prevBookingData) => {
      const updatedData = { ...prevBookingData, gender: gender };
      return updatedData;
    });
  };

  const handleSignatureChange = (sign) => {
    setBookingData((prevBookingData) => {
      const updatedData = { ...prevBookingData, signature: sign };
      return updatedData;
    });
  };

  const handleFileChange = (file) => {
    setBookingData((prevBookingData) => {
      const updatedData = { ...prevBookingData, document: file };
      return updatedData;
    });
  };

  const handleTimeChange = (time) => {
    setBookingData((prevBookingData) => {
      const updatedData = { ...prevBookingData, time_birth: time };
      return updatedData;
    });
  };

  const handleChange = () => {
    setCheckbox(!checkbox);
  };

  return (
    // main container
    <View style={styles.main_container}>
      {/* Nav container */}
      <View style={styles.nav_container}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Icon name="arrowleft" size={25} color={COLORS.white} />
        </Pressable>
        <Text style={styles.nav_txt}>New booking</Text>
      </View>
      {/* main input container */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main_input_container}>
          {/* header text */}
          <Text style={styles.header_txt}>Appointment Request Form</Text>
          {/* name field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Name<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.text_input}
              placeholder="Enter Name"
              value={bookingData.name}
              onChangeText={(text) => handlechange("name", text)}
            />
          </View>
          {/* contact number */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Contact Number<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.text_input}
              placeholder="+91 00000 00000"
              keyboardType="numeric"
              value={bookingData.phone}
              onChangeText={(text) => handlechange("phone", text)}
            />
          </View>
          {/* Email field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Email<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.text_input}
              inputMode="email"
              placeholder="example@gmail.com"
              value={bookingData.email}
              onChangeText={(text) => handlechange("email", text)}
            />
          </View>
          {/* Gender field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Gender<Text style={{ color: "red" }}>*</Text>
            </Text>
            <GenderToggle onGenderChange={handleGenderChange} />
          </View>

          <View style={styles.input_container}>
            <Text style={styles.label}>
              What date and time work best for you
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <DatePicker id={id} user_id={user_id} />
          </View>
          {/* fathers name */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Father's Name<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.text_input}
              placeholder="Enter Father's Name"
              value={bookingData.f_name}
              onChangeText={(text) => handlechange("f_name", text)}
            />
          </View>
          {/* mother's name */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Mother's Name<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.text_input}
              placeholder="Enter Mother's Name"
              value={bookingData.m_name}
              onChangeText={(text) => handlechange("m_name", text)}
            />
          </View>
          {/* DOB field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Date of birth [DD/MM/YYYY]<Text style={{ color: "red" }}>*</Text>
            </Text>
            <DOBpicker />
          </View>
          {/* time field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Time of birth<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TimeSelection onTimeChange={handleTimeChange} />
          </View>
          {/* place of birth field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Place of birth<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.text_input}
              multiline={true}
              placeholder="Town / City, State, Country"
              value={bookingData.place_birth}
              onChangeText={(text) => handlechange("place_birth", text)}
            />
          </View>
          {/* Do you have horoscope */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Do you have horoscope<Text style={{ color: "red" }}>*</Text>
            </Text>
            <HoroscopeToggle onFileNewChange={handleFileChange} />
          </View>
          <Pressable style={styles.agreebtn} onPress={handleChange}>
            <CheckBox
              checked={checkbox}
              onPress={handleChange}
              checkedColor={COLORS.primary}
            />
            <Text style={styles.agreebtntxt}>
              I Agree to terms and conditions
            </Text>
            <Text style={{ color: "red" }}>*</Text>
          </Pressable>
          {/* Signature */}
          {/* <View style={styles.sign_input_container}>
            <Text style={styles.label}>
              Signature<Text style={{ color: "red" }}>*</Text>
            </Text>
            <Signature  onSignatureChange={handleSignatureChange} />
          </View> */}
          {/* payment field */}
          <Payment2
            id={id}
            user_id={user_id}
            data={bookingData}
            type={2}
            agree={checkbox}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AstrologyForm;

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  nav_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: wp(5),
    padding: 15,
    paddingTop: 40,
  },
  nav_txt: {
    fontFamily: "semi-bold",
    fontSize: hp(2.3),
    color: COLORS.white,
  },
  main_input_container: {
    display: "flex",
    flexDirection: "column",
    gap: hp(3),
    padding: 15,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
  input_container: {
    display: "flex",
    flexDirection: "column",
    gap: hp(1),
    backgroundColor: COLORS.label_bg,
    padding: 10,
    borderRadius: 10,
    // elevation:1
  },
  label: {
    fontSize: 16,
    fontFamily: "medium-bold",
    color: COLORS.dark_gray,
  },
  text_input: {
    backgroundColor: COLORS.white,
    padding: 8,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
    borderRadius: 10,
    fontFamily: "regular",
  },
  reason_text_input: {
    height: hp(11),
    backgroundColor: COLORS.white,
    padding: 8,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  sign_input_container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    gap: hp(1.5),
    backgroundColor: COLORS.label_bg,
    padding: 10,
    borderRadius: 10,
    // elevation:1
  },
  header_txt: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "medium-bold",
    color: COLORS.dark_gray,
  },
  agreebtn: {
    // marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  agreebtntxt: {
    color: COLORS.black,
    fontWeight: "600",
    marginLeft: -10,
  },
});
