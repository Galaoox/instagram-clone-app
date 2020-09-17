import React from "react";
// Components
import Navigation from "./src/navigations/Navigation";
import AppContext from "./src/components/AppContext";
import { YellowBox } from "react-native";
import { decode, encode } from "base-64";

YellowBox.ignoreWarnings(["Setting a timer"]);
if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
    return (
        <AppContext>
            <Navigation />
        </AppContext>
    );
}
