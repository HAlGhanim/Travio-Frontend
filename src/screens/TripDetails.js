import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTrip, getTripById } from "../apis/trips/index";
import { BASE_URL } from "../apis";
import ROUTES from "../navigation";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../context/UserContext";
import { getLocationAddress } from "../apis/location";
import { Entypo } from "@expo/vector-icons";
const { height } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TripDetails = ({ navigation, route }) => {
  const [showBox, setShowBox] = useState(true);
  const { user } = useContext(UserContext);
  const _id = route.params._id;
  const queryClient = useQueryClient();
  const {
    data: trip,
    isLoading,
    isError,
  } = useQuery(["trip", _id], () => getTripById(_id));

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteTripFun();
            setShowBox(false);
          },
        },

        {
          text: "No",
        },
      ]
    );
  };

  const { mutate: deleteTripFun } = useMutation({
    mutationFn: () => deleteTrip(_id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["trips"]);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
      Alert.alert("Trip deleted successfully!");
    },
  });
  const handleDelete = () => {
    showConfirmDialog();
  };

  const { data: location } = useQuery({
    queryKey: ["location"],
    queryFn: () => getLocationAddress(trip.longitude, trip.latitude),
    enabled: !!trip?.longitude,
  });
  console.log(location);
  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !trip) return <Text>Error fetching trip details.</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            navigation.replace(ROUTES.HEDERROUTES.OHERPROFILES, {
              _id: trip.createdBy,
            });
          }}
        >
          {/* <Text style={styles.name}>
            {trip.createdBy ? trip.createdBy.username : "Default User"}
          </Text> */}
        </TouchableOpacity>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.name}>
              {trip.createdBy ? trip.createdBy.username : "Default User"}
            </Text>

            <Image
              source={{ uri: `${BASE_URL}/${trip.tripImage}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{trip.title} </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                marginBottom: 1,
                marginLeft: 10,
              }}
            >
              <Entypo name="location-pin" size={24} color="black" />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTES.HEDERROUTES.MAP, {
                    latitude: trip.latitude,
                    longitude: trip.longitude,
                    title: trip.title,
                  })
                }
              >
                <Text>
                  {location === "No location provided" && location}
                  {location?.countryName} {location?.city}
                </Text>
              </TouchableOpacity>
            </View>

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
                    onPress={handleDelete}
                  >
                    <View style={styles.buttonContent}>
                      {showBox}

                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={18}
                        color="black"
                      />
                      <Text style={styles.buttonText}>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    // margin: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: height,
  },
  image: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 21,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
    marginTop: 11,
    textAlign: "justify",
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

  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
  safeArea: { backgroundColor: "white" },
});
