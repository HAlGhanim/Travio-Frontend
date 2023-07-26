import { Button, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import ImagePickerC from "../components/Shared/ImagePickerC";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTrip } from "../apis/trips/index";
import Create from "../components/Trips/Create";
import ROUTES from "../navigation";
import UserContext from "../context/UserContext";

const CreateTrip = ({ navigation }) => {
  const queryClient = useQueryClient();

  const [data, setData] = useState({});

  const { mutate: createTripFun } = useMutation({
    mutationFn: () => createTrip(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["trips"]);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
      alert("Trip created successfully!");
    },
  });

  const handleSubmit = () => {
    createTripFun();
  };
  //console.log(data);

  return (
    <>
      <View style={styles.container}>
        <ImagePickerC
          style={styles.image}
          onImagePicked={(imageUri) =>
            setData({ ...data, tripImage: imageUri })
          }
        />

        <Create data={data} setData={setData} />

        <View style={styles.buttonContainer}>
          <Button title="Create Trip" onPress={handleSubmit} color="darkblue" />
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
