import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../components/constants";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
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

const OthersBookingForm = () => {
  const navigation = useNavigation();
  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

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
            <TextInput style={styles.text_input} placeholder="Enter Name" />
          </View>
          {/* DOB field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Birth Date<Text style={{ color: "red" }}>*</Text>
            </Text>
            <DOBpicker />
          </View>
          {/* Gender field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Gender<Text style={{ color: "red" }}>*</Text>
            </Text>
            <GenderToggle />
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
            />
          </View>
          {/* Address field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Address<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput style={styles.text_input} multiline={true} />
          </View>
          {/* Reason for appointment */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Reason For Seeing<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput style={styles.text_input} />
          </View>
          {/*Medical Report file upload */}
          {/* <View style={styles.input_container}>
            <Text style={styles.label}>
              Upload Medical Report (if applicable)
            </Text>
            <FileUpload />
          </View> */}
          {/* Date time selection */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              What date and time work best for you
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <DatePicker />
          </View>
          {/* Reason */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Explain Your problem in few lines of your appointment
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput style={styles.reason_text_input} multiline={true} />
          </View>
          {/* Signature */}
          <View style={styles.sign_input_container}>
            <Text style={styles.label}>
              Signature<Text style={{ color: "red" }}>*</Text>
            </Text>
            <Signature />
          </View>
          {/* payment field */}
          <Payment2 />
        </View>
      </ScrollView>
    </View>
  );
};

export default OthersBookingForm;

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
});
