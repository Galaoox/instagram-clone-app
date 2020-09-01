import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createBottomTabNavigator,
    BottomTabBarOptions,
} from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { colors } from "../utils/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Stacks
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import ActivityStack from "./ActivityStack";
import AccountStack from "./AccountStack";
import PostStack from "./PostStack";
import AuthStack from "./AuthStack";
import { UserContext } from "../components/context";

const Tab = createBottomTabNavigator();
// Creo el context

export default function Navigation(props: any) {
    let tabBarVisible = true;
    console.log(props);

    const tabOptions: BottomTabBarOptions = {
        inactiveTintColor: colors.inactive,
        activeTintColor: colors.principal,
        showLabel: false,
    };
    return (
        <UserContext.Consumer>
            {({ userToken }) => (
                <SafeAreaProvider>
                    <NavigationContainer>
                        {userToken ? (
                            <Tab.Navigator
                                initialRouteName="account"
                                tabBarOptions={tabOptions}
                                screenOptions={({ route }) => ({
                                    tabBarIcon: ({ color }) =>
                                        screenOptions(route, color),
                                    tabBarVisible: getTabBarVisibility(route),
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

                                {/* POST STACK  CAMBIAR EL COMPONENTE*/}
                                <Tab.Screen
                                    name="post"
                                    component={PostStack}
                                    options={{
                                        tabBarLabel: "Crear publicación",
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
                                    component={AccountStack}
                                    options={{
                                        tabBarLabel: "",
                                    }}
                                />
                            </Tab.Navigator>
                        ) : (
                            <AuthStack />
                        )}
                    </NavigationContainer>
                </SafeAreaProvider>
            )}
        </UserContext.Consumer>
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
            iconName = color === colors.inactive ? "heart-outline" : "heart";
            break;
        case "search":
            iconName = "magnify";
            break;
        case "account":
            iconName = "account-circle";
            break;
        case "post":
            iconName = "plus-box-outline";
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

/**
 * oculta o muestra el tab bar
 * @param route indica la ruta en la que se encuentra el navigation
 */
function getTabBarVisibility(route: any) {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : "";

    if (routeName === "comments") {
        return false;
    }

    return true;
}
