import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    ScrollView,
    TextInput,
    Button,
    Animated,
  } from "react-native";
  import React from "react";
  import Icon from "react-native-vector-icons/AntDesign";
  import { CustomFonts } from "../../components/CustomFonts";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { COLORS } from "../../components/constants";
  import YogaList from "../../components/ServicesList/YogaList";
import AstrologyList from "../../components/ServicesList/AstrologyList";
  
  const AstrologyScreen = ({ navigation }) => {
    const fontsloaded = CustomFonts();
    if (!fontsloaded) {
      return null;
    }
  
    return (
      <>
        {/* main container */}
        <View style={styles.main_container}>
          {/* navigation container */}
          <View style={styles.nav_container}>
            {/* nav icon */}
            <Pressable onPress={() => navigation.navigate("Home")}>
              <Icon name="arrowleft" size={25} color={COLORS.white} />
            </Pressable>
            {/* nav text */}
            <Text style={styles.nav_txt}>Astrology Booking</Text>
          </View>
          {/* main sub container */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.main_sub_container}>
              {/* yoga list */}
              <AstrologyList />
            </View>
          </ScrollView>
        </View>
      </>
    );
  };
  
  export default AstrologyScreen;
  
  const styles = StyleSheet.create({
    main_container: {
      backgroundColor: COLORS.primary,
      flex: 1,
      borderTopLeftRadius: 20,
    },
    nav_container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      gap: wp(5),
      backgroundColor: COLORS.primary,
      paddingTop: 40,
    },
    nav_txt: {
      fontFamily: "semi-bold",
      fontSize: hp(2.3),
      color: COLORS.white,
    },
    main_sub_container: {
      padding: 15,
      backgroundColor: COLORS.white,
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    heading_txt: {
      backgroundColor: COLORS.primary,
      padding: 7,
      color: COLORS.white,
      fontFamily: "semi-bold",
      borderRadius: 6,
      fontSize: 16,
      marginVertical: 10,
    },
    text_input: {
      backgroundColor: COLORS.white,
      padding: 8,
      borderColor: COLORS.light_gray,
      borderWidth: 1,
      borderRadius: 10,
      fontFamily: "regular",
      marginBottom: 15,
    },
  });
  