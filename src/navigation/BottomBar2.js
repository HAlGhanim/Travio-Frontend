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
import ExploreNavigation from "./ExploreNavigation";
import { Text, TouchableOpacity, View } from "react-native";
import ProfileNavigation from "./ProfileNavigator";
import { removeToken } from "../apis/auth/storage";

const Tab = createBottomTabNavigator();

function BottomBar2() {
  const { user, setUser } = useContext(UserContext);

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "darkblue",
        inactiveTintColor: "black",
        headerShown: user ? true : false,
      }}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.EXPLORE_NAVIGATION}
        component={ExploreNavigation}
        options={{
          headerShown: false,
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
        name={ROUTES.HEDERROUTES.PROFILENAV}
        component={user ? ProfileNavigation : AuthNavigator}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  setUser(false);
                  removeToken();
                }}
              >
                <MaterialCommunityIcons name="logout" size={24} color="black" />
              </TouchableOpacity>
            );
          },
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
