import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { COLORS } from "./constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { CustomFonts } from "./CustomFonts";

const DatePicker = () => {
  const [selecteddate, setselecteddate] = useState("");
  const [showtiming, setshowtiming] = useState(false);
  const [selectedtime, setselectedtime] = useState(null);

  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

  const timings = [
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
    "7:00 PM",
  ];

  const handledate = (date) => {
    setselecteddate(date.dateString);
    setshowtiming(true);
  };

  const handledatebtn = (i) => {
    setselectedtime(i === selectedtime ? null : i);
    // console.log(i);
  };

  return (
    <>
      <View style={styles.main_container}>
        <Calendar
          onDayPress={handledate}
          markedDates={{
            [selecteddate]: { selected: true, selectedColor: COLORS.primary },
          }}
          minDate={new Date().toISOString().split("T")[0]}
        />
        {/* timing main container */}
        {showtiming && (
          <View style={styles.timings_main_container}>
            <Text style={styles.timings_heading}>
              Available timings for {selecteddate}
            </Text>
            {/* time container */}
            <View style={styles.timing_container}>
              {timings.map((time, i) => (
                <TouchableOpacity
                  style={[
                    styles.timings_sub_container,
                    i === selectedtime && styles.selected_timings_sub_container,
                  ]}
                  key={i}
                  onPress={() => handledatebtn(i)}
                >
                  <Text
                    style={[
                      styles.timing_txt,
                      i === selectedtime && styles.selected_timing_txt,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
    borderWidth: 0.5,
    borderColor: COLORS.light_gray,
    marginBottom: 15,
  },
  timings_main_container: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderTopColor: COLORS.light_gray,
    borderTopWidth: 0.5,
    paddingBottom: 5,
    marginTop: 15,
    paddingTop: 10,
  },
  timings_heading: {
    textAlign: "center",
    fontSize: hp(2.2),
    fontFamily: "medium-bold",
    color: COLORS.dark_gray,
    marginBottom: hp(1.5),
  },
  timings_sub_container: {
    backgroundColor: COLORS.white,
    padding: 7,
    width: wp(25),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: hp(1.4),
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  selected_timings_sub_container: {
    backgroundColor: COLORS.primary,
    padding: 7,
    width: wp(25),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: hp(1.4),
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  timing_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: wp(2),
    flexWrap: "wrap",
  },
  timing_txt: {
    color: COLORS.primary,
    fontSize: hp(1.9),
    fontFamily: "semi-bold",
  },
  selected_timing_txt: {
    color: COLORS.white,
    fontSize: hp(1.9),
    fontFamily: "semi-bold",
  },
});
