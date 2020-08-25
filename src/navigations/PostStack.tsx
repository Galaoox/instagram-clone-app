import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// COMPONENTES
import PostCreate from "../screens/PostCreate";

const Stack = createStackNavigator();

export default function PostStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="postCreate"
                component={PostCreate}
                options={{
                    title: "Crear publicación",
                }}
            />
        </Stack.Navigator>
    );
}
