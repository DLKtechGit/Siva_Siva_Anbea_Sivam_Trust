import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import safe_area_style from "../components/safe_area_style";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../components/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomFonts } from "../components/CustomFonts";

const QuestionHistoryScreen = ({ navigation }) => {
  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }
  return (
    <SafeAreaView style={safe_area_style.androidsafearea}>
      {/* navigation container */}
      <View style={styles.nav_container}>
        <Pressable onPress={() => navigation.navigate("OtherServiceBooking")}>
          <Icon name="arrowleft" size={30} color={COLORS.primary} />
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.main_container}
      >
        {/* heading */}
        <Text style={styles.header_txt}> Asked Questions</Text>
        {/*main sub container */}
        <View style={styles.main_sub_container}>
          {/* sub container */}
          <View style={styles.sub_container}>
            {/* question */}
            <View style={styles.question_container}>
              <Text style={styles.question_txt}>
                May i know your trust location?
              </Text>
            </View>
            {/* status */}
            <View style={styles.status_container}>
              <Text style={styles.label}>
                Status: <Text>Open</Text>
              </Text>
            </View>
          </View>
          
          <View style={styles.sub_container}>
            {/* question */}
            <View style={styles.question_container}>
              <Text style={styles.question_txt}>
                I want to know yoga class duration?
              </Text>
            </View>
            {/* status */}
            <View style={styles.status_container}>
              <Text style={styles.label}>
                Status: <Text>Closed</Text>
              </Text>
            </View>
          </View>

          <View style={styles.sub_container}>
            {/* question */}
            <View style={styles.question_container}>
              <Text style={styles.question_txt}>
                i need details about spirituality?
              </Text>
            </View>
            {/* status */}
            <View style={styles.status_container}>
              <Text style={styles.label}>
                Status: <Text>Closed</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuestionHistoryScreen;

const styles = StyleSheet.create({
  nav_container: {
    padding: 15,
  },
  main_container: {
    padding: 15,
  },
  header_txt: {
    fontSize: 17,
    fontFamily: "semi-bold",
    marginBottom: 10,
  },
  sub_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    padding: 10,
    backgroundColor: COLORS.label_bg,
    borderRadius: 7,
    marginVertical: 10,
  },
  question_container: {
    backgroundColor: COLORS.white,
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  question_txt: {
    fontSize: 16,
    fontFamily: "regular",
  },
  status_container: {
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: "medium-bold",
  },
});
