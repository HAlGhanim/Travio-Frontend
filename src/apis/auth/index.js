import instance from "..";

const signIn = async (userInfo) => {
  const res = await instance.post("/users/signin", userInfo);
  return res.data;
};

const signUp = async (userInfo) => {
  const formData = new FormData();

  for (const key in userInfo) {
    if (key != "image") {
      formData.append(key, userInfo[key]);
    } else {
      if (userInfo.image)
        formData.append("image", {
          name: userInfo.image,
          type: "image/jpeg",
          uri: userInfo.image,
        });
    }
  }

  const res = await instance.post("/users/signup", formData, {
    headers: {
      Accept: "application/json. text/plain, /",
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
const profile = async (id) => {
  const res = await instance.get(`/users/profile/${id}`);
  console.log("herree", id);
  return res.data;
};
export { signIn, signUp, profile };
