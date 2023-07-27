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

    const queryClient = useQueryClient();

    const { } = useQuery({
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
            console.log({ error });
        },
    });

    const queryCache = queryClient.getQueryCache();

    const liveQueriesOnScreen = queryCache.findAll({ active: true });

    const queryKeys = liveQueriesOnScreen.map((query) => {
        return query.queryKey;
    });

    // console.log({ queryKeys })

    const { mutate: updateTripFun } = useMutation({
        mutationFn: (data) => updateTrip(_id, data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["trips"]);
            navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
        },
        onError: (e) => {
            console.log(e);
        },
    });

    const handleSubmit = () => {
        updateTripFun(data);
    };

    return (

        <>
            <View style={styles.container}>
                <ImagePickerC
                    style={styles.image}
                    onImagePicked={(imageUri) =>
                        setData({ ...data, tripImage: imageUri })

                    } imageData={data.tripImage}
                />

                <Update data={data} setData={setData} />

                <View style={styles.buttonContainer}>
                    <Button title="Update Trip" onPress={handleSubmit} color="darkblue" />
                </View>
            </View>
        </>
    );
};

export default UpdateTrip;

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
