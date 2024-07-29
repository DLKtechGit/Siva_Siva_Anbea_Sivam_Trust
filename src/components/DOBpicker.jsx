import {
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "./constants";

const DOBpicker = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDateSelected(true);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <>
      <Pressable onPress={handleOpen} style={styles.text_input}>
        <Text>{dateSelected ? date.toLocaleDateString() : "DD/MM/YYYY"}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          // display="spinner"
          onChange={onChange}   
                        
        />
      )}
    </>
  );
};

export default DOBpicker;

const styles = StyleSheet.create({
  text_input: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
