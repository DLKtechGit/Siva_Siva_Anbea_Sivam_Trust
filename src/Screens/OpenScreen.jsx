import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "../components/constants";
import { CustomFonts } from "../components/CustomFonts";
const OpenScreen = ({ navigation }) => {
  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }
  return (
    <ImageBackground
      source={require("../Assets/floral-bg.jpg")}
      style={styles.main_container}
    >
      {/* second main section */}
      <View style={styles.img_container}>
        <Image source={require("../Assets/open_img.png")} style={styles.img} />
      </View>
      {/* second section */}
      <View style={styles.second_section}>
        {/* txt field */}
        <Text style={styles.main_txt}>Welcome to Siva Siva Anbe Sivam</Text>
        <Text style={styles.sub_txt}>
          Empowering Health and Serenity through Medicine, Yoga, and
          Personalized Care.
        </Text>
        {/* button field */}
        {/* login button */}
        <TouchableOpacity
          style={styles.login_btn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.login_btn_txt}>Login</Text>
        </TouchableOpacity>
        {/* sign-up button */}
        <TouchableOpacity
          style={styles.signup_btn}
          onPress={() => navigation.navigate("Sign-up")}
        >
          <Text style={styles.signup_btn_txt}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OpenScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: hp(5),
  },
  img: {
    width: "100%",
    height: hp(45),
  },
  img_container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  second_section: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  main_txt: {
    fontSize: wp(8),
    // fontWeight: "600",
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: "bold",
  },
  sub_txt: {
    fontSize: 14.5,
    textAlign: "center",
    paddingTop: 15,
    fontFamily: "semi-bold",
    color: COLORS.dark_gray,
  },
  login_btn: {
    backgroundColor: COLORS.primary,
    padding: 13,
    borderRadius: 50,
    marginTop: hp(5),
  },
  signup_btn: {
    backgroundColor: COLORS.white,
    padding: 11,
    borderRadius: 50,
    borderColor: COLORS.primary,
    borderWidth: 3,
    marginTop: hp(3),
  },
  login_btn_txt: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.white,
    fontFamily: "semi-bold",
  },
  signup_btn_txt: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: "semi-bold",
  },
});
