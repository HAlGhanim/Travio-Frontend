import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TripCard from "./path/to/TripCard"; // Adjust the import path accordingly
import TripDetails from "./path/to/TripDetails"; // Adjust the import path accordingly

const Stack = createStackNavigator();

const YourComponent = () => {
  const trips = [
    {
      id: 1,
      title: "Trip 1",
      tripImage: "trip1.jpg",
      description: "Description for Trip 1",
    },
    {
      id: 2,
      title: "Trip 2",
      tripImage: "trip2.jpg",
      description: "Description for Trip 2",
    },
    // Add more trips as needed
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TripList">
        <Stack.Screen name="TripList">
          {() => (
            <View style={styles.container}>
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="TripDetails" component={TripDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});

export default YourComponent;
