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
      formData.append("image", {
        name: userInfo.image,
        type: "image/jpeg",
        uri: userInfo.image,
      });
    }
  }
  console.log(formData);
  const res = await instance.post("/users/signup", formData);
  return res.data;
};

export { signIn, signUp };
