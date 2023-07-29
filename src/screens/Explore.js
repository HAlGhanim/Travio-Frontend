import { SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useCallback } from "react";
import TripList from "../components/Trips/TripList";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";

const Explore = () => {
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["trips"]);
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore the world with us!</Text>

      <TripList />
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",

    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    color: "black",
  },
});
