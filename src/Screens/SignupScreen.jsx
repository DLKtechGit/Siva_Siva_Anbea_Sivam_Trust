import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { Modal } from "react-native";
import React, { useState } from "react";
import safe_area_style from "../components/safe_area_style";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Feather";
import { COLORS } from "../components/constants";
import Toast from "react-native-toast-message";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomFonts } from "../components/CustomFonts";
import axios from "axios";
import { BASE_URL } from "../utils/apiconfig";

const SignupScreen = ({ navigation }) => {
  const [showpassword, setshowpassword] = useState(false); //password visibility
  const [confirmpassword, setconfirmpassword] = useState(false); //confirm password visibility
  const [submitting, setsubmitting] = useState(false); //submit button loader
  const [modalshow, setmodalshow] = useState(false); //modal showing state
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, seterror] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handlechange = (field, value) => {
    setformdata({
      ...formdata,
      [field]: value,
    });
    seterror({
      ...error,
      [field]: "",
    });
  };

  const validation = () => {
    let isvalid = true;
    let newerror = { ...error };

    //name validation
    if (!formdata.name || formdata.name.trim() === "") {
      newerror.name = "Name field is required";
      isvalid = false;
    }
    //email validation
    if (!formdata.email || formdata.email.trim() === "") {
      newerror.email = "Email field is required";
      isvalid = false;
    } else {
      const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegEx.test(formdata.email)) {
        newerror.email = "Please provide valid Email address";
        isvalid = false;
      }
    }
    // password validation
    if (!formdata.password || formdata.password.trim() === "") {
      newerror.password = "This field is required";
      isvalid = false;
    } else if (formdata.password.trim().length < 8) {
      newerror.password = "Password must be at least 8 characters";
      isvalid = false;
    }
    // confirm password
    //prettier-ignore
    if (!formdata.password_confirmation ||formdata.password_confirmation.trim() === "") {
      newerror.password_confirmation = "This field is required";
      isvalid = false;
    } 
    else if (formdata.password.trim() !== formdata.password_confirmation.trim()) {
      newerror.password_confirmation = "Password do not match";
      isvalid = false;
    }

    seterror(newerror);
    return isvalid;
  };

  // form submission
  const handleformsubmit = async () => {
    if (validation()) {
      setsubmitting(true);
      //prettier-ignore
      try {
        const response = await axios.post(`${BASE_URL}/register`, formdata);
        console.log("form submitted successfully", response.data);
        setformdata("");
        setmodalshow(true);
        
      } 
      catch (error) { 
        
        Toast.show({
          type:'error',
          text1:'Email already exist',
          autoHide:true,          
          visibilityTime:3000,
          position:'top',
          topOffset:0
        })
        // alert('email already exist')
        // console.error("Error", error);
      } 
      finally {
        setsubmitting(false);
      }
    }
  };

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
              <TextInput
                placeholder="Name"
                style={styles.placeholderstyle}
                value={formdata.name}
                onChangeText={(text) => handlechange("name", text)}
              />
            </View>
            {error.name ? (
              <Text style={styles.err_msg}>{error.name}</Text>
            ) : null}
            {/* email field */}
            <View style={styles.input_field}>
              <TextInput
                placeholder="Email"
                style={styles.placeholderstyle}
                inputMode="email"
                value={formdata.email}
                onChangeText={(text) => handlechange("email", text)}
                autoCapitalize="none"
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
                value={formdata.password}
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
            {/* confirm password */}
            <View style={styles.input_field}>
              <TextInput
                placeholder="Confirm Password"
                style={styles.placeholderstyle}
                secureTextEntry={!confirmpassword}
                value={formdata.password_confirmation}
                onChangeText={(text) =>
                  handlechange("password_confirmation", text)
                }
              />
              <Icon2
                name={confirmpassword ? "eye" : "eye-off"}
                size={20}
                color={COLORS.dark_gray}
                onPress={() => setconfirmpassword(!confirmpassword)}
              />
            </View>
            {error.password_confirmation ? (
              <Text style={styles.err_msg}>{error.password_confirmation}</Text>
            ) : null}
          </View>
          {/* sign up btn */}
          <TouchableOpacity
            style={styles.btn_container}
            onPress={handleformsubmit}
          >
            <Text style={styles.btn_txt}>
              {submitting ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                "Sign up"
              )}
            </Text>
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
          {/* success modal */}
          <Modal
            transparent={true}
            visible={modalshow}
            onRequestClose={() => setmodalshow(false)}
          >
            {/* modal background */}
            <TouchableWithoutFeedback onPress={() => setmodalshow(false)}>
              <View style={styles.modal_background}>
                {/* modal container */}
                <View style={styles.modal_container}>
                  <Image
                    source={require("../Assets/tick.png")}
                    style={{ width: 70, height: 70, marginBottom: 20 }}
                  />
                  <Text style={styles.reg_txt}>Registration Successful</Text>
                  <TouchableOpacity
                    style={styles.modal_ok_btn_container}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.modal_ok_btn_txt}>OK</Text>
                  </TouchableOpacity>
                  {/* close icon */}
                  <TouchableOpacity
                    style={styles.close_icon}
                    onPress={() => setmodalshow(false)}
                  >
                    <Icon
                      name="closecircle"
                      size={20}
                      color={"rgba(0,0,0,0.40)"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Toast />
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
    paddingVertical: 10,
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
    marginBottom: hp(2),
  },
  input_field_container: {
    // paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    gap: hp(2),
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
  err_msg: {
    color: COLORS.err_clr,
    fontSize: 12,
    marginTop: -23,
    marginBottom: 10,
  },
  modal_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    width: 300,
    paddingVertical: 20,
    gap: 10,
    borderRadius: 15,
    position: "relative",
  },
  modal_background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  reg_txt: {
    fontSize: 22,
    fontFamily: "bold",
  },
  modal_ok_btn_container: {
    backgroundColor: COLORS.primary,
    width: 100,
    borderRadius: 6,
  },
  modal_ok_btn_txt: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "semi-bold",
    padding: 5,
  },
  close_icon: {
    position: "absolute",
    top: 7,
    right: 7,
  },
});
