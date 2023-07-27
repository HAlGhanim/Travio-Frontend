import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { deleteTrip, getTripById } from "../apis/trips/index";
import { BASE_URL } from "../apis";
import ROUTES from "../navigation";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../context/UserContext";

const TripDetails = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const _id = route.params._id;
  // const queryClient = useQueryClient();
  const {
    data: trip,
    isLoading,
    isError,
  } = useQuery(["trip", _id], () => getTripById(_id));

  // const { mutate: deleteTripFun } = useMutation({
  //   mutationFn: (data) => deleteTrip(_id),
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["trips"]);
  //     navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
  //     alert("Trip deleted successfully!");
  //   },
  // });
  // const handleDelete = () => {
  //   deleteTripFun();
  // };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !trip) return <Text>Error fetching trip details.</Text>;

  return (
    <View>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>
          {trip.createdBy ? trip.createdBy.username : "Default User"}
        </Text>
        <View style={styles.card}>
          <Image
            source={{ uri: `${BASE_URL}/${trip.tripImage}` }}
            style={styles.image}
          />
          <Text style={styles.title}>{trip.title}</Text>
          <Text style={styles.description}>{trip.description}</Text>

          <View style={styles.buttonsContainer}>
            {trip?.createdBy._id === user._id && (
              <>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    navigation.navigate(ROUTES.HEDERROUTES.UPDATETRIP, {
                      _id: trip._id,
                    })
                  }
                >
                  <View style={styles.buttonContent}>
                    <Ionicons name="create-outline" size={18} color="black" />
                    <Text style={styles.buttonText}>Edit</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  // onPress={handleDelete}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons name="trash-outline" size={18} color="black" />
                    <Text style={styles.buttonText}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TripDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 7,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 12,
    borderColor: "black",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 4,
  },

  editButton: {
    marginRight: 4,
    marginLeft: 4,
  },
  deleteButton: {
    marginRight: 4,
    marginLeft: 4,
  },
});
