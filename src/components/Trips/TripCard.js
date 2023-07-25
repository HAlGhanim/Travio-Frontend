import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TripCard = ({ trip }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: trip.tripImage }} style={styles.image} />
      <Text style={styles.title}>{trip.title}</Text>
      <Text style={styles.description}>{trip.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "88%",
    height: 225,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
});

export default TripCard;
//{ uri: trip.imageUri }
