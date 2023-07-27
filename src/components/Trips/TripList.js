import React from "react";
import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TripCard from "./TripCard";
import { getAllTrips } from "../../apis/trips/index";

const TripList = () => {
  const clientQuery = useQueryClient();
  const {
    data: trips,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  console.log("Trips list");
  clientQuery.invalidateQueries({
    predicate: (query) => {
      console.log("[KEYS - from trip list]:", query.queryKey[0]);
    },
  });

  if (isFetching) return <Text>Loading...</Text>;

  return (
    <>
      <Button title="REFROMTRIPS" onPress={() => refetch()} />
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
