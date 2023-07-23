import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImagePickerC from "../components/Shared/ImagePickerC";

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Text>SignUp</Text>
      <ImagePickerC onImagePicked={setImage} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {},
});
