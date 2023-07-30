import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { profile } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import UserTrips from "../components/Trips/UserTrips";
import ROUTES from "../navigation";
const MyProfile = ({ navigation, route }) => {
  const { user, setUser } = useContext(UserContext);

  const {
    data: profileFun,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(user._id),
  });

  const updateProfile = () => {
    navigation.navigate(ROUTES.HEDERROUTES.UPDATEPROFILE);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: !profileFun?.image
              ? "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
              : `${BASE_URL}/${profileFun?.image}`,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.username}>@{profileFun?.username}</Text>
          <Text style={styles.bio}>{profileFun?.bio}</Text>
          <Button title="Edit Profile" onPress={updateProfile} color="gray" />
        </View>
      </View>

      <SafeAreaView style={styles.view}>
        <UserTrips
          trips={profileFun?.trips ? [...profileFun?.trips].reverse() : null}
          isLoading={isLoading}
          refetch={refetch}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  view: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 100, // Increased size
    height: 100, // Increased size
    borderRadius: 50, // Rounded corners
    borderColor: "darkblue", // Border color
    borderWidth: 2, // Border width
  },
  info: {
    marginLeft: 20,
  },
  username: {
    fontSize: 24, // Increased font size
    fontWeight: "bold",
    color: "#333", // Darker color
    marginBottom: 5, // Spacing below
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: "black",
    fontStyle: "italic", // Italic style
  },
});

export default MyProfile;
