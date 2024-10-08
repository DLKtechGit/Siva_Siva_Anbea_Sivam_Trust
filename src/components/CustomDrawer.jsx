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

          <View style={{ paddingTop: 20 }}>
            <DrawerItemList {...props} />
          </View>

          {/* social icons container */}
          <View style={styles.social_icons_container}>
            {/* FB */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.facebook.com/sivasivaambaesivam/");
              }}
            >
              <Image
                source={require("../Assets/fb.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>

            {/* insta */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  "https://www.instagram.com/siva_sivaanbaesivam_offical?igsh=NXBhYjk0YXhsaDE1"
                );
              }}
            >
              <Image
                source={require("../Assets/insta.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>

            {/* X */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  "https://twitter.com/sivaanbe1?t=kTE-0N2y-I9fwfQrx1rECw&s=09"
                );
              }}
            >
              <Image
                source={require("../Assets/x.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>

            {/* Whatsapp */}
            <TouchableOpacity>
              <Image
                source={require("../Assets/whatsapp.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>

            {/* telegram */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://t.me/sivasivaambaesiva");
              }}
            >
              <Image
                source={require("../Assets/telegram.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>

            {/* Youtube */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  "https://youtube.com/@sivasivaanbaesivamoffical"
                );
              }}
            >
              <Image
                source={require("../Assets/youtube.png")}
                style={styles.social_icons}
              />
            </TouchableOpacity>

            {/* web */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  "https://www.sivasivaanbaesivam.com"
                );
              }}
            >
              <Image
                source={require("../Assets/web.png")}
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
    gap: 15,
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
