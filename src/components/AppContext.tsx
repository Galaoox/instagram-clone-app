import React, { useEffect, useMemo, useReducer } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext, UserContext } from "./context";
import { postRequest, putRequest } from "../utils/api";
import { colors } from '../utils/theme';

interface IloginState {
    isLoading: boolean;
    username: string | null;
    name: string | null;
    token: string | null;
    imageUrl: string | null;
    biography: string | null;
    webSite: string | null;
}

export default function AppContext(props: { children: any }) {
    const { children } = props;

    const initialLoginState: IloginState = {
        isLoading: true,
        username: null,
        name: null,
        token: null,
        imageUrl: null,
        biography: null,
        webSite: null,
    };
    const loginReducer = (prevState: IloginState, action: any) => {
        switch (action.type) {
            case "GET_DATA":
                return {
                    ...prevState,
                    token: action.token,
                    username: action.username,
                    name: action.name,
                    imageUrl: action.imageUrl,
                    biography: action.biography,
                    webSite: action.webSite,
                    isLoading: false,
                };
            case "LOGIN":
                return {
                    ...prevState,
                    token: action.token,
                    username: action.username,
                    name: action.name,
                    imageUrl: action.imageUrl,
                    biography: action.biography,
                    webSite: action.webSite,
                    isLoading: false,
                };
            case "LOGOUT":
                return {
                    ...prevState,
                    token: null,
                    username: null,
                    name: null,
                    imageUrl: null,
                    biography: null,
                    webSite: null,
                    isLoading: false,
                };
            case "REGISTER":
                return {
                    ...prevState,
                    username: action.username,
                    name: action.name,
                    imageUrl: action.imageUrl,
                    biography: action.biography,
                    webSite: action.webSite,
                    isLoading: false,
                };
            case "UPDATE_PROFILE":
                return {
                    ...prevState,
                    token: action.token,
                    username: action.username,
                    name: action.name,
                    imageUrl: action.imageUrl,
                    biography: action.biography,
                    webSite: action.webSite,
                    isLoading: false,
                };
                
            case "UPDATE_EMAIL":
                return {
                    ...prevState,
                    token: action.token,
                    isLoading: false,
                }

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
                    const {
                        name,
                        token,
                        username,
                        imageUrl,
                        biography,
                        webSite,
                    } = res;
                    await AsyncStorage.setItem("token", token);
                    await AsyncStorage.setItem(
                        "userData",
                        JSON.stringify({
                            name,
                            token,
                            username,
                            imageUrl,
                            biography,
                            webSite,
                        })
                    );

                    dispatch({
                        type: "LOGIN",
                        username,
                        token: token,
                        name,
                        imageUrl,
                        biography,
                        webSite,
                    });
                });
            },
            signOut: async () => {
                try {
                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("userData");
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
                postRequest("auth/singup", data, async (res: any) => {
                    callbackLoading();
                    const {
                        name,
                        token,
                        username,
                        imageUrl,
                        biography,
                        webSite,
                    } = res;
                    await AsyncStorage.setItem("token", token);
                    await AsyncStorage.setItem(
                        "userData",
                        JSON.stringify({
                            name,
                            username,
                            imageUrl,
                            biography,
                            webSite,
                        })
                    );
                    dispatch({
                        type: "REGISTER",
                        username,
                        token,
                        name,
                        imageUrl,
                        biography,
                        webSite,
                    });
                });
            },
            updateProfile: (
                name: string | null,
                username: string | null,
                biography: string | null,
                webSite: string | null,
                image: Object | null,
                callbackLoading: Function
            ) => {
                const data = {
                    name: name,
                    username: username,
                    biography: biography,
                    webSite: webSite,
                    image: image,
                };
                putRequest("user/editProfile", data, async (res: any) => {
                    await callbackLoading();
                    const {
                        name,
                        token,
                        username,
                        imageUrl,
                        biography,
                        webSite,
                    } = res;
                    await AsyncStorage.setItem("token", token);
                    await AsyncStorage.setItem(
                        "userData",
                        JSON.stringify({
                            name,
                            username,
                            imageUrl,
                            biography,
                            webSite,
                        })
                    );
                    await dispatch({
                        type: "UPDATE_PROFILE",
                        username,
                        token,
                        name,
                        imageUrl,
                        biography,
                        webSite,
                    });
                });
            },
            changeEmail: async(newEmail: string | null, password: string | null , callbackLoading: Function) => {
                const data = {newEmail, password};
                putRequest('user/updateEmail', data, async(res: any)=>{
                    await callbackLoading();
                    const {token} = res;
                    console.log("Imprimiendo respuesta",res);
                    if(token){
                        await AsyncStorage.setItem("token", token);
                        await dispatch({
                            type: "UPDATE_EMAIL",
                            token,
                        });
                    }
                })
            }
        }),
        []
    );

    useEffect(() => {
        setTimeout(async () => {
            let token = null;
            let userData: Object | null | string = {};
            try {
                token = await AsyncStorage.getItem("token");
                userData = await AsyncStorage.getItem("userData");
                userData = userData ? JSON.parse(userData as string) : {};
            } catch (error) {
                throw new Error(error);
            }
            dispatch({
                type: "GET_DATA",
                token: token,
                ...(userData as Object),
            });
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
                <ActivityIndicator size="large" color={colors.principal} />
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
