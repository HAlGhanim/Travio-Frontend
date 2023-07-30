import instance, { BASE_URL } from "..";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getAllTrips = async () => {
  const res = await instance.get("/trips/");
  return res.data.reverse();
};
const getTripById = async (id) => {
  const res = await instance.get(`/trips/${id}`);
  return res.data;
};

const createTrip = async (data) => {
  const token = await SecureStore.getItemAsync("token");
  const instance = axios.create({
    baseURL: BASE_URL + "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const formData = new FormData();

  for (const key in data) {
    if (key != "tripImage") {
      formData.append(key, data[key]);
    } else {
      formData.append("tripImage", {
        name: data.tripImage,
        type: "image/jpeg",
        uri: data.tripImage,
      });
    }
  }
  const res = await instance.post("/trips/", formData, {
    headers: {
      Accept: "application/json. text/plain, /",
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const updateTrip = async (id, data) => {
  console.log("first2");
  const formData = new FormData();

  for (const key in data) {
    if (key != "tripImage") {
      formData.append(key, data[key]);
    } else {
      console.log(data.tripImage);
      if (data.tripImage?.includes("file"))
        formData.append("tripImage", {
          name: data.tripImage,
          type: "image/jpeg",
          uri: data.tripImage,
        });
    }
  }
  console.log("HELLLLLLO", formData);
  const res = await instance.put(`/trips/${id}`, formData, {
    headers: {
      Accept: "application/json. text/plain, /",
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const deleteTrip = async (id) => {
  const res = await instance.delete(`/trips/${id}`);
  return res.data;
};

export { createTrip, getAllTrips, updateTrip, deleteTrip, getTripById };
