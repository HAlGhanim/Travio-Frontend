import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TripList from "../components/Trips/TripList";

const Explore = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore the world with us!</Text>
      <TripList navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    color: "darkblue",
  },
});

export default Explore;
