import React from "react";
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
