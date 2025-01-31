import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../../components/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialIcons";
import Location from "react-native-vector-icons/FontAwesome";
import { CustomFonts } from "../../components/CustomFonts";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../utils/apiconfig";
import { getToken } from "../../utils/auth";

const AppointmentCard = ({ appointment }) => {
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text
          style={
            appointment.status == "completed" ? styles.status : styles.status1
          }
        >
          {appointment.status}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Image
          source={{ uri: appointment.service_user.url }}
          style={styles.doctorImage}
        />
        <View style={styles.details}>
          <Text style={styles.doctorName}>{appointment.service_user.name}</Text>
          <Text style={styles.specialization}>
            {appointment.service_user.category}
          </Text>
          <Text style={styles.boldText}>
            Paid ₹{appointment.service_user.amount}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{appointment.time}</Text>
          <Text style={styles.date}>{formatDate(appointment.date)}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Support")}
        style={styles.buttonContainer}
      >
        <Icon name="help" size={15} />
        <Text style={styles.buttonText}>Need Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const PastBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchBookings();
    }
  }, [isFocused]);

  const fetchBookings = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/get_bookings/completed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.data);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
  };

  const fontsloaded = CustomFonts();
  if (!fontsloaded) {
    return null;
  }

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  const renderItem = ({ item }) => <AppointmentCard appointment={item} />;

  const renderEmptyList = () => (
    <View style={styles.no_data_container}>
      <Image
        source={require("../../Assets/no_data_found.jpg")}
        style={styles.no_data_img}
      />
    </View>
  );

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={renderEmptyList}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
        />
      }
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  no_data_container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  no_data_img: {
    width: wp(93),
    height: hp(93),
    resizeMode: "contain",
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
    paddingBottom: 6,
  },
  status: {
    fontSize: 12,
    color: COLORS.white,
    backgroundColor: COLORS.green,
    borderRadius: 5,
    padding: 5,
    fontFamily: "medium-bold",
  },
  status1: {
    fontSize: 12,
    color: COLORS.white,
    backgroundColor: COLORS.red,
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
    borderRadius: 35,
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
  boldText: {
    fontFamily: "semi-bold",
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
  buttonContainer: {
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
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: "medium-bold",
    textAlign: "center",
  },
});

export default PastBooking;
