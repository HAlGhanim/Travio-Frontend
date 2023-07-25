import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from ".";
import CreateTrip from "../screens/CreateTrip";
import Explore from "../screens/Explore";
import MyProfile from "../screens/MyProfile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomBar2() {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#002147",
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name={ROUTES.HEDERROUTES.EXPLOR}
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
        component={CreateTrip}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Octicons name="diff-added" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HEDERROUTES.PROFILE}
        component={MyProfile}
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
