import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import ImagePickerC from "../components/Shared/ImagePickerC";

const CreateTrip = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {};

  //   navigation.setOptions({ title: "Create Trip" });

  return (
    <>
      <View style={styles.container}>
        <ImagePickerC />

        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
          placeholderTextColor="gray"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
          placeholderTextColor="gray"
          multiline
          numberOfLines={4}
        />
        <View style={styles.buttonContainer}>
          <Button title="Create Trip" onPress={handleSubmit} color="#841584" />
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
  input: {
    height: 40,

    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    fontSize: 18,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
