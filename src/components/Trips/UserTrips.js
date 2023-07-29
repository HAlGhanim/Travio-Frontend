import React from "react";
import { FlatList, View, Text, StyleSheet, Button } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TripCard from "./TripCard";
import { getAllTrips } from "../../apis/trips/index";
import { profile } from "../../apis/auth";

const UserTrips = ({ user }) => {
  const clientQuery = useQueryClient();
  const {
    data: profileFun,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(user._id),
  });
  console.log("userTrips");
  console.log(profileFun);
  clientQuery.invalidateQueries({
    predicate: (query) => {
      console.log("[KEYS - from trip list]:", query.queryKey[0]);
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <>
      {/* <Button title="REFROMTRIPS" onPress={() => refetch()} /> */}
      <FlatList
        data={profileFun?.trips}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TripCard trip={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default UserTrips;

//userTrips
