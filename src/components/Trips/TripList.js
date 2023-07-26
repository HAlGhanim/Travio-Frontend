import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TripCard from "./TripCard";
import { getAllTrips } from "../../apis/trips/index";

const TripList = () => {
  const queryClient = useQueryClient()
  const { data: trips, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: () => getAllTrips(),
  });




  const queryCache = queryClient.getQueryCache();

  const liveQueriesOnScreen = queryCache.findAll({ active: true });

  const queryKeys = liveQueriesOnScreen.map((query) => {
    return query.queryKey;
  });

  console.log({ queryKeys })


  if (isLoading) return <Text>Loading...</Text>;
  console.log(trips)
  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TripCard trip={item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default TripList;
