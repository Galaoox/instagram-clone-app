import React from "react";
import Navigation from "./src/navigations/Navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducers from "./src/reducers";

export default function App() {
    return (
        <Provider store={createStore(Reducers)}>
            <Navigation />
        </Provider>
    );
}
