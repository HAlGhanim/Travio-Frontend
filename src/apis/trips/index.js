import instance from "..";

const getAllTrips = async () => {
  const res = await instance.get("/trips/");
  return res.data;
};

const createTrip = async (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (key != "tripImage") {
      formData.append(key, data[key]);
    } else {
      // console.log("Image URI: ", data.tripImage);

      formData.append("tripImage", {
        name: data.tripImage,
        type: "image/jpeg",
        uri: data.tripImage,
      });

      // formData.append("file", {
      //   name: data.tripImage,
      //   type: "image/jpeg",
      //   uri: data.tripImage,
      // });

      console.log("formData: ", formData);
    }
  }
  const res = await instance.post("/trips/", formData);
  return res.data;
};

export { createTrip, getAllTrips };
