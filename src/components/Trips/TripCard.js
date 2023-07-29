import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../apis";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../navigation";

const TripCard = ({ trip = {} }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.cardContainer]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.HEDERROUTES.OHERPROFILES, {
            _id: trip.createdBy,
          });
        }}
      >
        <Text style={styles.name}>
          {trip.createdBy ? trip.createdBy.username : "Default User"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTES.HEDERROUTES.TRIPDETAILS, {
            _id: trip._id,
          });
        }}
      >
        {/* <Text>Location: {trip.location}</Text> */}
        <View style={styles.card}>
          <Image
            source={{ uri: `${BASE_URL}/${trip.tripImage}` }}
            style={styles.image}
          />
          <Text style={styles.title}>{trip.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 26,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 225,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
    padding: 10,
  },
});

export default TripCard;
