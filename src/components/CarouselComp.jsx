import {
  StyleSheet,
  Text,
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

const CarouselComp = () => {
  const [activeindex, setactiveindex] = useState(0);
  const [images, setimages] = useState([]);
  const [loading, setloading] = useState(true);
  const carouselref = useRef();
  const width = Dimensions.get("window").width;

  //fetching images
  useEffect(() => {
    const fetchimages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get_banners`, {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5Y2IxMjFmNi0xMjBkLTRkM2YtYTcxMy00MjYyZjFhMjcyM2UiLCJqdGkiOiJiMjM1YTQ5Y2Y2MzNiMjIyMGYzYWIzOTkxMzhkZDBjMzc1MzlkMzk3NDg2YmZjYWI5NDc1ZDg3MmNjZmE2NmRiMmIwNjA2NDUwZThkYjZkNiIsImlhdCI6MTcyMjkyNjE2Ny43Njk3NTYsIm5iZiI6MTcyMjkyNjE2Ny43Njk3NTgsImV4cCI6MTc1NDQ2MjE2Ny43NTQ1ODksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.12VDaFj26WV2z-ZaQo3Ix7reAgahPh3Sac7-1-9KdP10GJVEqj8D_5XgPPeC51nr1yD3bfj8j36rdxNld2ILbYwLKHiColIEI_TuFEzrpGWk8Q0qHQQkBJ2rt1gKrMHAWmaTCUcgElzcWFuK4y9Rl3KdMoiHurmaWVNSQLgXAawtnSJoBSaTC8l5yv6b9oJcU2Wf1fOQU8VmYoR1mDpXn59cDuJUN6ptn6j8iXJ4I9Zfa7eIHahbne5wRf8N1tnVJdTexDT_pdHOavswKjmyxXrbVmQY3Ygh6kNHpeja4eYnjYXpwTffQXxEFJrDQHp2qxXa5ao53a2TH53c-4dzKfi_2876VvYOyRZOskju19GUA5d6iJBdt_0iqmD_iuOGv1dpV1sOReWQJIB7QllLfnfyaCq4S8r7O5gjQRa2FhqZqey7rbwwPzC_0NgCmrqdaL0wCvvxZeUwLu0-fnOgnoVVG33i6ixKZzXMn-FBrQYfTWgQ8RoTobKcRgUvX5A35NcCq4LAqLKL9Ar6t-I7-moIHXmz3JlPvthdXfOSAEdUen4h5H8kh5cxQB12whnjpo8FWw2WD4QZcv9iCYFWW973TT4ap9IsQ3rjAI1lDxp2rxdhHzd7d3j_drXpO1EoDhFt4XYWg5da8pz0OACOcLLOGHLkwcJn-MKEWGmFBg0",
          },
        });
        // console.log('data',response.data.data);

        // const images = adminData.map((img)=>{
        //   return img.url

        // })

        setimages(response.data.data);

        // console.log(response.data.data);
        setloading(false);
      } catch (error) {
        console.log("Something went wrong", error);
        setloading(false);
      }
    };
    fetchimages();
  }, []);

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
  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
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
        // mode="parallax"
        snapEnabled
        onSnapToItem={handlesnaptoitem}
        renderItem={({ item }) => (
          <View style={styles.carousel_container}>
            <Image source={{ uri: item.url }} style={styles.carousel_img} />
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
