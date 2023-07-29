import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../apis/auth";
import { saveToken } from "../apis/auth/storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../navigation";
import UserContext from "../context/UserContext";
import jwt_decode from "jwt-decode";

const SignUp = () => {
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [errorText, setErrorText] = useState("");
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const { mutate: signupFunction } = useMutation({
    mutationFn: () => signUp({ ...userInfo, image }),
    onSuccess: (data) => {
      saveToken(data.token);
      const userObj = jwt_decode(data.token);
      setUser(userObj);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
    },
    onError: (error) => {
      if (error.response?.data?.error?.message.includes("E11000")) {
        setErrorText("This user already exists");
      }
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/.{8,}$/, "Password must be at least 8 characters long.")
      ?.matches(/\d/, "Password must contain a number.")
      ?.matches(/[A-Z]/, "Password must contain an uppercase letter.")
      ?.matches(/[a-z]/, "Password must contain a lowercase letter.")
      ?.matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol."),
    passwordConfirmation: Yup.string()
      .required("Confirmation password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
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
              placeholder="Email"
              onChangeText={handleChange("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
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

            <TextInput
              placeholder="Password Confirmation"
              onChangeText={handleChange("passwordConfirmation")}
              value={values.passwordConfirmation}
              secureTextEntry
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.error}>{errors.passwordConfirmation}</Text>
            )}

            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

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
