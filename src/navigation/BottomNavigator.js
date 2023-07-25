import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ROUTES from ".";
import CreateTrip from "../screens/CreateTrip";
import Explore from "../screens/Explore";
import MyProfile from "../screens/MyProfile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HEDERROUTES.EXPLORE}
      activeColor="black"
      inactiveColor="#9fa5aa"
      barStyle={{ backgroundColor: "transparent" }}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.EXPLORE}
        component={Explore}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="image-search-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.CREATE}
        component={CreateTrip}
        options={{
          tabBarIcon: () => (
            <Octicons name="diff-added" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE}
        component={MyProfile}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigator;
