import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../apis/auth";
import { saveToken } from "../apis/auth/storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../navigation";


const SignUp = () => {
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();

  const { mutate: signupFunction, error } = useMutation({
    mutationFn: () => signup({ ...userInfo, image }),
    onSuccess: (data) => {
      saveToken(data.token);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <View
      style={{
        alignItems: "center",
        height: 500,
        justifyContent: "center",
      }}
    >
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setUserInfo(values);
          signupFunction();
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <TouchableOpacity onPress={pickImage}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "gray",
                  borderRadius: 50,
                  overflow: "hidden",
                  marginBottom: 20,
                }}
              >
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              placeholder="Username"
              onChangeText={handleChange("username")}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <TextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default SignUp;
