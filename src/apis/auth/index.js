import instance from "..";

const signIn = async (userInfo) => {
  const res = await instance.post("", userInfo);
  return res.data;
};

const signUp = async (userInfo) => {
  const formData = new FormData();

  for (const key in userInfo) {
    if (key != "image") {
      formData.append(key, userInfo[key]);
    }
  }
  formData.append("image", {
    name: userInfo.image,
    type: "image/jpeg",
    uri: userInfo.image,
  });
  const res = await instance.post("", formData);
  return res.data;
};

export { signIn, signUp };
