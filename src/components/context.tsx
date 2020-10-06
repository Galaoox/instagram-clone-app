import React, { createContext } from "react";

export const AuthContext = createContext({
    signIn: (
        email: string | null,
        password: string | null,
        callbackLoading: Function
    ) => {},
    signOut: () => {},
    signUp: (
        email: string | null,
        name: string | null,
        username: string | null,
        password: string | null,
        callbackLoading: Function
    ) => {},
    updateProfile: (
        name: string | null,
        username: string | null,
        biography: string | null,
        webSite: string | null,
        image: Object | null,
        callbackLoading: Function
    ) => {},
});

export const UserContext = createContext({
    username: null,
    name: null,
    token: null,
    imageUrl: null,
    biography: null,
    webSite: null,
});
