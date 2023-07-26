import React from "react";
import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import { useQuery } from "@tanstack/react-query";
import TripCard from "./TripCard";
import { getAllTrips } from "../../apis/trips/index";

const TripList = () => {
  const {
    data: trips,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  if (isFetching) return <Text>Loading...</Text>;

  return (
    <>
      <FlatList
        data={trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TripCard trip={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default TripList;
