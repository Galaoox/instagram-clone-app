import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
/*redux configuration*/
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import reducers from "./src/redux/reducers";
import thunk from "redux-thunk";

// Components
import Navigation from "./src/navigations/Navigation";
// TODO: AVERIGUAR PARA QUE FUNCIONA

const loggerMiddleware = createLogger({ predicate: () => false });
const persistedReducer = persistReducer(
    { key: "root", storage: AsyncStorage, blacklist: ["filter", "modals"] },
    reducers
);
// TODO: AVERIGUAR PARA QUE FUNCIONA
function configureStore(initialState: any) {
    const enhancer = compose(applyMiddleware(thunk, loggerMiddleware));
    return createStore(persistedReducer, initialState, enhancer);
}
// TODO: AVERIGUAR PARA QUE FUNCIONA

const initialState = {};
export const store = configureStore(initialState);
export const persistor = persistStore(store);

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <Navigation />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
