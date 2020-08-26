import React, { useEffect, useState, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Components
import Navigation from "./src/navigations/Navigation";
import { ActivityIndicator, View } from "react-native";
//CONTEXT
import { AuthContext } from "./src/components/context";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState<string | null>(null);

    const authContext = useMemo(
        () => ({
            signIn: () => {
                setUserToken("tesdads");
                setIsLoading(false);
            },
            signOut: () => {
                setUserToken(null);
                setIsLoading(false);
            },
            signUp: () => {
                setUserToken("tesdads");
                setIsLoading(false);
            },
        }),
        []
    );

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
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
                <Navigation userToken={userToken} />
            </SafeAreaProvider>
        </AuthContext.Provider>
    );
}
