import {
  StyleSheet,
  Text,
  View,
  // SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import safe_area_style from "../components/safe_area_style";
import { COLORS } from "../components/constants";
import { CustomFonts } from "../components/CustomFonts";
import Dot from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsAndPolicy = ({ navigation }) => {
  const loadedfonts = CustomFonts();
  if (!loadedfonts) {
    return null;
  }
  return (
    <SafeAreaView style={safe_area_style.androidsafearea}>
      <View style={{ paddingBottom: 70 }}>
        {/* navigation container */}
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={{ padding: 15 }}
        >
          <Icon name="arrowleft" size={30} color={COLORS.secondary} />
        </Pressable>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* T&C */}
          <View>
            <Text style={styles.header_txt}>Terms and Conditions</Text>
            {/* content */}
            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                By using the Siva Siva Anbae Sivam app, you agree to be bound by
                these Terms and Conditions and our Privacy Policy and Refund
                Policy.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                Users are responsible for Providing accurate and truthful
                information when registering and booking services. Ensuring
                timely attendance for booked appointments.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                All bookings must be made through the Siva Siva Anbae Sivam app.
                Payments for services are to be made via the app using the
                available payment methods. All transactions are secure and
                encrypted.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                Please refer to our Refund Policy for detailed information on
                cancellations and refunds.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                Siva Siva Anbae Sivam shall not be liable for any direct,
                indirect, incidental, special, or consequential damages
                resulting from the use or inability to use our services.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                We reserve the right to modify these Terms and Conditions at any
                time. Users will be notified of any changes, and continued use
                of the app constitutes acceptance of the modified terms.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                These terms are governed by and construed under the laws of
                India.
              </Text>
            </View>
          </View>
          {/* Privacy Policy */}
          <View>
            <Text style={styles.header_txt}>Privacy Policy</Text>
            {/* content */}
            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                We Collect Personal Information Name, contact details, and
                payment information when you register and book services. Usage
                Information of Data on how you use the app, including service
                bookings and interactions with service providers.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                We Use Your Information to Provide Services Facilitate bookings
                and manage your account. Send you updates, promotional offers,
                and service-related notifications. Analyze usage data to improve
                our app and services.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                We do not sell or rent your personal information to third
                parties.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                We may share your information with Service providers to
                facilitate bookings. And Law enforcement if required by law.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                We implement appropriate security measures to protect your
                personal information from unauthorized access, disclosure,
                alteration, or destruction.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                You have the right to access, update, or delete your personal
                information. Please contact us for any such requests.
              </Text>
            </View>

            <View style={styles.content_container}>
              <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
              <Text style={styles.content}>
                We may update this Privacy Policy from time to time. Any changes
                will be communicated to users, and continued use of the app
                constitutes acceptance of the updated policy.
              </Text>
            </View>
          </View>
          {/* Cancellation and Refund Policy */}
          <Text style={styles.header_txt}>Cancellation and Refund Policy</Text>
          {/* content */}
          <View style={styles.content_container}>
            <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
            <Text style={styles.content}>
              Once a booking is confirmed through our app, it cannot be
              canceled. We do not accept any requests for cancellations.
            </Text>
          </View>

          <View style={styles.content_container}>
            <Dot name="dot-single" size={40} style={{ marginTop: -10 }} />
            <Text style={styles.content}>
              No refunds will be issued for any bookings once confirmed.
              Payments made for services are non-refundable.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndPolicy;

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: COLORS.white,
    padding: 15,
    // paddingBottom:40
  },
  header_txt: {
    fontSize: 17,
    fontFamily: "semi-bold",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  content: {
    fontFamily: "regular",
    textAlign: "justify",
    width: "85%",
  },
  content_container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
});
