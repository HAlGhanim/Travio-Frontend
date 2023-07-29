import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ImagePickerC from "../components/Shared/ImagePickerC";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrip } from "../apis/trips/index";
import Create from "../components/Trips/Create";
import ROUTES from "../navigation";
import MapView, { Marker } from "react-native-maps";

const CreateTrip = ({ navigation }) => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    predicate: (query) => {
      // console.log("[KEYS - create trip]: ", query.queryKey[0]);
    },
  });

  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  // const [location, setLocation] = useState(null);

  const { mutate: createTripFun } = useMutation({
    mutationFn: () => createTrip(data),
    onSuccess: () => {
      // Invalidate and refetch
      setData({});
      setImage(null);
      queryClient.invalidateQueries(["trips"]);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
    },
  });

  const handleSubmit = () => {
    createTripFun();
  };

  // const onMapPress = (event) => {
  //   setLocation({
  //     latitude: event.nativeEvent.coordinate.latitude,
  //     longitude: event.nativeEvent.coordinate.longitude,
  //   });
  //   setData({ ...data, location: event.nativeEvent.coordinate });
  // };

  return (
    <>
      <View style={styles.container}>
        {/* <MapView
          style={{ width: "100%", height: 200 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={onMapPress}
        >
          {location && <Marker coordinate={location} />}
        </MapView> */}

        <ImagePickerC
          image={image}
          setImage={setImage}
          style={styles.image}
          onImagePicked={(imageUri) =>
            setData({ ...data, tripImage: imageUri })
          }
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "grey" }}>Tap to select a trip image</Text>
          </View>
        </ImagePickerC>

        <Create data={data} setData={setData} />

        <View style={styles.buttonContainer}>
          <Button title="Create Trip" onPress={handleSubmit} color="black" />
        </View>
      </View>
    </>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    borderRadius: 7,
    marginBottom: 20,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    marginTop: 12,

    // marginLeft: 12,
    // marginRight: 12,
  },
});
