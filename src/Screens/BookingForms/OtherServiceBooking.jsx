import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
import GenderToggle from "../../components/GenderToggle";

const OtherServiceBooking = () => {
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
        <Text style={styles.nav_txt}>General questions form</Text>
      </View>
      {/* main input container */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main_input_container}>
          {/* question history */}
          <View style={styles.history_btn_container}>
            {/* header text */}
            <Text style={styles.header_txt}>Questions Request Form</Text>
            <TouchableOpacity
              style={styles.history_btn}
              onPress={() => navigation.navigate("QuestionHistory")}
            >
              <Text style={styles.history_btn_txt}>Asked Questions</Text>
            </TouchableOpacity>
          </View>

          {/* name field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Name<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput style={styles.text_input} placeholder="Enter Name" />
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
          {/* Age */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Age<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.text_input}
              placeholder="Enter Age"
              keyboardType="numeric"
            />
          </View>
          {/* Gender field */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Gender<Text style={{ color: "red" }}>*</Text>
            </Text>
            <GenderToggle />
          </View>
          {/* Reason for appointment */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Reason For Seeing<Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput style={styles.text_input} />
          </View>

          {/* Reason */}
          <View style={styles.input_container}>
            <Text style={styles.label}>
              Ask your question
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput style={styles.reason_text_input} multiline={true} />
          </View>

          {/* Submit button */}
          <TouchableOpacity style={styles.btn_container}>
            <Text style={styles.btn_txt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OtherServiceBooking;

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
  btn_container: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginBottom: 20,
    borderRadius: 7,
  },
  btn_txt: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "semi-bold",
    color: COLORS.white,
  },
  history_btn_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor:COLORS.label_bg,
    padding:10,
    borderRadius:10
  },
  history_btn: {
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 5,
  },
  history_btn_txt: {
    color: COLORS.white,
    fontFamily: "regular",
  },
});
