import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, removeuser, storeuser } from "../utils/auth";
import { useNavigation } from "@react-navigation/native";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [authorized, setauthorized] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkauthentication = async () => {
      try {
        const token = await getToken();
        setauthorized(!!token);
        console.log("Received token in authcontext :", token);
      } catch (error) {
        console.log("error checking authorization :", error);
      }
    };

    checkauthentication();
  }, []);

  //login functionality
  const loginUser = async (token) => {
    try {
      await storeuser(token);
      console.log("stored token", token);
      setauthorized(true);
    } catch (error) {
      console.log("auth context login error :", error);
      setauthorized(false);
    }
  };

  //logout functionality
  const handlelogout = async () => {
    try {
      await removeuser();
      setauthorized(false);
      navigation.navigate("Front");
      console.log("logged out");
    } catch (error) {
      console.log("Error while logout", error);
    }
  };

  return (
    <Authcontext.Provider value={{ authorized, loginUser, handlelogout }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
