import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import SignatureView from "react-native-signature-canvas";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { COLORS } from "./constants";
import { CustomFonts } from "./CustomFonts";

const Signature = () => {
  const [modalvisible, setmodalvisible] = useState(false);
  const ref = useRef();

  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

  const handleSignature = (signature) => {
    // console.log(signature);
    Alert.alert("Signature captured!", "Your signature has been saved.");
  };

  const handleClear = () => {
    ref.current.clearSignature();
    // setmodalvisible(false)
  };

  const handleConfirm = () => {
    ref.current.readSignature();
    Alert.alert("Signature captured!", "Your signature has been save.");
    setmodalvisible(false);
  };

  // const handlesign = ()=>{
  //   setstarted(true)
  // }

  return (
    <>
      <TouchableOpacity
        onPress={() => setmodalvisible(true)}
        style={styles.main_btn_container}
      >
        <Text style={styles.main_btn_txt}>Click here to sign</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalvisible}
        onRequestClose={() => setmodalvisible(false)}
      >
        {/* main container */}
        <View style={styles.main_container}>
          <View style={styles.container}>
            <SignatureView
              ref={ref}
              onOK={handleSignature}
              onEmpty={() => Alert.alert("Empty", "Please provide a signature")}
              descriptionText="Sign"
              clearText="Clear"
              confirmText="Save"
              webStyle={styles.webStyle}
              autoClear={true}
              // onBegin={handlesign}
            />
          </View>
          <View style={styles.buttonContainer}>
            {/* clear btn */}
            <TouchableOpacity
              onPress={handleClear}
              style={styles.btn_container}
            >
              <Text style={styles.btn_txt}>Clear</Text>
            </TouchableOpacity>
            {/* save btn */}
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.btn_container}
            >
              <Text style={styles.btn_txt}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.close_btn_container}
            onPress={() => setmodalvisible(false)}
          >
            <Text style={styles.btn_txt}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default Signature;

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: COLORS.white,
    height: "40%",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    height: hp(22),
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    // borderRadius: 10,
    // borderColor: COLORS.light_gray,
    // borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn_container: {
    backgroundColor: COLORS.primary,
    padding: 5,
    width: "47%",
    marginTop: 10,
    borderRadius: 5,
  },
  btn_txt: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.white,
    fontFamily: "medium-bold",
  },
  main_btn_container: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
  },
  main_btn_txt: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.secondary,
    fontFamily: "medium-bold",
  },
  close_btn_container: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  webStyle: `
      .m-signature-pad--footer {
        display: none;
        margin: 0px;
      }
      .m-signature-pad {
        box-shadow: none;
        border:solid;        
      }
      body,html {
        width: 100%;
        height: 100%;
      }
        .m-signature-pad--body {
        position: relative;
      }
      .m-signature-pad--body::before {
       
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: #aaa;
      }
        
    `,
});
