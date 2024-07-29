import { Pressable, StyleSheet, Image, Text, Alert } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "./constants";
import * as DocumentPicker from "expo-document-picker";
import { CustomFonts } from "./CustomFonts";

const FileUpload = () => {
  const [file, setfile] = useState(null);

  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

  const pickdocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",        
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/*"
      ],
    });
    console.log(result);
    setfile(result)
    // Alert.alert('File uploaded successfully')
  };

  return (
    <Pressable style={styles.img_container} onPress={pickdocument}>
      <Image source={require("../Assets/file.png")} style={styles.img} />
      <Text style={styles.file_upload_txt}>Click to upload file</Text>
    </Pressable>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  img: {
    width: wp(15),
    height: hp(7),
    opacity:0.5
  },
  img_container: {
    backgroundColor: COLORS.white,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
  },
  file_upload_txt: {
    fontWeight: "600",
    color: COLORS.dark_gray,
    fontFamily:'medium-bold'
  },
});
