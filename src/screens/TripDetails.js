import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../apis/index";
import ROUTES from "../navigation/index";

const TripDetails = ({ route, navigation }) => {
  const { trip } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${BASE_URL}/${trip.tripImage}` }}
        style={styles.image}
      />
      <Text style={styles.title}>
        <Ionicons name="location-sharp" size={24} color="black" /> {trip.title}
      </Text>
      <Text style={styles.description}>{trip.description}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate(ROUTES.HEDERROUTES.UPDATETRIP, { trip })
        }
      >
        <Text style={styles.editButtonText}>Edit</Text>
        <Ionicons name="create-outline" size={18} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
  },

  editButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#2C3E50", // Navy blue color
    borderRadius: 7,
    marginTop: 10,
    width: 90,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 5,
  },
});

export default TripDetails;
