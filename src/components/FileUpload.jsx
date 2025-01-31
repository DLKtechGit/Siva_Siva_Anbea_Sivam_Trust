import { Pressable, StyleSheet, Image, Text, Alert, View } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "./constants";
import * as DocumentPicker from "expo-document-picker";
import { CustomFonts } from "./CustomFonts";

const FileUpload = ({ onFileChange }) => {
  const [file, setfile] = useState([]);

  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

  const pickDocument = async (setDocumentState, limit, currentDocuments) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "application/pdf"],
        multiple: true,
      });

      if (result.type === "cancel") {
        Alert.alert(
          "No Document Selected",
          "Please select at least one document."
        );
        return;
      }

      const pickedDocs = result.assets ? result.assets : [result];

      const validDocuments = pickedDocs.filter(
        (doc) =>
          doc.mimeType === "image/jpeg" || doc.mimeType === "application/pdf"
      );

      if (validDocuments.length > 0) {
        if (currentDocuments.length + validDocuments.length > limit) {
          Alert.alert(
            "Document Limit Exceeded",
            `You can only upload up to ${limit} document(s).`
          );
          return;
        }

        setDocumentState((prevDocuments) => [
          ...prevDocuments,
          ...validDocuments,
        ]);
        if (onFileChange) {
          onFileChange(validDocuments[0]);
        }
      } else {
        Alert.alert("Invalid File Type", "Please select a valid file type.");
      }
    } catch (error) {
      console.log("Error picking documents", error);
    }
  };

  const renderDocument = (documents, setDocumentState) => {
    if (!documents || documents.length === 0) return null;

    return documents.map((document, index) => {
      const { uri, mimeType, name } = document;

      return (
        <View key={index} style={styles.doc_container}>
          <Text style={styles.sub_heading_txt}>
            Selected Document {index + 1}
          </Text>

          {mimeType && mimeType.startsWith("image/") ? (
            <View style={styles.doc_img_container}>
              <Image source={{ uri }} style={styles.image} />
            </View>
          ) : (
            <Text style={styles.doc_name}>
              {name ? name : "No name available"}
            </Text>
          )}

          <Pressable
            style={styles.remove_button}
            onPress={() => removeDocument(index, setDocumentState)}
          >
            <Text style={styles.remove_button_text}>Remove</Text>
          </Pressable>
        </View>
      );
    });
  };

  const removeDocument = (index, setDocumentState) => {
    setDocumentState((prevDocuments) =>
      prevDocuments.filter((_, i) => i !== index)
    );
  };

  // const pickdocument = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({
  //     type: [
  //       "application/pdf",
  //       "application/msword",
  //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       "image/*",
  //     ],
  //     multiple:true
  //   });
  //   setfile(result);
  //   if (onFileChange) {
  //     onFileChange(result);
  //   }
  //   // Alert.alert('File uploaded successfully')
  // };

  return (
    <View>
      <Pressable
        style={styles.img_container}
        onPress={() => pickDocument(setfile, 1, file)}
      >
        <Image source={require("../Assets/file.png")} style={styles.img} />
        <Text style={styles.file_upload_txt}>Click to upload file</Text>
      </Pressable>
      {renderDocument(file, setfile)}
    </View>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  img: {
    width: wp(15),
    height: hp(7),
    opacity: 0.5,
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
    fontFamily: "medium-bold",
  },
  doc_container: {
    paddingTop: 10,
    alignItems: "center",
  },
  doc_name: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    color: COLORS.dark_green,
    backgroundColor: COLORS.white,
    padding: 5,
    width: "100%",
    borderRadius: 5,
    borderColor: COLORS.light_green,
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  doc_img_container: {
    width: "100%",
    borderRadius: 5,
    borderColor: COLORS.light_green,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  sub_heading_txt: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  remove_button: {
    backgroundColor: "red",
    padding: 3,
    borderRadius: 5,
    marginTop: 10,
  },
  remove_button_text: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
  },
});
