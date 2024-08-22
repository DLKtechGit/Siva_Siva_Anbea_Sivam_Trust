import AppStack from "./AppStack";
import { enableScreens } from "react-native-screens";
import { AuthProvider } from "./src/context/authcontext";
import { NavigationContainer } from "@react-navigation/native";

enableScreens();

export default function App() {
return(
  <NavigationContainer>  
  <AuthProvider>
    <AppStack/>
  </AuthProvider>
   </NavigationContainer>
)
}
