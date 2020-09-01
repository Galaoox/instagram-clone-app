import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Image} from 'react-native-elements';
// Components
import Home from "../screens/Home";
import {SCREEN} from "../utils/theme";

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                    headerTitle: () => <Image
                        style={{
                            height: '100%',
                            width: SCREEN.WIDTH / 2.5
                        }}
                        resizeMode={"center"}
                        source={require("../../assets/logo-Instagram-black.png")}
                    />,
                    headerTitleAlign: "center",
                }}
            />
        </Stack.Navigator>
    );
}
