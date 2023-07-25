import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "./index";
import CreateTrip from "../screens/CreateTrip";
import Explore from "../screens/Explore";
import MyProfile from "../screens/MyProfile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import AuthNavigator from "./AuthNavigator";

const Tab = createBottomTabNavigator();

function BottomBar2() {
  const { user } = useContext(UserContext);

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#002147",
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.EXPLORE}
        component={Explore}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="image-search-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name={ROUTES.HEDERROUTES.CREATE}
        component={user ? CreateTrip : AuthNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Octicons name="diff-added" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE}
        component={user ? MyProfile : AuthNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomBar2;
