import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ImagePickerC from "../components/Shared/ImagePickerC";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTrip } from "../apis/trips/index";
import Create from "../components/Trips/Create";
import ROUTES from "../navigation";
import { getLocationAddress } from "../apis/location";

const CreateTrip = ({ navigation, route }) => {
  const queryClient = useQueryClient();

  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(route.params?.location || null);

  const { data: locationDetails } = useQuery({
    queryKey: ["location", location?.latitude, location?.longitude],
    queryFn: () => getLocationAddress(location?.longitude, location?.latitude),
    enabled: !!location,
  });

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
      setLocation(null);
      queryClient.invalidateQueries(["trips"]);
      queryClient.invalidateQueries(["profile"]);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  const handleSelectLocation = () => {
    navigation.navigate("SelectLocationMap"); // Navigate to Map screen
  };
  const handleSubmit = () => {
    createTripFun();
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.label}>Set Your Trip Location</Text>
            <View style={styles.locationContainer}>
              <TouchableOpacity onPress={handleSelectLocation}>
                {location ? (
                  <>
                    <Text style={styles.locationText}>
                      Country: {locationDetails?.countryName}
                    </Text>
                    <Text style={styles.locationText}>
                      City: {locationDetails?.city}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.selectLocation}>Select Location</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>
              Choose an Image to Represent Your Trip
            </Text>
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
                <Text style={{ color: "grey" }}>
                  Tap to select a trip image
                </Text>
              </View>
            </ImagePickerC>

            <Create data={data} setData={setData} />
            <View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Create Trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "darkblue",
    padding: 10,
    alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    width: 200,
    marginTop: 20,
  },
  image: {
    width: 360,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,

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

  buttonText: {
    color: "white",
    fontSize: 18,
  },
  selectLocation: { color: "gray" },

  locationContainer: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "flex-start",
    width: 360,
    height: 55,
  },

  locationText: {
    fontSize: 16,
    color: "black",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 12,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
});
