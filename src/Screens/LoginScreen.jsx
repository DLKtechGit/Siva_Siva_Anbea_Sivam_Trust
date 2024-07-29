import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, {useState} from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Feather";
import { COLORS } from "../components/constants";
import {CustomFonts} from "../components/CustomFonts"

const LoginScreen = ({ navigation }) => {  
  const [showpassword, setshowpassword] =useState(false); 
  
  const loadedfonts = CustomFonts();
  if(!loadedfonts){
    return(null)
  }
 
  return (
    <ImageBackground
      source={require("../Assets/floral-bg.jpg")}
      style={{ flex: 1, overflow: "hidden" }}
    >
      <View style={styles.main_container}>
        {/* arrow left container */}
        <View style={styles.icon_container}>
          <Icon
            name="arrowleft"
            size={30}
            color={COLORS.secondary}
            onPress={() => navigation.navigate("Front")}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* txt container */}
          <View style={styles.txt_container}>
            <Text style={styles.main_txt}>Welcome!</Text>
            <Text style={styles.sub_txt}>Login to continue...</Text>
          </View>
          {/* image container */}
          <View style={styles.img_container}>
            <Image
              source={require("../Assets/login_dr.png")}
              style={styles.img}
            />
          </View>
          {/* input fields */}
          <View style={styles.input_field_container}>
            {/* email field */}
            <View style={styles.input_field}>
              <TextInput
                placeholder="Email"
                style={styles.placeholderstyle}
                placeholderTextColor={COLORS.dark_gray}
              />
            </View>
            {/* password field */}
            <View style={styles.input_field}>
              <TextInput
                placeholder="Password"
                style={styles.placeholderstyle}
                secureTextEntry={!showpassword}
                placeholderTextColor={COLORS.dark_gray}
              />
              <Icon2
                name={showpassword ? "eye" : "eye-off"}
                size={20}
                color={COLORS.dark_gray}
                onPress={() => setshowpassword(!showpassword)}
              />
            </View>
          </View>
          {/* forgot password */}
          <Pressable
            style={styles.forget_btn_container}
            onPress={() => navigation.navigate("Forget")}
          >
            <Text style={styles.forget_password_txt}>Forgot password?</Text>
          </Pressable>
          {/* button container */}
          <View style={styles.main_btn_container}>
            {/* login btn */}
            <TouchableOpacity
              style={styles.btn_container}
              onPress={() => navigation.navigate("MainScreen")}
            >
              <Text style={styles.btn_txt}>Login</Text>
            </TouchableOpacity>
            {/* sign up btn */}
            <TouchableOpacity
              style={styles.btn_container}
              onPress={() => navigation.navigate("Sign-up")}
            >
              <Text style={styles.btn_txt}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main_container: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 50,
  },
  icon_container: {
    marginTop: hp(4),
  },
  main_txt: {
    fontSize: wp(10),   
    color: COLORS.secondary,
    fontFamily:'semi-bold'
  },
  sub_txt: {
    fontSize: 16,    
    color: COLORS.dark_gray,
    fontFamily:'medium-bold',    
  },
  txt_container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: hp(3),
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
    fontFamily:'regular'
  },
  input_field: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLORS.dark_gray,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  input_field_container: {
    // paddingHorizontal:15,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    gap: hp(5),
  },
  forget_password_txt: {
    fontSize: 15,    
    color: COLORS.secondary,
    fontFamily:'semi-bold'
  },
  forget_btn_container: {
    marginVertical: 10,
  },
  btn_container: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 50,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  btn_txt: {
    textAlign: "center",
    fontSize: 18,
   fontFamily:'semi-bold',
    color: COLORS.primary,
  },
  main_btn_container: {
    display: "flex",
    flexDirection: "column",
    gap: hp(3),
    marginVertical: hp(3),
  },
});
