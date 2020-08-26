import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

// Components
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import NavigationIconConfig from "./NavigationIconConfig";
import Config from "../screens/Account/Config";
import EditProfile from "../screens/Account/EditProfile";

const Stack = createStackNavigator();
export default function AccountStack(props: any) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                options={{
                    title: "Cuenta",
                    headerRight: () => <NavigationIconConfig />,
                    headerRightContainerStyle: styles.headerContainerRight,
                }}
            />

            <Stack.Screen
                name="config"
                component={Config}
                options={{
                    title: "Configuración Cuenta",
                }}
            />

            <Stack.Screen name="editProfile" component={EditProfile} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerContainerRight: {
        marginRight: 10,
    },
});
