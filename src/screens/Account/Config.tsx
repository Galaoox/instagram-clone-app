import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
// Redux
import { connect } from "react-redux";
import { login, clear } from "../../redux/actions/session.actions";

function Config(props: any) {
    const { user, login, clear } = props;
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = () => {
        setLoading(true);
        login({ email, password })
            .then((res: any) => {
                setLoading(false);
                Alert.alert("confirmacion", "Iniciaste sesión correctamente");
                // Se puede enviar a otra screen
            })
            .catch((err: any) => {
                setLoading(false);
                Alert.alert("Error", err.message);
            });
    };
    const deleteSession = () => {
        clear();
    };

    return (
        <View>
            <Text>Nombre usuario: {user.name}</Text>
            <Input
                label="correo"
                placeholder="correo"
                onChange={(event) => setEmail(event.nativeEvent.text)}
            />
            <Input
                label="contra"
                placeholder="contra"
                onChange={(event) => setPassword(event.nativeEvent.text)}
            />
            <Button onPress={submitLogin} title="iniciar sesion" />
            <Button onPress={deleteSession} title="eliminar sesion" />
        </View>
    );
}
const styles = StyleSheet.create({});
// Adiciona a los props entrantes los elementos del reducer
const mapStateToProps = (state: any) => {
    return {
        user: state.session && state.session.user ? state.session.user : false,
    }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps, { login, clear })(Config);
