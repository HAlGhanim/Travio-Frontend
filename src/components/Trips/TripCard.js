import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../apis";
import { useNavigation } from "@react-navigation/native";

const TripCard = ({ trip }) => {
  const navigation = useNavigation();

  const handleTripPress = () => {
    navigation.navigate("TripDetails", { trip });
  };

  return (
    <TouchableOpacity onPress={handleTripPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}/${trip.tripImage}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{trip.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    marginBottom: 16,
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

export default TripCard;
