import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import TripCard from "./TripCard";
import { getAllTrips } from "../../apis/trips/index";

const TripList = () => {
  const { data: trips, isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TripCard trip={item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default TripList;
