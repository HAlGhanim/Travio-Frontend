import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from ".";
import UpdateTrip from "../screens/UpdateTrip";
import Explore from "../screens/Explore";
import TripDetails from "../screens/TripDetails";
import Map from "../screens/Map";
import SelectLocationMap from "../screens/SelectLocationMap";

const Stack = createStackNavigator();
export default function ExploreNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.HEDERROUTES.EXPLORE} component={Explore} />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.TRIPDETAILS}
        component={TripDetails}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.UPDATETRIP}
        component={UpdateTrip}
      />
      <Stack.Screen
        name={ROUTES.HEDERROUTES.MAP}
        component={Map}
        options={{ tabBarVisible: false }}
      />
      <Stack.Screen name="SelectLocationMap" component={SelectLocationMap} />
    </Stack.Navigator>
  );
}
