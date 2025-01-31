import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./apiconfig";

const TOKEN_KEY = "@user_token";
const USER_ID_KEY = "@user_id";
const USER_EMAIL_KEY = "@user_email";
const USER_NAME_KEY = "@user_name";
const USER_IMAGE_KEY = "@user_image";
const BOOKING_DATE_KEY = "@booking_date";
const BOOKING_TIME_KEY = "@booking_time";
const BOOKING_DOB_KEY = "@booking_dob";

//storing user token and id
export const storeuser = async (id, token) => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, id);
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_EMAIL_KEY, email);
    await AsyncStorage.setItem(USER_NAME_KEY, name);
    await AsyncStorage.setItem(USER_IMAGE_KEY, image);
  } catch (error) {
    console.log("Error storing user info", error);
  }
};

export const storeUserData = async (name, email, image) => {
  try {
    await AsyncStorage.setItem(USER_EMAIL_KEY, email);
    await AsyncStorage.setItem(USER_NAME_KEY, name);
    await AsyncStorage.setItem(USER_IMAGE_KEY, image);
  } catch (error) {
    console.log("Error storing user info", error);
  }
};

//store booking data
export const storeBookingData = async (date, time) => {
  try {
    await AsyncStorage.setItem(BOOKING_DATE_KEY, date);
    await AsyncStorage.setItem(BOOKING_TIME_KEY, time);
  } catch (error) {
    console.log("Error storing booking info", error);
  }
};

export const storeDOB = async (date) => {
  try {
    await AsyncStorage.setItem(BOOKING_DOB_KEY, date);
  } catch (error) {
    console.log("Error storing booking info", error);
  }
};

// retrive Booking Data
export const getBookingData = async () => {
  try {
    const date = await AsyncStorage.getItem(BOOKING_DATE_KEY);
    const time = await AsyncStorage.getItem(BOOKING_TIME_KEY);
    const data = { date, time };
    return data;
  } catch (error) {
    console.log("Error retriving booking data", error);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const name = await AsyncStorage.getItem(USER_NAME_KEY);
    const email = await AsyncStorage.getItem(USER_EMAIL_KEY);
    const image = await AsyncStorage.getItem(USER_IMAGE_KEY);
    if (!name && !email && !image) {
      throw new Error("no user data found");
    }
    const data = { name, email, image };
    return data;
  } catch (error) {
    console.log("Error retriving user data", error);
    return null;
  }
};

export const getDOBData = async () => {
  try {
    const date = await AsyncStorage.getItem(BOOKING_DOB_KEY);
    if (!date) {
      throw new Error("no booking data found");
    }
    return date;
  } catch (error) {
    console.log("Error retriving booking data", error);
    return null;
  }
};

//retrive user ID
export const getUserId = async () => {
  try {
    const userID = await AsyncStorage.getItem(USER_ID_KEY);
    console.log("receiving user id in auth", userID);
  } catch (error) {
    console.log("Error retriving user ID", error);
    return null;
  }
};

// retrive user token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      throw new Error("no token found");
    }
    const authToken = token.split('"').join("");
    return authToken;
  } catch (error) {
    console.log("Error retriving Token", error);
    return null;
  }
};

// Remove user info
export const removeuser = async () => {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log("Error removing user", error);
  }
};

//fetching user profile info
export const fetchuserinfo = async () => {
  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/get_profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching profile:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized. The token might be expired or invalid.");
      // Optional: Redirect to login or refresh token
    }
    throw error; // Rethrow to handle in the calling function
  }
};
