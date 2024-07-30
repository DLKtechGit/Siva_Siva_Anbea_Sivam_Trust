import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { COLORS } from "../components/constants";
import CarouselComp from "../components/CarouselComp";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ServiceSelection from "../components/ServiceSelection";
import StepsComp from "../components/StepsComp";
import { CustomFonts } from "../components/CustomFonts";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }
  return (
    // <ImageBackground
    //   source={require("../Assets/home-bg8.jpg")}
    //   style={{ flex: 1 }}
    // >
    <View style={styles.main_container}>
      <Video
        source={require("../Assets/bgvid6.mp4")}
        rate={1.0}
        // volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.backgroundVideo}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* carosel */}
        <CarouselComp />

        {/* header text banner */}
        <View style={{ marginHorizontal: 15, marginTop: 30 }}>
          <View style={styles.banner}>
            <Text style={styles.sub_txt}>
              Your Pathway to Spiritual Wellness, Healing, and Cosmic Guidance
              to public awarness!
            </Text>
          </View>
        </View>

        {/* service selection */}
        <ServiceSelection />

        {/* steps component */}
        <StepsComp />
      </ScrollView>
    </View>
    // </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main_container: {
    // paddingVertical: 10,
  },
  carousel_img: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  banner: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
  },

  sub_txt: {
    textAlign: "center",
    color: COLORS.dark_gray,
    fontSize: 16,
    fontFamily: "regular",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
});
