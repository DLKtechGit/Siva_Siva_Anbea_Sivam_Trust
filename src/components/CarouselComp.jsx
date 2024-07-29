import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import Carousel from "react-native-reanimated-carousel";
import { COLORS } from "./constants";

const images = [
  { image: require("../Assets/carousel-1.jpg") },
  { image: require("../Assets/carousel-2.jpg") },
  { image: require("../Assets/carousel-3.jpg") },
];

const CarouselComp = () => {
  const [activeindex, setactiveindex] = useState(0);
  const carouselref = useRef();
  const width = Dimensions.get("window").width;

  const handlesnaptoitem = (index) => {
    setactiveindex(index);
  };

  // pagination
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
  return (
    <View style={styles.main_container}>
      <Carousel
        ref={carouselref}
        width={width}
        height={width / 2}
        data={images}
        autoPlay
        scrollAnimationDuration={2000}
        // mode="parallax"
        snapEnabled
        onSnapToItem={handlesnaptoitem}
        renderItem={({ item }) => (
          <View style={styles.carousel_container}>
            <Image source={item.image} style={styles.carousel_img} />
          </View>
        )}
      />
      {/* pagination */}
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
