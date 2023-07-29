import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { removeToken } from "../apis/auth/storage";
import { profile } from "../apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BASE_URL } from "../apis";

import UserTrips from "../components/Trips/UserTrips";
const MyProfile = ({ navigation, route }) => {
  const { user, setUser } = useContext(UserContext);
  const name = route.params?._id;
  console.log("herrrrrreee", name);
  console.log(user);
  const handleLogout = () => {
    setUser(false);
    removeToken();
  };

  const {
    data: profileFun,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profile(user._id),
  });

  useEffect(() => {
    if (user) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [navigation, user]);

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
          <Button
            title="Edit Profile"
            onPress={updateProfile}
            color="darkblue"
          />
        </View>
      </View>

      <Text style={styles.bio}>{profileFun?.bio}</Text>
      <SafeAreaView style={styles.view}>
        <UserTrips
          trips={profileFun?.trips}
          isLaoding={isLoading}
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

export default MyProfile;
