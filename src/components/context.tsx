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
});

export const UserContext = createContext({
    username: null,
    name: null,
    token: null,
});
