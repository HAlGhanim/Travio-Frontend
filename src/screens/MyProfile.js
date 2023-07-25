import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { removeToken } from "../apis/auth/storage";

const MyProfile = () => {
  const { setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser(false);
    removeToken();
  };
  return (
    <>
      <View style={{ backgroundColor: "gray", flex: 1 }}>
        <Text>Profile</Text>
        <Button
          title="Logout"
          onPress={() => {
            handleLogout();
          }}
        />
      </View>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({});
