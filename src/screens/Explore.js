import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import TripList from "../components/trips/TripList";

const Explore = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore the world with us!</Text>
      {/* <ScrollView> */}
      <TripList />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Explore;

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
