import React, { useEffect, useMemo, useReducer } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext, UserContext } from "./context";
import { postRequest } from "../utils/api";

interface IloginState {
    isLoading: boolean;
    username: string | null;
    name: string | null;
    token: string | null;
}

export default function AppContext(props: { children: any }) {
    const { children } = props;

    const initialLoginState: IloginState = {
        isLoading: true,
        username: null,
        name: null,
        token: null,
    };
    const loginReducer = (prevState: IloginState, action: any) => {
        switch (action.type) {
            case "RETRIEVE_TOKEN":
                return {
                    ...prevState,
                    token: action.token,
                    isLoading: false,
                };
            case "LOGIN":
                return {
                    ...prevState,
                    token: action.token,
                    username: action.username,
                    name: action.name,
                    isLoading: false,
                };
            case "LOGOUT":
                return {
                    ...prevState,
                    token: null,
                    username: null,
                    name: null,
                    isLoading: false,
                };
            case "REGISTER":
                return {
                    ...prevState,
                    token: action.token,
                    username: action.username,
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
            signIn: async (
                email: string | null,
                password: string | null,
                callbackLoading: Function
            ) => {
                const data = {
                    email,
                    password,
                };
                postRequest("auth/singin", data, async (res: any) => {
                    callbackLoading();
                    const { msg, name, token, username } = res;
                    await AsyncStorage.setItem("token", token);
                    dispatch({
                        type: "LOGIN",
                        username,
                        token: token,
                        name,
                    });
                });
            },
            signOut: async () => {
                try {
                    await AsyncStorage.removeItem("token");
                } catch (error) {
                    throw new Error(error);
                }
                dispatch({ type: "LOGOUT" });
            },
            signUp: (
                email: string | null,
                name: string | null,
                username: string | null,
                password: string | null,
                callbackLoading: Function
            ) => {
                const data = {
                    email: email,
                    username: username,
                    password: password,
                    name: name,
                };
                postRequest("auth/singup", data, (res: any) => {
                    callbackLoading();
                    const { msg, name, token, username } = res;

                    dispatch({
                        type: "REGISTER",
                        username,
                        token,
                        name,
                    });
                });
            },
        }),
        []
    );

    useEffect(() => {
        setTimeout(async () => {
            let token = null;
            try {
                token = await AsyncStorage.getItem("token");
            } catch (error) {
                throw new Error(error);
            }
            dispatch({ type: "RETRIEVE_TOKEN", token: token });
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
