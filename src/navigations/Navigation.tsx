import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createBottomTabNavigator,
    BottomTabBarOptions,
} from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { colors } from "../utils/theme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// Stacks
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import ActivityStack from "./ActivityStack";
import AccountStack from "./AccountStack";
import { connect } from "react-redux";

const Tab = createBottomTabNavigator();

function Navigation(props: any) {
    const { user } = props; // TODO CAMBIAR ESOS PROPS

    const tabOptions: BottomTabBarOptions = {
        inactiveTintColor: colors.inactive,
        activeTintColor: colors.principal,
        showLabel: false,
    };
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={user ? "home" : "account"}
                    tabBarOptions={tabOptions}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color }) => screenOptions(route, color),
                    })}
                >
                    {/* HOME STACK */}
                    {user && (
                        <Tab.Screen
                            name="home"
                            component={HomeStack}
                            options={{
                                tabBarLabel: "",
                            }}
                        />
                    )}

                    {/* SEARCH STACK */}
                    {user && (
                        <Tab.Screen
                            name="search"
                            component={SearchStack}
                            options={{
                                tabBarLabel: "",
                            }}
                        />
                    )}

                    {/* POST STACK  CAMBIAR EL COMPONENTE*/}
                    {user && (
                        <Tab.Screen
                            name="post"
                            component={SearchStack}
                            options={{
                                tabBarLabel: "",
                            }}
                        />
                    )}

                    {/* ACTIVITY STACK */}
                    {user && (
                        <Tab.Screen
                            name="activity"
                            component={ActivityStack}
                            options={{
                                tabBarLabel: "",
                            }}
                        />
                    )}
                    {/* ACCOUNT STACK */}

                    <Tab.Screen
                        name="account"
                        component={AccountStack}
                        options={{
                            tabBarLabel: "",
                            tabBarVisible: user,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
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

// Adiciona a los props entrantes los elementos del reducer
const mapStateToProps = (state: any) => {
    return {
        user: state.session && state.session.user ? state.session.user : false,
    }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps)(Navigation);
