import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { removeToken } from "../apis/auth/storage";

const MyProfile = ({ user }) => {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(false);
    removeToken();
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "gray", flex: 1 }}>
        <Text>Profile</Text>

        <Button
          title="Logout"
          onPress={() => {
            handleLogout();
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({});
