import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { COLORS } from "./constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomFonts } from "./CustomFonts";

const GenderToggle = () => {
  const [maletoggle, setmaletoggle] = useState(false);
  const [femaletoggle, setfemaletoggle] = useState(false);
  const [otherstoggle, setotherstoggle] = useState(false);

  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

  const handlemaletoggle = () => {
    setmaletoggle(!maletoggle);
    if (femaletoggle || otherstoggle) {
      setfemaletoggle(false);
      setotherstoggle(false);
    }
  };
  const handlefemaletoggle = () => {
    setfemaletoggle(!femaletoggle);
    if (maletoggle || otherstoggle) {
      setmaletoggle(false);
      setotherstoggle(false);
    }
  };
  const handleotherstoggle = () => {
    setotherstoggle(!otherstoggle);
    if (maletoggle || femaletoggle) {
      setmaletoggle(false);
      setfemaletoggle(false);
    }
  };

  return (
    <View style={styles.main_toggle_container}>
      {/* male */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={maletoggle}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handlemaletoggle}
        />
        <Text style={styles.label}>Male</Text>
      </View>
      {/* male */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={femaletoggle}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handlefemaletoggle}
        />
        <Text style={styles.label}>Female</Text>
      </View>
      {/* others */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={otherstoggle}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handleotherstoggle}
        />
        <Text style={styles.label}>Others</Text>
      </View>
    </View>
  );
};

export default GenderToggle;

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
