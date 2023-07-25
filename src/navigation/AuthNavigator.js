import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import ROUTES from ".";

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name={ROUTES.AUTHROUTES.SIGNIN}
      component={SignIn}
      options={({ route }) => ({
        headerShown: route.name === ROUTES.AUTHROUTES.SIGNIN, 
      })}
    />
    <AuthStack.Screen
      name={ROUTES.AUTHROUTES.SIGNUP}
      component={SignUp}
      options={({ route }) => ({
        headerShown: route.name === ROUTES.AUTHROUTES.SIGNUP,
      })}
    />
  </AuthStack.Navigator>
);

export default AuthNavigator;
