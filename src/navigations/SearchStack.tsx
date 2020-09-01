import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import Search from "../screens/Search";
import Profile from "../components/Account/Profile";

const Stack = createStackNavigator();
export default function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="search"
                component={Search}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="profile" component={Profile} />
        </Stack.Navigator>
    );
}
