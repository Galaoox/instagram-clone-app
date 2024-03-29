import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import Home from "../screens/Home";

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    title: "Inicio",
                }}
            />
        </Stack.Navigator>
    );
}
