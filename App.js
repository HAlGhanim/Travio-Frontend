import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import UserContext from "./src/context/UserContext";
import BottomBar2 from "./src/navigation/BottomBar2";

export default function App() {
  const [user, setUser] = useState(false);

  // const checkToken = async () => {
  //   const token = await getToken();
  //   if (token) {
  //     setUser(true);
  //   }
  // };
  // console.log(user);

  // useEffect(() => {
  //   checkToken();
  // }, []);

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
