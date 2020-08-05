import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createBottomTabNavigator,
    BottomTabBarOptions,
} from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { colors } from "../utils/theme";
// Stacks
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import ActivityStack from "./ActivityStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
    const tabOptions: BottomTabBarOptions = {
        inactiveTintColor: colors.inactive, // TODO: CAMBIAR ESTOS COLORES
        activeTintColor: colors.principal, // TODO: CAMBIAR ESTOS COLORES,
        showLabel: false,
    };
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="home"
                tabBarOptions={tabOptions}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                })}
            >
                {/* HOME STACK */}
                <Tab.Screen
                    name="home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: "",
                    }}
                />
                {/* SEARCH STACK */}
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{
                        tabBarLabel: "",
                    }}
                />
                {/* ACTIVITY STACK */}
                <Tab.Screen
                    name="activity"
                    component={ActivityStack}
                    options={{
                        tabBarLabel: "",
                    }}
                />
                {/* ACCOUNT STACK */}

                <Tab.Screen
                    name="account"
                    component={SearchStack}
                    options={{
                        tabBarLabel: "",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

/**
 * Funcion que retorna el icono que se usara en la navegacion con el color
 * @param {*} route identificador de la ruta
 * @param {*} color
 */
function screenOptions(route: { name: string }, color: string) {
    let iconName = "account-question";
    switch (route.name) {
        case "home":
            iconName = "home-variant";
            break;
        case "activity":
            iconName = "heart-outline";
            break;
        case "search":
            iconName = "magnify";
            break;
        case "account":
            iconName = "account-circle";
            break;
        default:
            break;
    }
    return (
        <Icon
            type="material-community"
            name={iconName}
            size={32}
            color={color}
        />
    );
}
