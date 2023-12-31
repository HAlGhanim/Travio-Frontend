import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Button,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TripCard from "./TripCard";
import { getAllTrips } from "../../apis/trips/index";

const TripList = () => {
  const clientQuery = useQueryClient();
  const {
    data: trips,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <>
      <FlatList
        data={trips}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TripCard trip={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default TripList;
