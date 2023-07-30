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
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.signUpFlex}>
              <Text style={styles.signUpText2}>Don't Have an account?</Text>
              <TouchableOpacity
                style={styles.signUpText}
                onPress={handleSignup}
              >
                <Text style={styles.signUpText}> Sign up.</Text>
              </TouchableOpacity>
            </View>
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
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  button: {
    backgroundColor: "darkblue",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#007BFF",
    textAlign: "center",
    marginLeft: 5,
  },
  signUpText2: {
    color: "gray",
    textAlign: "center",
  },
  signUpFlex: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default SignIn;
