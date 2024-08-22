import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OpenScreen from "./src/Screens/OpenScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import SignupScreen from "./src/Screens/SignupScreen";
import FormScreen from "./src/Screens/FormScreen";
import ForgetPasswordScreen from "./src/Screens/ForgetPasswordScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./src/Screens/ProfileScreen";
import MyBookingsScreen from "./src/Screens/MyBookingsScreen";
import SupportScreen from "./src/Screens/SupportScreen";
import CustomDrawer from "./src/components/CustomDrawer";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Octicons";
import Icon3 from "react-native-vector-icons/Foundation";
import { COLORS } from "./src/components/constants";
import HomeScreen from "./src/Screens/HomeScreen";
import { CustomFonts } from "./src/components/CustomFonts";
import DoctorsScreen from "./src/Screens/ServicesScreens/DoctorsScreen";
import ChangePasswordScreen from "./src/Screens/ChangePasswordScreen";
import YogaScreen from "./src/Screens/ServicesScreens/YogaScreen";
import DrBookingForm from "./src/Screens/BookingForms/DrBookingForm";
import OthersBookingForm from "./src/Screens/BookingForms/OthersBookingForm";
import SpiritualScreen from "./src/Screens/ServicesScreens/SpiritualScreen";
import AstrologyScreen from "./src/Screens/ServicesScreens/AstrologyScreen";
import MeditationScreen from "./src/Screens/ServicesScreens/MeditationScreen";
import OtherServiceBooking from "./src/Screens/BookingForms/OtherServiceBooking";
import TermsAndPolicy from "./src/Screens/TermsAndPolicy";
import AstrologyForm from "./src/Screens/BookingForms/AstrologyForm";
import QuestionHistoryScreen from "./src/Screens/QuestionHistoryScreen";
import { enableScreens } from "react-native-screens";
import { getToken, removeuser } from "./src/utils/auth";
import { AuthProvider, useAuth } from "./src/context/authcontext";

enableScreens();

const stack = createStackNavigator();
const drawer = createDrawerNavigator();

const AppStack = ({ navigation }) => {
  const { authorized } = useAuth();
  const loadedfonts = CustomFonts();

  if (!loadedfonts) {
    return null;
  }

  if (authorized === null) {
    return <OpenScreen />;
  }

  return (
    <stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Front"
    >
      {authorized ? (
        <stack.Screen name="MainScreen" component={FormStackNavigation} />
      ) : (
        <>
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="Sign-up" component={SignupScreen} />
          <stack.Screen name="Forget" component={ForgetPasswordScreen} />
          <stack.Screen name="Front" component={OpenScreen} />
        </>
      )}
      <stack.Screen name="Doctor" component={DoctorsScreen} />
      <stack.Screen name="Yoga" component={YogaScreen} />
      <stack.Screen name="Spiritual" component={SpiritualScreen} />
      <stack.Screen name="Astrology" component={AstrologyScreen} />
      <stack.Screen name="Meditation" component={MeditationScreen} />
      <stack.Screen name="Booking" component={DrBookingForm} />
      <stack.Screen name="OtherBooking" component={OthersBookingForm} />
      <stack.Screen
        name="OtherServiceBooking"
        component={OtherServiceBooking}
      />
      <stack.Screen name="QuestionHistory" component={QuestionHistoryScreen} />
      <stack.Screen name="Astrologyform" component={AstrologyForm} />
      <stack.Screen name="Change_password" component={ChangePasswordScreen} />
      <stack.Screen name="T&C" component={TermsAndPolicy} />
    </stack.Navigator>
  );
};

function FormStackNavigation() {
  const { handlelogout } = useAuth();
  return (
    <drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 17,
          fontFamily: "medium-bold",
        },
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.black,
        headerStyle: {
          backgroundColor: COLORS.header_color,
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={35}
            color={COLORS.primary}
            onPress={navigation.toggleDrawer}
            style={{ marginLeft: 20 }}
          />
        ),
      })}
    >
      <drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="home-outline" size={23} color={color} />
          ),
        }}
      />
      <drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon2 name="person" size={23} color={color} />
          ),
        }}
      />
      <drawer.Screen
        name="My Bookings"
        component={MyBookingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon3 name="clipboard-notes" size={23} color={color} />
          ),
        }}
      />
      <drawer.Screen
        name="Support"
        component={SupportScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="chatbubble-ellipses-outline" size={23} color={color} />
          ),
        }}
      />
    </drawer.Navigator>
  );
}

export default AppStack;
