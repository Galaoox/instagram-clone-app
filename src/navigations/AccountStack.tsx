import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import { connect } from "react-redux";

const Stack = createStackNavigator();
function AccountStack(props: any) {
    const { user } = props;
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: user,
            }}
        >
            {user && (
                <Stack.Screen
                    name="account"
                    component={Account}
                    options={{
                        title: "Cuenta",
                    }}
                />
            )}

            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
    );
}

// Adiciona a los props entrantes los elementos del reducer
const mapStateToProps = (state: any) => {
    return {
        user: state.session && state.session.user ? state.session.user : false,
    }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps)(AccountStack);
