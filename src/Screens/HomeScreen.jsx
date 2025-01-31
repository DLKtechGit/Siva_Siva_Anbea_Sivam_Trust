import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../components/constants";
import CarouselComp from "../components/CarouselComp";

import ServiceSelection from "../components/ServiceSelection";
import StepsComp from "../components/StepsComp";
import { CustomFonts } from "../components/CustomFonts";
import { useVideoPlayer, VideoView } from "expo-video";
const videoSource = require("../Assets/bgvid6.mp4");

const HomeScreen = () => {
  const fontsloaded = CustomFonts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play();
  });

  if (!fontsloaded) {
    return null;
  }
  return (
    <View style={styles.main_container}>
      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        startsPictureInPictureAutomatically
        isLooping
        style={styles.backgroundVideo}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        <CarouselComp refreshKey={refreshing} />

        <View style={{ marginHorizontal: 15, marginTop: 30 }}>
          <View style={styles.banner}>
            <Text style={styles.sub_txt}>
              Your Pathway to Spiritual Wellness, Healing, and Cosmic Guidance
              to public awarness!
            </Text>
          </View>
        </View>

        <ServiceSelection refreshKey={refreshing} />

        <StepsComp />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main_container: {},
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
    display: "flex",
    position: "absolute",
    top: -200,
    bottom: 0,
    left: -500,
    width: 1400,
    height: 1200,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});
