import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Components
import Navigation from "./src/navigations/Navigation";
import AppContext from "./src/components/AppContext";

export default function App() {
    return (
        <AppContext>
            <Navigation />
        </AppContext>
    );
}
