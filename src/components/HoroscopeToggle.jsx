import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { COLORS } from "./constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomFonts } from "./CustomFonts";
import FileUpload from "./FileUpload";

const HoroscopeToggle = () => {
  const [yeshoroscope, setyeshoroscope] = useState(false);
  const [nohoroscope, setnohoroscope] = useState(false);
  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

  const handleYes = () => {
    setyeshoroscope(!yeshoroscope)
    if(nohoroscope){
        setnohoroscope(false)
    }
  };
  const handleNo = ()=>{
    setnohoroscope(!nohoroscope)
    if(yeshoroscope){
        setyeshoroscope(false)
    }
  }
  return (
    <View style={styles.main_toggle_container}>
      {/* yes */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={yeshoroscope}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handleYes}
        />
        <Text style={styles.label}>Yes</Text>
      </View>
      {yeshoroscope && <FileUpload/>}
      {/* no */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={nohoroscope}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handleNo}
        />
        <Text style={styles.label}>No</Text>
      </View>
    
    </View>
  );
};

export default HoroscopeToggle;

const styles = StyleSheet.create({
  main_toggle_container: {
    display: "flex",
    flexDirection: "column",
    gap: hp(2),
  },
  toggle_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "medium-bold",
    color: COLORS.dark_gray,
  },
});
