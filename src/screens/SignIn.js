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
import Icon from "react-native-vector-icons/FontAwesome";

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
      <View style={[styles.gradient, { backgroundColor: "#e6f7ff" }]} />
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
            <View style={styles.inputContainer}>
              <Icon
                name="user"
                size={20}
                color="#7f8c8d"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Username"
                onChangeText={handleChange("username")}
                value={values.username}
                style={styles.input}
                onFocus={() => setErrorText("")}
              />
            </View>
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color="#7f8c8d"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry
                style={styles.input}
                onFocus={() => setErrorText("")}
              />
            </View>

            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.signUpFlex}>
              <Text style={styles.signUpText2}>Don't Have an account?</Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.signUpText}> Sign up</Text>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f9ff",
    padding: 30,
  },
  // gradient: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
    borderRadius: 25,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  inputIcon: {
    marginLeft: 20,
    marginRight: 10,
  },
  error: {
    color: "#c0392b",
    marginBottom: 15,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 30,
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    transform: [{ scale: 1.02 }],
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpText: {
    color: "#3498db",
    textAlign: "center",
    marginLeft: 10,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  signUpText2: {
    color: "#7f8c8d",
    textAlign: "center",
  },
  signUpFlex: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
});

export default SignIn;
