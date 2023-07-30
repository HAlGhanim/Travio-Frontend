import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import UserContext from "../context/UserContext";
import { signUp } from "../apis/auth";
import { saveToken } from "../apis/auth/storage";
import ROUTES from "../navigation/index";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

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

  // Function to pick an image from the device's gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/.{8,}$/, "Password must be at least 8 characters long.")
      .matches(/\d/, "Password must contain a number.")
      .matches(/[A-Z]/, "Password must contain an uppercase letter.")
      .matches(/[a-z]/, "Password must contain a lowercase letter.")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a symbol."),
    passwordConfirmation: Yup.string()
      .required("Confirmation password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSignin = () => {
    navigation.navigate(ROUTES.AUTHROUTES.SIGNIN);
  };

  return (
    <View style={styles.container}>
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
            {/* Image picker */}
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.imageContainer}>
                {/* Display selected image or user icon */}
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Icon name="user" size={50} color="#7f8c8d" />
                )}
              </View>
            </TouchableOpacity>

            {/* Username input */}
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color="#7f8c8d" style={styles.icon} />
              <TextInput
                placeholder="Username"
                onChangeText={handleChange("username")}
                value={values.username}
                style={styles.input}
              />
            </View>
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            {/* Email input */}
            <View style={styles.inputContainer}>
              <Icon
                name="envelope"
                size={20}
                color="#7f8c8d"
                style={styles.icon}
              />
              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                value={values.email}
                style={styles.input}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            {/* Password input */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#7f8c8d" style={styles.icon} />
              <TextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry
                style={styles.input}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* Password confirmation input */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#7f8c8d" style={styles.icon} />
              <TextInput
                placeholder="Password Confirmation"
                onChangeText={handleChange("passwordConfirmation")}
                value={values.passwordConfirmation}
                secureTextEntry
                style={styles.input}
              />
            </View>
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.error}>{errors.passwordConfirmation}</Text>
            )}

            {/* Display error message */}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

            {/* Signup button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signUpFlex}>
              <Text style={styles.signUpText2}>Do you have an account?</Text>
              <TouchableOpacity onPress={handleSignin}>
                <Text style={styles.signUpText}> Sign in</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#e6e6e6", // Background color for the image container
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#e6e6e6", // Background color for the input fields
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6e6e6", // Background color for the input fields
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  signUpFlex: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  signUpText: {
    color: "#3498db",
    textAlign: "center",
    marginLeft: 10,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

export default SignUp;
