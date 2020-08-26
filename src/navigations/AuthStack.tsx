import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();
export default function AuthStack(props: any) {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
    );
}
