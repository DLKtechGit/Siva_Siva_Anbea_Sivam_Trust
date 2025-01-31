import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../components/constants";
import DOBpicker from "../components/DOBpicker";
import GenderToggle from "../components/GenderToggle";
import ServiceToggle from "../components/ServiceToggle";
import FileUpload from "../components/FileUpload";
import DatePicker from "../components/DatePicker";
import Signature from "../components/Signature";
import Payment2 from "../components/Payment2";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const FormScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.main_container}>
      <Text>hello</Text>
    </View>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  txt_container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: hp(1),
    paddingBottom: hp(3),
    gap: hp(1),
  },
  main_heading_txt: {
    textAlign: "center",
    fontSize: wp(7),
    fontWeight: "700",
    color: COLORS.primary,
  },
  main_sub_txt: {
    textAlign: "center",
    fontSize: 14,
  },
  text_input: {
    backgroundColor: COLORS.white,
    padding: 8,
    borderColor: COLORS.light_gray,
    borderWidth: 1,
    borderRadius: 10,
  },
  reason_text_input: {
    height: hp(11),
    backgroundColor: COLORS.white,
    padding: 8,
    borderColor: COLORS.light_gray,
    borderWidth: 1,
    borderRadius: 10,
  },
  main_input_container: {
    display: "flex",
    flexDirection: "column",
    gap: hp(3),
    padding: 15,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  input_container: {
    display: "flex",
    flexDirection: "column",
    gap: hp(1),
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.black,
  },
  sign_input_container: {
    // marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    gap: hp(1.5),
  },
  nav_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: wp(5),
    padding: 15,
    paddingTop: 40,
  },
});
