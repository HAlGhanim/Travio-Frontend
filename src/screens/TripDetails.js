import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { BASE_URL } from "../../apis";

const TripDetails = ({ route }) => {
  const { trip } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${BASE_URL}/${trip.tripImage}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{trip.title}</Text>
      <Text style={styles.description}>{trip.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default TripDetails;
