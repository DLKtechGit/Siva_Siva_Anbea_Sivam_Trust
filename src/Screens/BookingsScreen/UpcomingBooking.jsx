import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS } from "../../components/constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import Location from "react-native-vector-icons/FontAwesome";
import { CustomFonts } from "../../components/CustomFonts";
import { useNavigation } from "@react-navigation/native";

const appointments = [
  {
    id: "1",
    doctor: "Dr. Jennifer",
    specialization: "Dermatologists",
    // address:
    //   "474A/170 Bramh Nagar 2nd Daliganj Railway Crossing, Sitapur Rd, Lucknow, U.P.",
    date: "Jul 6, 2024",
    time: "10:00 AM",
    status: "Confirmed",
    paid: "999",
    imageUrl: require("../../Assets/dr2.jpg"), // Replace with actual image URL
  },
  {
    id: "2",
    doctor: "Dr. Asogan",
    specialization: "Cardiologists",
    // address:
    //   "474A/170 Bramh Nagar 2nd Daliganj Railway Crossing, Sitapur Rd, Lucknow, U.P.",
    date: "Jul 4, 2024",
    time: "3:00 PM",
    status: "Confirmed",
    paid: "999",
    imageUrl: require("../../Assets/dr4.jpg"),
  },
];

const AppointmentCard = ({ appointment }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {/* <Text style={styles.appointmentFor}>
              Appointment for <Text style={styles.boldText}>Self</Text>
            </Text> */}
        <Text style={styles.status}>{appointment.status}</Text>
      </View>
      <View style={styles.cardBody}>
        <Image source={appointment.imageUrl} style={styles.doctorImage} />
        <View style={styles.details}>
          <Text style={styles.doctorName}>{appointment.doctor}</Text>
          <Text style={styles.specialization}>
            {appointment.specialization}
          </Text>
          {/* <Text style={styles.address}>{appointment.address}</Text> */}
          <Text style={styles.boldText}>Paid ₹{appointment.paid}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{appointment.time}</Text>
          <Text style={styles.date}>{appointment.date}</Text>
        </View>
      </View>

      {/* <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.button}>
          <Icon name="help" size={17} />
          <Text style={styles.buttonText}>Need Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}> */}
      {/* <Location name="location-arrow" size={20} /> */}
      {/* <Text style={styles.buttonText}> Cancel Appointment</Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Support")}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: COLORS.header_color,
          padding: 8,
          marginTop: 15,
          gap: 6,
          borderRadius: 7,
        }}
      >
        <Icon name="help" size={15} />
        <Text style={styles.buttonText}>Need Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const UpcomingBookings = () => {
  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppointmentCard appointment={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 15,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "semi-bold",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    padding: 10,
    color: "#888",
  },
  activeTab: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#ff0000",
  },
  card: {
    backgroundColor: COLORS.baby_gray,
    margin: 15,
    padding: 10,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // borderBottomWidth: 1,
    paddingBottom: 6,
    // borderBottomColor: COLORS.primary,
  },
  appointmentFor: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: "regular",
  },
  boldText: {
    fontFamily: "semi-bold",
  },
  status: {
    fontSize: 12,
    color: COLORS.white,
    backgroundColor: COLORS.green,
    borderRadius: 5,
    padding: 5,
    fontFamily: "medium-bold",
  },

  cardBody: {
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: "semi-bold",
  },
  specialization: {
    fontSize: 14,
    color: COLORS.dark_gray,
    fontFamily: "medium-bold",
    marginBottom: 10,
  },
  address: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    fontFamily: "regular",
  },
  timeContainer: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 16,
    fontFamily: "medium-bold",
  },
  date: {
    fontSize: 14,
    color: COLORS.dark_gray,
    fontFamily: "regular",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: COLORS.very_light_gray,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    gap: 3,
    // width:'100%',
    // alignItems:'center'
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: "medium-bold",
    textAlign: "center",
  },
});

export default UpcomingBookings;
