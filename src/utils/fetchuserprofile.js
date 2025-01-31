import axios from "axios";
import { BASE_URL } from "./apiconfig";

export const fetchuserprofile = async (token) => {
  try {
    console.log("token from fetchuserprofile", token);

    const response = await axios.get(`${BASE_URL}/get_profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetchuserfun response", response);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Error fetching user profile:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};
