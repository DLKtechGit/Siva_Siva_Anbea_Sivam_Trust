import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import UpcomingBookings from "./BookingsScreen/UpcomingBooking";
import PastBooking from "./BookingsScreen/PastBooking";
import { CustomFonts } from "../components/CustomFonts";
import { COLORS } from "../components/constants";

const Tab = createMaterialTopTabNavigator();

const MyBookingsScreen = () => {
  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }
  return (
    <Tab.Navigator
      initialRouteName="Upcoming"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 17,
          fontFamily: "semi-bold",
          width: 150,
          textTransform: "none",
          paddingVertical: 2,
        },
        tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
      }}
    >
      <Tab.Screen name="Upcoming" component={UpcomingBookings} />
      <Tab.Screen name="Past" component={PastBooking} />
    </Tab.Navigator>
  );
};

export default MyBookingsScreen;
