import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ImagePickerC from "../components/Shared/ImagePickerC";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrip } from "../apis/trips/index";
import Create from "../components/Trips/Create";
import ROUTES from "../navigation";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const CreateTrip = ({ navigation }) => {
  const queryClient = useQueryClient();

  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [errorText, setErrorText] = useState("");
  const [location, setLocation] = useState(null);

  const { mutate: createTripFun } = useMutation({
    mutationFn: () =>
      createTrip({
        ...data,
        latitude: location?.latitude,
        longitude: location?.longitude,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      setData({});
      setImage(null);
      queryClient.invalidateQueries(["trips"]);
      queryClient.invalidateQueries(["profile"]);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
    },
    onError: (error) => {
      if (error.response?.data?.error?.message.includes("title")) {
        setErrorText("Title is required");
      }
      if (error.response?.data?.error?.message.includes("description")) {
        setErrorText("Description is required");
      }
      if (error.response?.data?.error?.message.includes("tripImage")) {
        setErrorText("Image is required");
      }
      if (
        error.response?.data?.error?.message.includes("title" && "description")
      ) {
        setErrorText("Title and description are required");
      }
      if (
        error.response?.data?.error?.message ===
        "Trip validation failed: description: Path `description` is required., tripImage: Path `tripImage` is required."
      ) {
        setErrorText("Image and description are required");
      }
      if (
        error.response?.data?.error?.message ===
        "Trip validation failed: tripImage: Path `tripImage` is required., title: Path `title` is required."
      ) {
        setErrorText("Image and title are required");
      }
      if (
        error.response?.data?.error?.message ===
        "Trip validation failed: description: Path `description` is required., tripImage: Path `tripImage` is required., title: Path `title` is required."
      ) {
        setErrorText("Title, description, and image are required");
      }
    },
  });

  const handleSubmit = () => {
    createTripFun();
  };

  const onMapPress = (event) => {
    setLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
    setData({ ...data, location: event.nativeEvent.coordinate });
  };
  console.log(location);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <MapView
              style={{ width: "100%", height: 200 }}
              initialRegion={{
                latitude: 29.3759,
                longitude: 47.9774,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
              onPress={onMapPress}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
          </View>

          <ImagePickerC
            image={image}
            setImage={setImage}
            style={styles.image}
            onImagePicked={(imageUri) =>
              setData({ ...data, tripImage: imageUri })
            }
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "grey" }}>Tap to select a trip image</Text>
            </View>
          </ImagePickerC>

          <Create data={data} setData={setData} setErrorText={setErrorText} />
          {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

          <View style={styles.buttonContainer}>
            <Button title="Create Trip" onPress={handleSubmit} color="black" />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 7,
    overflow: "hidden",
  },
  image: {
    width: 360,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20,
    resizeMode: "cover",
    borderRadius: 7,
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
  mapContainer: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
  },
});
