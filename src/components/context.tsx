import React, { createContext } from "react";

export const AuthContext = createContext({
    signIn: (email: string, password: string) => {},
    signOut: () => {},
    signUp: (
        email: string,
        name: string,
        userName: string,
        password: string
    ) => {},
});

export const UserContext = createContext({
    userName: null,
    name: null,
    userToken: null,
});
