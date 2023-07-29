import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Update = ({ data, setData, setErrorText }) => {
  const handleFocus = () => {
    setErrorText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#A9A9A9"
        value={data.title}
        onChangeText={(value) => setData({ ...data, title: value })}
        onFocus={handleFocus}
        required
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        value={data.description}
        onChangeText={(value) => setData({ ...data, description: value })}
        multiline
        onFocus={handleFocus}
        required
      />
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({});
