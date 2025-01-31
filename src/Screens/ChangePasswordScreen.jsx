import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { BASE_URL } from "../utils/apiconfig";
import { getToken } from "../utils/auth";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = ({ navigation }) => {
  const [showpassword, setshowpassword] = React.useState(false);
  const [confirmpassword, setconfirmpassword] = React.useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const handlechange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  const updatePassword = async () => {
    if (
      passwordData.password == "" ||
      passwordData.password_confirmation == ""
    ) {
      Toast.show({
        type: "error",
        text1: "All fields are required!",
        autoHide: true,
        visibilityTime: 2500,
        position: "top",
        topOffset: 0,
        swipeable: true,
      });
    } else if (passwordData.password != passwordData.password_confirmation) {
      Toast.show({
        type: "error",
        text1: "Password miss matched",
        autoHide: true,
        visibilityTime: 2500,
        position: "top",
        topOffset: 0,
        swipeable: true,
      });
    } else {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await axios.post(
          `${BASE_URL}/update_password`,
          passwordData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setIsLoading(false);
          Toast.show({
            type: "success",
            text1: response.data.message,
            autoHide: true,
            visibilityTime: 2500,
            position: "top",
            topOffset: 0,
            swipeable: true,
          });
          setPasswordData({
            current_password: "",
            password: "",
            password_confirmation: "",
          });
        } else {
          Toast.show({
            type: "error",
            text1: response.data.message,
            autoHide: true,
            visibilityTime: 2500,
            position: "top",
            topOffset: 0,
            swipeable: true,
          });
        }
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Current password is incorrect",
          autoHide: true,
          visibilityTime: 2500,
          position: "top",
          topOffset: 0,
          swipeable: true,
        });
      }
    }
  };

  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }

  if (IsLoading) {
    return (
      <View style={styles.loader_container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView style={safe_area_style.androidsafearea}>
      {/* main container */}
      <View style={styles.main_container}>
        <Toast />
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
              value={passwordData.current_password}
              onChangeText={(text) => handlechange("current_password", text)}
            />
          </View>
          {/* new password */}
          <View style={styles.input_field}>
            <TextInput
              placeholder="Enter new password"
              style={styles.placeholderstyle}
              secureTextEntry={!showpassword}
              value={passwordData.password}
              onChangeText={(text) => handlechange("password", text)}
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
              value={passwordData.password_confirmation}
              onChangeText={(text) =>
                handlechange("password_confirmation", text)
              }
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
            onPress={updatePassword}
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
  loader_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
