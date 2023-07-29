import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import BottomBar2 from "./src/navigation/BottomBar2";
import { getToken } from "./src/apis/auth/storage";
import { LogBox } from "react-native";
import jwt_decode from "jwt-decode";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      const userObj = jwt_decode(token);
      setUser(userObj);
      console.log(user);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

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
