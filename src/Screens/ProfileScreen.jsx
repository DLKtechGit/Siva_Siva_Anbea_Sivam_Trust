import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../components/constants";
import Icons from "react-native-vector-icons/MaterialIcons";
import Edit from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { CustomFonts } from "../components/CustomFonts";
import Icon2 from "react-native-vector-icons/FontAwesome6";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import Icon4 from "react-native-vector-icons/Entypo";
import Icon5 from "react-native-vector-icons/AntDesign";
import { fetchuserinfo, getToken, storeUserData } from "../utils/auth";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authcontext";
import axios from "axios";
import { BASE_URL } from "../utils/apiconfig";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setprofile] = useState(null);
  const [IsError, setIsError] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(
    require("../Assets/profile_pic.jpg")
  );
  const { handlelogout, authorized } = useAuth();
  const navigation = useNavigation();
  const fontsloaded = CustomFonts();
  const [userDetails, setUserDetails] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  //fetching user info

  useEffect(() => {
    if (isFocused) {
      const loadprofile = async () => {
        try {
          const userprofile = await fetchuserinfo();
          setprofile(userprofile);
          setUserDetails(userprofile);
          if (userprofile?.image != "null") {
            setProfileImage({ uri: userprofile?.image });
          }
          setIsLoading(false);
        } catch (error) {
          console.log("error getting user info", error);
        }
      };
      loadprofile();
    }
  }, [isFocused]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const userprofile = await fetchuserinfo();
      setprofile(userprofile);
      if (userprofile?.image != "null") {
        setProfileImage({ uri: userprofile?.image });
      }
      await storeUserData(
        userprofile?.name,
        userprofile?.email,
        userprofile?.image
      );
    } catch (error) {
      console.log("Error refreshing user info", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEdit = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const updateUser = async () => {
    try {
      setModalVisible(false);
      setIsLoading(true);
      const userData = {
        name: userDetails.name,
        address: userDetails.address,
        phone: userDetails.phone,
        email: userDetails.email,
      };
      const token = await getToken();
      const response = await axios.post(
        `${BASE_URL}/update_profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        const { name, email, image } = response.data.data;
        await storeUserData(name, email, image);
        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: response.data.message,
          autoHide: true,
          visibilityTime: 2500,
          position: "top",
          topOffset: 0,
          swipeable: true,
        });
        onRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setIsLoading(true);
      try {
        const uri = result.assets[0].uri;
        const formData = new FormData();
        const fileUri = uri;

        // Convert URI to a format that can be sent
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        const fileName = fileInfo.uri.split("/").pop();
        const fileType = fileInfo.uri.split(".").pop();

        formData.append("image", {
          uri: fileUri,
          name: fileName,
          type: `image/${fileType}`,
        });
        console.log(formData);

        const token = await getToken();
        const response = await axios.post(
          `${BASE_URL}/upload_profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status == 200) {
          setIsLoading(false);
          const { name, email, image } = response.data.data;
          await storeUserData(name, email, image);
          Toast.show({
            type: "success",
            text1: response.data.message,
            autoHide: true,
            visibilityTime: 2500,
            position: "top",
            topOffset: 0,
            swipeable: true,
          });
        }
        onRefresh();
      } catch (error) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Profile uploaded failed",
          autoHide: true,
          visibilityTime: 2500,
          position: "top",
          topOffset: 0,
          swipeable: true,
        });
      }
    }
  };

  if (!fontsloaded) {
    return null;
  }

  if (IsLoading) {
    return (
      <View style={styles.loader_container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    // main container
    <ImageBackground
      source={require("../Assets/floral-bg.jpg")}
      style={styles.main_container}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        <Toast />
        {/* sub main container */}
        <View style={styles.sub_main_container}>
          {/* profile container */}
          <View style={styles.profileImageContainer}>
            <Image
              source={
                profileImage?.uri != null
                  ? profileImage
                  : require("../Assets/profile_pic.jpg")
              }
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.cameraIconContainer}>
              <TouchableOpacity style={styles.cameraIcon} onPress={selectImage}>
                <Edit
                  name="image-edit-outline"
                  size={22}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* user details */}
          <View style={styles.user_details_container}>
            {/* name */}
            <TextInput
              style={styles.user_name}
              value={profile?.name}
              editable={false}
            />
            {/* email */}
            <TextInput
              style={styles.user_email}
              value={profile?.email}
              editable={false}
            />
            {/* address */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Icon2
                name="location-dot"
                style={{ marginTop: -5 }}
                color={COLORS.dark_gray}
              />
              <TextInput
                style={styles.user_email}
                value={profile?.address}
                editable={false}
              />
            </View>
          </View>
          {/* buttons main container */}
          <View style={styles.btn_main_container}>
            {/* profile edit button */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.btn_container}
            >
              <View style={styles.btn_left_container}>
                <Icon3 name="user-edit" size={20} color={COLORS.dark_gray} />
                <Text style={styles.btn_txt}>Edit Profile</Text>
              </View>
              <Icon4 name="chevron-right" size={22} color={COLORS.dark_gray} />
            </TouchableOpacity>
            {/* change password */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Change_password")}
              style={styles.btn_container}
            >
              <View style={styles.btn_left_container}>
                <Icons name="password" size={20} color={COLORS.dark_gray} />
                <Text style={styles.btn_txt}>Change Password</Text>
              </View>
              <Icon4 name="chevron-right" size={22} color={COLORS.dark_gray} />
            </TouchableOpacity>
            {/* help center */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Contact Us")}
              style={styles.btn_container}
            >
              <View style={styles.btn_left_container}>
                <Icons name="message" size={20} color={COLORS.dark_gray} />
                <Text style={styles.btn_txt}>Help Center</Text>
              </View>
              <Icon4 name="chevron-right" size={22} color={COLORS.dark_gray} />
            </TouchableOpacity>
            {/* log out */}
            <TouchableOpacity
              onPress={handlelogout}
              style={{
                alignItems: "center",
                padding: 10,
                paddingVertical: 13,
                borderRadius: 11,
                backgroundColor: COLORS.primary,
                marginTop: 25,
              }}
            >
              <View style={styles.btn_left_container}>
                <Icon5 name="logout" size={20} color={COLORS.white} />
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: "semi-bold",
                    fontSize: 16,
                  }}
                >
                  Logout
                </Text>
              </View>
              {/* <Icon4 name="chevron-right" size={22}/> */}
            </TouchableOpacity>
          </View>
        </View>
        {/*edit profile modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <ScrollView>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={userDetails.name}
                    onChangeText={(text) => handleEdit("name", text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={userDetails.email}
                    onChangeText={(text) => handleEdit("email", text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    value={userDetails.phone}
                    onChangeText={(text) => handleEdit("phone", text)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={styles.input}
                    value={userDetails.address}
                    onChangeText={(text) => handleEdit("address", text)}
                  />
                </View>
              </ScrollView>
              <TouchableOpacity style={styles.saveButton} onPress={updateUser}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ position: "absolute", right: 10, top: 10 }}
              >
                <Icon5 name="closecircle" size={22} color={COLORS.light_gray} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loader_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main_container: {
    flex: 1,
    resizeMode: "cover",
    height: "50%",
    backgroundColor: COLORS.white,
  },
  sub_main_container: {
    backgroundColor: COLORS.white,
    flex: 1,
    marginTop: 160,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileImageContainer: {
    alignSelf: "center",
    marginBottom: 15,
    position: "relative",
    marginTop: -80,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: COLORS.white,
    borderWidth: 5,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: COLORS.dark_gray,
    borderRadius: 50,
    padding: 5,
  },
  cameraIcon: {
    color: COLORS.white,
    fontSize: 18,
  },
  user_details_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    color: COLORS.black,
    marginBottom: 5,
    fontFamily: "medium-bold",
    marginLeft: 5,
  },
  user_name: {
    color: COLORS.dark_gray,
    fontFamily: "semi-bold",
    fontSize: 17,
  },
  user_email: {
    color: COLORS.dark_gray,
    fontFamily: "regular",
    fontSize: 14,
    marginTop: -5,
  },
  btn_main_container: {
    padding: 15,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  btn_left_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btn_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.baby_gray,
    padding: 10,
    paddingVertical: 15,
    borderRadius: 11,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
  },
  btn_txt: {
    fontFamily: "semi-bold",
    fontSize: 16,
    color: COLORS.dark_gray,
  },
  changePasswordContainer: {
    gap: 180,
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#0196A3",
    marginVertical: 15,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    padding: 8,
    backgroundColor: COLORS.baby_gray,
    width: "100%",
    marginBottom: 25,
    fontFamily: "regular",
    borderRadius: 7,
  },
  changePasswordText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 15,
  },
  saveButton: {
    backgroundColor: "#0196A3",
    marginTop: 30,
    borderRadius: 5,
    padding: 12,
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "semi-bold",
    fontSize: 17,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 5,
    position: "relative",
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "semi-bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ProfileScreen;
