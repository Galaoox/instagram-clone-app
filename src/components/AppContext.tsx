import React, {useEffect, useMemo, useReducer} from "react";
import {ActivityIndicator, View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {AuthContext, UserContext} from "./context";

interface IloginState {
    isLoading: boolean;
    userName: string | null;
    name: string | null;
    userToken: string | null;
}

export default function AppContext(props: { children: any }) {
    const { children } = props;

    const initialLoginState: IloginState = {
        isLoading: true,
        userName: null,
        name: null,
        userToken: null,
    };
    const loginReducer = (prevState: IloginState, action: any) => {
        switch (action.type) {
            case "RETRIEVE_TOKEN":
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case "LOGIN":
                return {
                    ...prevState,
                    userToken: action.token,
                    userName: action.userName,
                    name: action.name,
                    isLoading: false,
                };
            case "LOGOUT":
                return {
                    ...prevState,
                    userToken: null,
                    userName: null,
                    name: null,
                    isLoading: false,
                };
            case "REGISTER":
                return {
                    ...prevState,
                    userToken: action.token,
                    userName: action.userName,
                    name: action.name,
                    isLoading: false,
                };

            default:
                throw new Error();
        }
    };
    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
    const authContext = useMemo(
        () => ({
            signIn: async (email: string, password: string) => {
                let userToken;
                let userName = null;
                let name;
                userToken = "testToken";
                userName = "erickavn1984";
                name = "Hannyker Arturo Vergara Noriega";
                try {
                    await AsyncStorage.setItem("userToken", userToken);
                } catch (error) {
                    throw new Error(error);
                }
                dispatch({ type: "LOGIN", userName, token: userToken, name });
            },
            signOut: async () => {
                try {
                    await AsyncStorage.removeItem("userToken");
                } catch (error) {
                    throw new Error(error);
                }
                dispatch({ type: "LOGOUT" });
            },
            signUp: (
                email: string,
                name: string,
                userName: string,
                password: string
            ) => {
                let userToken = "testToken";
                userName = "erickavn1984";
                name = "Hannyker Andre Vergara Noriega";
                dispatch({ type: "LOGIN", userName, token: userToken, name });
            },
        }),
        []
    );

    useEffect(() => {
        setTimeout(async () => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem("userToken");
            } catch (error) {
                throw new Error(error);
            }
            dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
        }, 1000);
    }, []);

    if (loginState.isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <UserContext.Provider value={loginState}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    );
}
