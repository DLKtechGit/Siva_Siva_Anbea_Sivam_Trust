import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { COLORS } from "./constants";
import axios from "axios";
import { BASE_URL } from "../utils/apiconfig";
import { getToken } from "../utils/auth";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

const CarouselComp = ({ refreshKey }) => {
  const [activeindex, setactiveindex] = useState(0);
  const [images, setimages] = useState([]);
  const [loading, setloading] = useState(true);
  const carouselref = useRef();
  const width = Dimensions.get("window").width;

  const fetchimages = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/get_banners`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setimages(response.data.data);
      setloading(false);
    } catch (error) {
      console.log("Something went wrong", error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchimages();
  }, [refreshKey]);

  const handlesnaptoitem = (index) => {
    setactiveindex(index);
  };

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  const renderpagination = () => {
    return (
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, activeindex === index && styles.activedot]}
            onPress={() => carouselref.current.scrolltoindex(index)}
          />
        ))}
      </View>
    );
  };
  if (loading) {
    return <ActivityIndicator size={30} color={COLORS.primary} />;
  }
  return (
    <View style={styles.main_container}>
      <Carousel
        ref={carouselref}
        width={width}
        height={width / 2}
        data={images}
        autoPlay
        scrollAnimationDuration={2000}
        snapEnabled
        onSnapToItem={handlesnaptoitem}
        renderItem={({ item }) => (
          <View style={styles.carousel_container}>
            <Image
              source={{ uri: item.url }}
              style={styles.carousel_img}
              resizeMode="cover"
            />
          </View>
        )}
      />
      {renderpagination()}
    </View>
  );
};

export default CarouselComp;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carousel_img: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  carousel_container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: -15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.light_gray,
    marginHorizontal: 5,
  },
  activedot: {
    backgroundColor: COLORS.primary,
    width: 14,
    height: 8,
  },
});
