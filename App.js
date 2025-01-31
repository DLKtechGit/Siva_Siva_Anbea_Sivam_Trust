import AppStack from "./AppStack";
import { AuthProvider } from "./src/context/authcontext";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ErrorBoundary from "./ErrorBoundary";

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <NavigationContainer>
          <AuthProvider>
            <AppStack />
          </AuthProvider>
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
