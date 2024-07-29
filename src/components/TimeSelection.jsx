import { StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "./constants";

const TimeSelection = () => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    setTimeSelected(true);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <>
      <Pressable onPress={handleOpen} style={styles.text_input}>
        <Text>{timeSelected ? formatTime(time) : "HH:MM AM/PM"}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default TimeSelection;

const styles = StyleSheet.create({
  text_input: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
