import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "./constants";
import DoctorList from "../components/ServicesList/DoctorList";

const ServiceToggle = () => {
  const [doctor, setdoctor] = useState(false);
  const [yoga, setyoga] = useState(false);
  const [spritual, setspritual] = useState(false);
  const [astrology, setastrology] = useState(false);
  const [meditation, setmeditation] = useState(false);
  const [others, setothers] = useState(false);
  // doctor
  const handledoctor = () => {
    setdoctor(!doctor);
    if (yoga || spritual || astrology || meditation || others) {
      setyoga(false);
      setspritual(false);
      setastrology(false);
      setmeditation(false);
      setothers(false);
    }
  };
  //   yoga
  const handleyoga = () => {
    setyoga(!yoga);
    if (doctor || spritual || astrology || meditation || others) {
      setdoctor(false);
      setspritual(false);
      setastrology(false);
      setmeditation(false);
      setothers(false);
    }
  };
  //   spritual
  const handlespritual = () => {
    setspritual(!spritual);
    if (yoga || doctor || astrology || meditation || others) {
      setdoctor(false);
      setyoga(false);
      setastrology(false);
      setmeditation(false);
      setothers(false);
    }
  };
  //   astrology
  const handleastrology = () => {
    setastrology(!astrology);
    if (yoga || spritual || doctor || meditation || others) {
      setdoctor(false);
      setyoga(false);
      setspritual(false);
      setmeditation(false);
      setothers(false);
    }
  };
  //   meditation
  const handlemeditation = () => {
    setmeditation(!meditation);
    if (yoga || spritual || astrology || doctor || others) {
      setastrology(false);
      setdoctor(false);
      setyoga(false);
      setspritual(false);
      setothers(false);
    }
  };
  //   others
  const handleothers = () => {
    setothers(!others);
    if (yoga || spritual || astrology || meditation || doctor) {
      setastrology(false);
      setdoctor(false);
      setmeditation(false);
      setyoga(false);
      setspritual(false);
    }
  };
  return (
    <View style={styles.main_toggle_container}>
      {/* toggle container */}
      {/* doctor */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={doctor}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handledoctor}
        />
        <Text style={styles.label}>Doctors</Text>
      </View>
      {doctor && <DoctorList/>}
      {/* yoga class */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={yoga}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handleyoga}
        />
        <Text style={styles.label}>Yoga Class</Text>
      </View>
      {/* spritual */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={spritual}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handlespritual}
        />
        <Text style={styles.label}>Spritual</Text>
      </View>
      {/* astrology */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={astrology}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handleastrology}
        />
        <Text style={styles.label}>Astrology</Text>
      </View>
      {/* meditation */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={meditation}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handlemeditation}
        />
        <Text style={styles.label}>Meditation</Text>
      </View>
      {/* other */}
      <View style={styles.toggle_container}>
        <ToggleSwitch
          isOn={others}
          onColor={COLORS.primary}
          offColor={COLORS.dark_gray}
          size="medium"
          onToggle={handleothers}
        />
        <Text style={styles.label}>Others</Text>
      </View>
    </View>
  );
};

export default ServiceToggle;

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
    fontWeight: "600",
    color: COLORS.black,
  },
});
