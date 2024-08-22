import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@user_token";
const USER_ID_KEY = "@user_id";

//storing user token and id
export const storeuser = async (id, token) => {
  try {
    await AsyncStorage.setItem(USER_ID_KEY, id);
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log("Error storing user info", error);
  }
};

//retrive user ID
export const getUserId = async () => {
  try {
    await AsyncStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.log("Error retriving user ID", error);
    return null;
  }
};

// retrive user token
export const getToken = async ()=>{
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log('getToken token', token);
        return token
    } catch (error) {
        console.log('Error retriving Token', error);
        return null
        
    }
}

// Remove user info
export const removeuser = async()=>{
    try {
        await AsyncStorage.removeItem(USER_ID_KEY);
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.log('Error removing user', error);
        
    }
}
