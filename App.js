import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import UserContext from "./src/context/UserContext";
import BottomBar2 from "./src/navigation/BottomBar2";
import BottomNavigator from "./src/navigation/BottomNavigator";
import { getToken } from "./src/apis/auth/storage";

export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <BottomBar2 />
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
