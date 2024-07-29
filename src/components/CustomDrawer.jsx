import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "./constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fontawesome from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../Assets/home-bg5.png")}
      style={{ flex: 1 }}
    >
      <View style={styles.main_nav_container}>
        <DrawerContentScrollView {...props} contentContainerStyle={{}}>
          <View style={styles.profile_container}>
            {/* image container */}
            <View style={{ position: "relative" }}>
              <Image
                source={require("../Assets/profile_pic.jpg")}
                style={styles.user_profile_img}
              />
              {/* edit profile icon */}
              <TouchableOpacity
                style={styles.edit_icon_container}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../Assets/edit-icon1.png")}
                  style={styles.edit_icon}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.user_name}>Tommy Shelby</Text>
              <Text style={styles.user_email}>tommy89@gmail.com</Text>
            </View>
          </View>
          {/* edit profile icon */}
          {/* <TouchableOpacity
            style={{ position: "absolute", top: 0, right: 10, marginTop: -40 }}
          >
            <Image
              source={require("../Assets/edit-icon.png")}
              style={styles.edit_icon}
            />
          </TouchableOpacity> */}

          <View style={{ paddingTop: 20 }}>
            <DrawerItemList {...props} />
          </View>

          {/* social icons */}
          <View style={styles.social_icons_container}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.facebook.com/");
              }}
            >
              {/* <Fontawesome name="facebook-square" size={25} /> */}
              <Image
                source={require("../Assets/fb.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              {/* <Icon2 name="square-x-twitter" size={25} /> */}
              <Image
                source={require("../Assets/insta.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              {/* <Icon2 name="square-instagram" size={25} /> */}
              <Image
                source={require("../Assets/x.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              {/* <Icon2 name="linkedin" size={25} /> */}
              <Image
                source={require("../Assets/linkedin.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>

        <TouchableOpacity
          style={styles.bottom_txt_container}
          onPress={() => navigation.navigate("T&C")}
        >
          <Text style={styles.bottom_main_txt}>
            T&C | Privacy & Refund policy
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  main_nav_container: {
    flex: 1,
  },
  profile_container: {
    padding: 20,
    paddingVertical: hp(3),
    borderBottomColor: COLORS.light_gray,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,

    // justifyContent:'center'
    // marginBottom: hp(2),
  },
  user_profile_img: {
    width: wp(20),
    height: hp(10),
    borderRadius: 15,
  },
  user_name: {
    color: COLORS.black,
    fontSize: hp(2),
    fontFamily: "semi-bold",
  },
  user_email: {
    fontFamily: "medium-bold",
  },
  bottom_txt_container: {
    padding: 20,
    borderTopColor: COLORS.light_gray,
    borderTopWidth: 1,
  },
  bottom_main_txt: {
    fontSize: 12.5,
    color: COLORS.black,
    fontFamily: "regular",
  },
  social_icons_container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  social_icons: {
    width: 20,
    height: 20,
  },
  edit_icon: {
    width: 25,
    height: 25,
  },
  edit_icon_container: {
    position: "absolute",
    bottom: -7,
    right: -7,
    backgroundColor: COLORS.white,
    borderRadius: 50,
  },
});
