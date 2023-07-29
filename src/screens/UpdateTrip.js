import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { getTripById, updateTrip } from "../apis/trips";
import ImagePickerC from "../components/Shared/ImagePickerC";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Update from "../components/Trips/Update";
import ROUTES from "../navigation";

const UpdateTrip = ({ navigation, route }) => {
  const _id = route.params._id;
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [errorText, setErrorText] = useState("");
  const queryClient = useQueryClient();

  const {} = useQuery({
    queryKey: ["trip", _id],
    queryFn: () => getTripById(_id),
    onSuccess: (data) => {
      setData({
        title: data.title,
        tripImage: data.tripImage,
        description: data.description,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const queryCache = queryClient.getQueryCache();

  const liveQueriesOnScreen = queryCache.findAll({ active: true });

  const queryKeys = liveQueriesOnScreen.map((query) => {
    return query.queryKey;
  });

  // console.log({ queryKeys })

  const { mutate: updateTripFun } = useMutation({
    mutationFn: (data) => {
      console.log("first");
      return updateTrip(_id, data);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["trips"]);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
    },
    onError: (error) => {
      if (error.response?.data?.error?.message.includes("E11000")) {
        setErrorText("Trip already exists");
      }
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
    updateTripFun(data);
  };

  return (
    <>
      <View style={styles.container}>
        <ImagePickerC
          setImage={setImage}
          image={image}
          style={styles.image}
          onImagePicked={(imageUri) =>
            setData({ ...data, tripImage: imageUri })
          }
          imageData={data.tripImage}
        />

        <Update data={data} setData={setData} setErrorText={setErrorText} />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

        <View style={styles.buttonContainer}>
          <Button title="Update Trip" onPress={handleSubmit} color="darkblue" />
        </View>
      </View>
    </>
  );
};

export default UpdateTrip;

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 7,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 7,
    marginBottom: 20,
    borderColor: "#D3D3D3",
    borderWidth: 1,
  },
});
