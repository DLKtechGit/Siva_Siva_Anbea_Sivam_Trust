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
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/apiconfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Feather";
import { COLORS } from "../components/constants";
import { CustomFonts } from "../components/CustomFonts";
import Toast from "react-native-toast-message";
import { storeuser } from "../utils/auth";
import { useAuth } from "../context/authcontext";


const LoginScreen = ({ navigation }) => {
  const [showpassword, setshowpassword] = useState(false);
  const [login, setlogin] = useState(false);
  const {loginUser} = useAuth();
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState({
    email: "",
    password: "",
  });

  const handlechange = (field, value) => {
    setlogindata({ ...logindata, [field]: value });
    seterror({ ...error, [field]: "" });
  };

  const validation = () => {
    let isvalid = true;
    let newerror = { ...error };
    // email validation
    if (!logindata.email || logindata.email.trim() === "") {
      newerror.email = "This field is required";
      isvalid = false;
    }
    // password validation
    if (!logindata.password || logindata.password.trim() === "") {
      newerror.password = "This field is required";
      isvalid = false;
    } else if (logindata.password.trim().length < 8) {
      newerror.password = "Password must be 8 characters";
      isvalid = false;
    }
    seterror(newerror);
    return isvalid;
  };

  const handlelogin = async () => {
    if (validation()) {
      setlogin(true); //button text state
      //prettier-ignore
      try {
        const response = await axios.post(`${BASE_URL}/login`, logindata);
        const {id,token} = response.data.data;
        const accessToken = token.access_token
        await (loginUser(accessToken))
        await storeuser(JSON.stringify(id),JSON.stringify(accessToken));
        // console.log('user id is',id ,'Token is',accessToken);        
        // console.log("logged in successfully", response.data);             
        setlogindata("");
        navigation.replace("MainScreen");
      } 
      catch (error) {
        if (error.response.status === 503) {
          Toast.show({
            type: "error",
            text1: "Something went wrong",
            autoHide: true,
            visibilityTime: 2500,
            position: "top",
            topOffset: 0,
            swipeable: true,
          });
        } 
        else {
          Toast.show({
            type: "error",
            text1: "Username or password incorrect",
            autoHide: true,
            visibilityTime: 2500,
            position: "top",
            topOffset: 0,
            swipeable: true,
          });
        }
        console.log("error is : ", error);
      } 
      finally {
        setlogin(false);
      }
    }
  };

  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
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
                value={logindata.email}
                onChangeText={(text) => handlechange("email", text)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {error.email ? (
              <Text style={styles.err_msg}>{error.email}</Text>
            ) : null}
            {/* password field */}
            <View style={styles.input_field}>
              <TextInput
                placeholder="Password"
                style={styles.placeholderstyle}
                secureTextEntry={!showpassword}
                placeholderTextColor={COLORS.dark_gray}
                value={logindata.password}
                onChangeText={(text) => handlechange("password", text)}
              />
              <Icon2
                name={showpassword ? "eye" : "eye-off"}
                size={20}
                color={COLORS.dark_gray}
                onPress={() => setshowpassword(!showpassword)}
              />
            </View>
            {error.password ? (
              <Text style={styles.err_msg}>{error.password}</Text>
            ) : null}
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
              // onPress={() => navigation.navigate("MainScreen")}
              onPress={handlelogin}
            >
              <Text style={styles.btn_txt}>
                {login ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  "Login"
                )}
              </Text>
            </TouchableOpacity>
            {/* sign up btn */}
            <TouchableOpacity
              style={styles.btn_container}
              onPress={() => navigation.navigate("Sign-up")}
            >
              <Text style={styles.btn_txt}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <Toast />
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
    // paddingBottom: 50,
    flex: 1,
  },
  icon_container: {
    marginTop: hp(4),
  },
  main_txt: {
    fontSize: wp(10),
    color: COLORS.secondary,
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
    paddingTop: hp(3),
  },
  img: {
    width: "100%",
    height: 250,
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
    fontFamily: "semi-bold",
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
    fontFamily: "semi-bold",
    color: COLORS.primary,
  },
  main_btn_container: {
    display: "flex",
    flexDirection: "column",
    gap: hp(2),
    marginTop: hp(2),
  },
  err_msg: {
    color: COLORS.err_clr,
    fontSize: 12,
    marginTop: -33,
    // marginBottom: 10,
  },
});
