import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import safe_area_style from "../components/safe_area_style";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Feather";
import { COLORS } from "../components/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomFonts } from "../components/CustomFonts";

const SignupScreen = ({ navigation }) => {
  const [showpassword, setshowpassword] = React.useState(false);

  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }
  return (
    <SafeAreaView style={safe_area_style.androidsafearea}>
      {/* main container */}
      <View style={styles.main_container}>
        <View style={styles.icon_container}>
          <Icon
            name="arrowleft"
            size={30}
            color={COLORS.secondary}
            onPress={() => navigation.navigate("Front")}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* text container */}
          <View style={styles.txt_container}>
            <Text style={styles.main_txt}>Hi!</Text>
            <Text style={styles.sub_txt}>Create a new account</Text>
          </View>
          {/* image container */}
          <View style={styles.img_container}>
            <Image
              source={require("../Assets/signup_dr.jpg")}
              style={styles.img}
            />
          </View>
          {/* input fields */}
          <View style={styles.input_field_container}>
            {/* name field */}
            <View style={styles.input_field}>
              <TextInput placeholder="Name" style={styles.placeholderstyle} />
            </View>
            {/* email field */}
            <View style={styles.input_field}>
              <TextInput placeholder="Email" style={styles.placeholderstyle} />
            </View>
            {/* password field */}
            <View style={styles.input_field}>
              <TextInput
                placeholder="Password"
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
          </View>
          {/* sign up btn */}
          <TouchableOpacity style={styles.btn_container}>
            <Text style={styles.btn_txt}>Sign up</Text>
          </TouchableOpacity>
          {/* already have account txt section */}
          <View>
            <Text style={styles.have_acc_txt_btn}>
              Already have an account? &nbsp;
              <Text
                style={styles.sign_in_txt}
                onPress={() => navigation.navigate("Login")}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  main_container: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 50,
  },

  main_txt: {
    fontSize: wp(10),
    color: COLORS.primary,
    fontFamily: "semi-bold",
  },
  sub_txt: {
    fontSize: 16,
    color: COLORS.dark_gray,
    fontFamily: "medium-bold",
  },
  txt_container: {
    display: "flex",
    flexDirection: "column",
    marginTop: hp(3),
  },
  img: {
    width: "100%",
    height: hp(30),
  },
  img_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
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
  input_field_container: {
    // paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    gap: hp(5),
  },
  btn_container: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 50,
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  btn_txt: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.white,
    fontFamily: "semi-bold",
  },
  have_acc_txt_btn: {
    fontSize: 15,
    color: COLORS.dark_gray,
    fontFamily: "semi-bold",
  },
  sign_in_txt: {
    color: COLORS.primary,
  },
});
