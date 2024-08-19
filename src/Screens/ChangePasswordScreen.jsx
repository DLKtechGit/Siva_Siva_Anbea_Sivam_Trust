import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../components/constants";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Feather";
import { CustomFonts } from "../components/CustomFonts";
import safe_area_style from "../components/safe_area_style";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePasswordScreen = ({ navigation }) => {
  const [showpassword, setshowpassword] = React.useState(false);
  const [confirmpassword, setconfirmpassword] = React.useState(false);

  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }

  return (
    <SafeAreaView style={safe_area_style.androidsafearea}>
      {/* main container */}
      <View style={styles.main_container}>
        {/* navigation container */}
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Icon name="arrowleft" size={30} color={COLORS.secondary} />
        </Pressable>
        {/* text and input field container */}
        <View style={styles.txt_input_container}>
          <Text style={styles.main_txt}>Change password</Text>
          {/* <Text style={styles.sub_txt}>
            Enter your old password
          </Text> */}
          {/* input field */}
          {/* old password */}
          <View style={styles.input_field}>
            <TextInput
              placeholder="Enter old password"
              style={styles.placeholderstyle}
              inputMode="email"
            />
          </View>
          {/* new password */}
          <View style={styles.input_field}>
            <TextInput
              placeholder="Enter new password"
              style={styles.placeholderstyle}
              secureTextEntry={!showpassword}
            />
            <Icon2
              name={showpassword ? "eye" : "eye-off"}
              size={20}
              color={COLORS.dark_gray}
              onPress={() => setshowpassword(!showpassword)}
            />
          </View>
          {/* confirm password */}
          <View style={styles.input_field}>
            <TextInput
              placeholder="Confirm password"
              style={styles.placeholderstyle}
              secureTextEntry={!confirmpassword}
            />
            <Icon2
              name={showpassword ? "eye" : "eye-off"}
              size={20}
              color={COLORS.dark_gray}
              onPress={() => setconfirmpassword(!confirmpassword)}
            />
          </View>

          {/* verify button */}
          <TouchableOpacity
            style={styles.btn_container}
            onPress={() => alert("password saved successfully")}
          >
            <Text style={styles.btn_txt}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  main_container: {
    padding: 15,
  },
  main_txt: {
    fontSize: hp(3),
    color: COLORS.secondary,
    marginTop: hp(3),
    marginBottom: hp(4),
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
    marginBottom: 30,
  },
  sub_txt: {
    fontSize: hp(1.8),
    color: COLORS.dark_gray,
    marginBottom: hp(1),
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
    marginTop: hp(1),
  },
  btn_txt: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.white,
    fontFamily: "semi-bold",
  },
});
