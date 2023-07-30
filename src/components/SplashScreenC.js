import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const SplashScreenC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <LottieView
        source={require("../../assets/animation.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreenC;

const styles = StyleSheet.create({});
