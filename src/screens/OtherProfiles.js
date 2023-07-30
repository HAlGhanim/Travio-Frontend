import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { profile } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import UserTrips from "../components/Trips/UserTrips";
const OtherProfiles = ({ navigation, route }) => {
  const name = route.params._id;
  console.log("herrrrrreee", name);

  const {
    data: profileFun,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["profile", name],
    queryFn: () => profile(name._id),
  });

  if (isLoading) return <Text>Loading...</Text>;
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
        </View>
      </View>

      <Text style={styles.bio}>{profileFun?.bio}</Text>

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
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  view: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#999",
  },

  bio: {
    padding: 20,
    fontSize: 16,
    color: "#333",
  },
});

export default OtherProfiles;
