import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "./constants";
import { step } from "../Data/StepsData";
import { CustomFonts } from "./CustomFonts";

const StepsComp = () => {
  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }

  return (
    <View style={styles.main_container}>
      {/* header txt container */}
      <View style={styles.header_txt_container}>
        <Text style={styles.header_txt}>Steps to follow</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.main_steps_container}>
          {step.map((item, i) => (
            <View key={i} style={styles.step_container}>
              <View style={styles.step_content}>
                <View style={styles.step_img_container}>
                  <Image source={item.img} style={styles.step_img} />
                </View>
                <Text style={styles.step_txt}>{item.step_txt}</Text>
                <Text style={styles.main_txt}>{item.main_txt}</Text>
                <Text style={styles.sub_txt}>{item.sub_txt}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default StepsComp;

const styles = StyleSheet.create({
  main_container: {
    padding: 15,
    paddingBottom: 30,
  },
  header_txt: {
    fontSize: hp(2),
    color: COLORS.white,
    fontFamily: "regular",
  },

  step_img_container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  step_img: {
    height: 66,
    width: 100,
  },
  main_steps_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  step_content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  step_container: {
    borderColor: COLORS.light_gray,
    borderWidth: 0.7,
    width: 120,
    height: 207,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: COLORS.white,
  },
  step_txt: {
    fontSize: 12,
    marginTop: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 2,
    color: COLORS.white,
    textAlign: "center",
    fontFamily: "semi-bold",
  },
  main_txt: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "semi-bold",
  },
  sub_txt: {
    fontSize: 10,
    color: COLORS.dark_gray,
    paddingTop: 5,
    textAlign: "center",
    paddingHorizontal: 10,
    fontFamily: "regular",
  },
  header_txt_container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    marginBottom: 20,
  },
});
