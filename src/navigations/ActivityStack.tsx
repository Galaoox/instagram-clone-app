import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import Activity from "../screens/Activity";

const Stack = createStackNavigator();
export default function ActivityStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="activity"
                component={Activity}
                options={{
                    title: "Actividad",
                }}
            />
        </Stack.Navigator>
    );
}
