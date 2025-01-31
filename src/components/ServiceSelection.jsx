import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "./constants";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";
import { BASE_URL } from "../utils/apiconfig";
import { getToken } from "../utils/auth";

const ServiceSelection = ({ refreshKey }) => {
  const navigation = useNavigation();
  const [datas, setDatas] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [refreshKey]);

  const handlePress = (data) => {
    const id = data.id;
    if (data.name == "Doctors") {
      navigation.navigate("Doctor", { id });
    } else if (data.name == "Yoga Class") {
      navigation.navigate("Yoga", { id });
    } else if (data.name == "Spiritual") {
      navigation.navigate("Spiritual", { id });
    } else if (data.name == "Astrology") {
      navigation.navigate("Astrology", { id });
    } else if (data.name == "Meditation") {
      navigation.navigate("Meditation", { id });
    } else if (data.name == "General Questions") {
      navigation.navigate("OtherServiceBooking");
    }
  };

  const fetchServices = async () => {
    try {
      setloading(true);
      const token = await getToken();
      const response = await axios.get(`${BASE_URL}/get_services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatas(response.data.data);
      setloading(false);
    } catch (error) {
      console.log("Something went wrong", error);
      setloading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  console.log("data", datas);

  return (
    <View style={styles.main_sub_container}>
      <View style={styles.header_txt_container}>
        <Text style={styles.header_txt}>Select Services</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Upcoming Bookings")}
          style={styles.view_bookings_btn_container}
        >
          <Text style={styles.header_sub_txt}>View Bookings</Text>
          <Icon name="chevron-right" color={COLORS.white} size={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {datas.length > 0 &&
          datas.map((data, index) => (
            <View key={data.id} style={styles.service_sub_container}>
              <Pressable
                style={styles.service_container}
                onPress={() => handlePress(data)}
              >
                <View style={styles.icon_container}>
                  <Image
                    style={styles.icons}
                    source={{ uri: data.url }}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.service_name}>{data.name}</Text>
              </Pressable>
            </View>
          ))}
      </View>
    </View>
  );
};

export default ServiceSelection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  main_sub_container: {
    paddingHorizontal: 15,
  },
  header_txt: {
    fontSize: hp(2),
    color: COLORS.white,
    fontFamily: "regular",
  },
  header_sub_txt: {
    color: COLORS.white,
    fontFamily: "medium-bold",
    fontSize: 13,
  },
  icons: {
    width: 50,
    height: 50,
  },
  astrology_icons: {
    width: 60,
    height: 60,
  },
  meditation_icons: {
    width: 60,
    height: 43,
  },
  spiritual_icons: {
    width: 55,
    height: 55,
  },
  icon_container: {
    width: wp(22),
    height: hp(10),
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  service_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    borderColor: COLORS.light_gray,
    borderWidth: 0.5,
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  service_sub_container: {
    width: "30%",
    marginVertical: 12,
    marginHorizontal: "1%",
  },
  service_name: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.dark_gray,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
  header_txt_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    marginVertical: 10,
  },
  view_bookings_btn_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
