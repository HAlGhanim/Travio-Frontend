import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import BottomBar2 from "./src/navigation/BottomBar2";
import { getToken } from "./src/apis/auth/storage";
import jwt_decode from "jwt-decode";
import * as SplashScreen from "expo-splash-screen";
import SplashScreenC from "./src/components/SplashScreenC";

export default function App() {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const checkToken = async () => {
    await SplashScreen.preventAutoHideAsync(); // prevent the splash screen from auto hiding

    const token = await getToken();
    if (token) {
      const userObj = jwt_decode(token);
      setUser(userObj);
      console.log(user);
    }
    // setAppIsReady(true);
    setTimeout(() => setAppIsReady(true), 3000); // delay of 2 seconds

    await SplashScreen.hideAsync(); // hide the splash screen
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (!appIsReady) {
    return <SplashScreenC />;
  }

  return (
    <QueryClientProvider client={new QueryClient({})}>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <BottomBar2 />
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
