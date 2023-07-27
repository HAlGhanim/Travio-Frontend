import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import UserContext from "../context/UserContext";
import { signIn } from "../apis/auth";
import { saveToken } from "../apis/auth/storage";
import ROUTES from "../navigation/index";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({});
  const [errorText, setErrorText] = useState("");
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const { mutate: signinFunction, isLoading } = useMutation({
    mutationFn: () => signIn(userInfo),
    onSuccess: (data) => {
      saveToken(data.token);
      const userObj = jwt_decode(data.token);
      setUser(userObj);
      navigation.navigate(ROUTES.HEDERROUTES.EXPLORE);
    },
    onError: (error) => {
      setErrorText(error.response?.data?.error?.message || "An error occurred");
    },
  });

  const handleSignup = () => {
    navigation.navigate(ROUTES.AUTHROUTES.SIGNUP);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setUserInfo(values);
          signinFunction(values);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Username"
              onChangeText={handleChange("username")}
              value={values.username}
              style={styles.input}
              onFocus={() => {
                setErrorText("");
              }}
            />

            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <TextInput
              placeholder="Password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
              style={styles.input}
              onFocus={() => {
                setErrorText("");
              }}
            />

            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Signin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
  },
  error: {
    color: "red",
    marginBottom: 10,
    height: 50,
    width: 200,
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

export default SignIn;
