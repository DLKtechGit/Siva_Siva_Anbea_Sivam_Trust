import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import safe_area_style from "../components/safe_area_style";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../components/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomFonts } from "../components/CustomFonts";

const ForgetPasswordScreen = ({ navigation }) => {
  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }

  return (
    <SafeAreaView style={safe_area_style.androidsafearea}>
      {/* main container */}
      <View style={styles.main_container}>
        {/* navigation container */}
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Icon name="arrowleft" size={30} color={COLORS.secondary} />
        </Pressable>
        {/* text and input field container */}
        <View style={styles.txt_input_container}>
          <Text style={styles.main_txt}>Reset password</Text>
          <Text style={styles.sub_txt}>
            Enter your Email and We will send an email with reset code
          </Text>
          {/* input field */}
          <View style={styles.input_field}>
            <TextInput
              placeholder="Email address"
              style={styles.placeholderstyle}
              inputMode="email"
            />
          </View>
          {/* verify button */}
          <TouchableOpacity style={styles.btn_container}>
            <Text style={styles.btn_txt}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  main_container: {
    padding: 15,
  },
  main_txt: {
    fontSize: hp(3),
    color: COLORS.secondary,
    marginTop: hp(3),
    marginBottom: hp(1),
    fontFamily: "semi-bold",
  },
  placeholderstyle: {
    fontSize: 16,
    width: "90%",
    fontFamily: "regular",
  },
  input_field: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLORS.light_gray,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  sub_txt: {
    fontSize: hp(1.8),
    color: COLORS.dark_gray,
    marginBottom: hp(5),
    fontFamily: "medium-bold",
  },
  txt_input_container: {
    display: "flex",
    flexDirection: "column",
  },
  btn_container: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    marginTop: hp(4),
  },
  btn_txt: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.white,
    fontFamily: "semi-bold",
  },
});
