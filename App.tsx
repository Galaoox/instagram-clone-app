import React, { useEffect, useReducer, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";
// Components
import Navigation from "./src/navigations/Navigation";
import { ActivityIndicator, View } from "react-native";
//CONTEXT
import { AuthContext } from "./src/components/context";

interface IloginState {
    isLoading: boolean;
    userName: string | null;
    name: string | null;
    userToken: string | null;
}

export default function App() {
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
                break;
            case "LOGIN":
                return {
                    ...prevState,
                    userToken: action.token,
                    userName: action.userName,
                    name: action.name,
                    isLoading: false,
                };
                break;
            case "LOGOUT":
                return {
                    ...prevState,
                    userToken: null,
                    userName: null,
                    name: null,
                    isLoading: false,
                };
                break;
            case "REGISTER":
                return {
                    ...prevState,
                    userToken: action.token,
                    userName: action.userName,
                    name: action.name,
                    isLoading: false,
                };
                break;

            default:
                throw new Error();
        }
    };
    //reducer

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const authContext = useMemo(
        () => ({
            signIn: async (email: string, password: string) => {
                let userToken;
                let userName = null;
                let name;
                userToken = "testToken";
                userName = "erickavn1984";
                name = "Erick Andre Vergara Noriega";
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
                name = "Erick Andre Vergara Noriega";
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
            <SafeAreaProvider>
                <Navigation userToken={loginState.userToken} />
            </SafeAreaProvider>
        </AuthContext.Provider>
    );
}
