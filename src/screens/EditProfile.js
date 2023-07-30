import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { updateProfile } from "../apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../apis";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileNavigations from "../navigation/ProfileNavigator";

const EditProfile = ({ navigation, route }) => {
  const queryClient = useQueryClient();
  const { user } = route.params;
  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    image: user?.image || null,
  });

  const { mutate: updateProfileFun } = useMutation({
    mutationFn: (data) => {
      return updateProfile(user._id, data);
    },
    onSuccess: (data) => {
      // Update the user context with the updated data
      // Invalidate and refetch the user profile data

      queryClient.invalidateQueries(["profile"]);
      navigation.goBack(); // Navigate back to the MyProfile screen
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleUpdateProfile = () => {
    updateProfileFun(profileData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: profileData.image
              ? `${BASE_URL}/${profileData.image}`
              : "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
          }}
        />

        <View style={styles.info}>
          <TextInput
            style={styles.username}
            value={profileData.username}
            onChangeText={(text) =>
              setProfileData({ ...profileData, username: text })
            }
            placeholder="Username"
          />
          {/* Add more fields here for other profile information */}
        </View>
      </View>

      <TextInput
        style={styles.bio}
        value={profileData.bio}
        onChangeText={(text) => setProfileData({ ...profileData, bio: text })}
        placeholder="Bio"
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Update Profile"
          onPress={handleUpdateProfile}
          color="darkblue"
        />
      </View>
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
  buttonContainer: {
    marginTop: 20,
    borderRadius: 7,
    overflow: "hidden",
  },
});

export default EditProfile;
