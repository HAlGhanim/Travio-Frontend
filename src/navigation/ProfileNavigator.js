import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import EditProfile from "../screens/EditProfile";
import MyProfile from "../screens/MyProfile";
import TripDetails from "../screens/TripDetails";
import UpdateTrip from "../screens/UpdateTrip";

const Stack = createStackNavigator();
export default function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.HEDERROUTES.PROFILE} component={MyProfile} />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.UPDATEPROFILE}
        component={EditProfile}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.TRIPDETAILS}
        component={TripDetails}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.UPDATETRIP}
        component={UpdateTrip}
      />
    </Stack.Navigator>
  );
}
