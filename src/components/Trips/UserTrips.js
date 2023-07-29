import React from "react";
import { FlatList, StyleSheet, RefreshControl, Text } from "react-native";

import TripCard from "./TripCard";

const UserTrips = ({ trips, isLoading, refetch }) => {
  if (isLoading) return <Text>Looding...</Text>;
  // if (trips.length === 0) return <Text>No trips found</Text>;
  return (
    <>
      <FlatList
        data={trips}
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

export default UserTrips;

//userTrips
