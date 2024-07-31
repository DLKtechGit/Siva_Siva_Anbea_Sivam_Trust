import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "./constants";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import { CustomFonts } from "./CustomFonts";

const ServiceSelection = () => {
  const navigation = useNavigation();
  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }

  return (
    //  main container
    <View style={styles.main_sub_container}>
      {/* header txt container */}
      <View style={styles.header_txt_container}>
        <Text style={styles.header_txt}>Select Services</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("My Bookings")}
          style={styles.view_bookings_btn_container}
        >
          <Text style={styles.header_sub_txt}>View Bookings</Text>
          <Icon name="chevron-right" color={COLORS.white} size={15} />
        </TouchableOpacity>
      </View>
      {/* service main container */}
      <View style={{ display: "flex", flexDirection: "column" }}>
        {/*first service container */}
        <View style={styles.service_sub_container}>
          {/* doctor */}
          <Pressable
            style={styles.service_container}
            onPress={() => navigation.navigate("Doctor")}
          >
            <View style={styles.icon_container}>
              <Image
                source={require("../Assets/doctor-png.png")}
                style={styles.icons}
              />
            </View>
            <Text style={styles.service_name}>Doctors</Text>
          </Pressable>

          {/*  Yoga Class */}
          <Pressable
            style={styles.service_container}
            onPress={() => navigation.navigate("Yoga")}
          >
            <View style={styles.icon_container}>
              <Image
                source={require("../Assets/yoga.png")}
                style={styles.icons}
              />
            </View>
            <Text style={styles.service_name}> Yoga Class</Text>
          </Pressable>

          {/* Spiritual */}
          <Pressable
            style={styles.service_container}
            onPress={() => navigation.navigate("Spiritual")}
          >
            <View style={styles.icon_container}>
              <Image
                source={require("../Assets/spiritual1.png")}
                style={styles.spiritual_icons}
              />
            </View>
            <Text style={styles.service_name}>Spiritual</Text>
          </Pressable>
        </View>
        {/* second service container */}
        <View style={styles.service_sub_container}>
          {/* Astrology */}
          <Pressable
            style={styles.service_container}
            onPress={() => navigation.navigate("Astrology")}
          >
            <View style={styles.icon_container}>
              <Image
                source={require("../Assets/astro1.png")}
                style={styles.astrology_icons}
              />
            </View>
            <Text style={styles.service_name}>Astrology</Text>
          </Pressable>

          {/* Meditation */}
          <Pressable
            style={styles.service_container}
            onPress={() => navigation.navigate("Meditation")}
          >
            <View style={styles.icon_container}>
              <Image
                source={require("../Assets/meditation1.png")}
                style={styles.meditation_icons}
              />
            </View>
            <Text style={styles.service_name}>Meditation</Text>
          </Pressable>

          {/* Others */}
          <Pressable
            style={styles.service_container}
            onPress={() => navigation.navigate("OtherServiceBooking")}
          >
            <View style={styles.icon_container}>
              <Image
                source={require("../Assets/others1.png")}
                style={styles.icons}
              />
            </View>
            <Text style={styles.service_name}>General Questions</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ServiceSelection;

const styles = StyleSheet.create({
  main_sub_container: {
    paddingHorizontal: 15,
  },
  header_txt: {
    fontSize: hp(2),
    color: COLORS.white,
    fontFamily: "regular",
  },
  header_sub_txt: {
    color: COLORS.white,
    fontFamily: "medium-bold",
    fontSize: 13,
  },
  icons: {
    width: wp(12.8),
    height: hp(6),
  },
  astrology_icons: {
    width: wp(17),
    height: hp(8),
  },
  meditation_icons: {
    width: wp(16),
    height: hp(5.5),
  },
  spiritual_icons: {
    width: wp(16),
    height: hp(7.3),
  },
  icon_container: {
    width: wp(22),
    height: hp(10),
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  service_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  service_sub_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: wp(5),
    marginVertical: 12,
  },
  service_name: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.dark_gray,
  },
  header_txt_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    marginVertical: 10,
  },
  view_bookings_btn_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
