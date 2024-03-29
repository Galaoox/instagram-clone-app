import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, IconProps, Button } from "react-native-elements";
import { passwordIcon, emailIcon, nameIcon, userIcon } from "../../utils/icons";
import { colors } from "../../utils/theme";
import { connect } from "react-redux";
import { login } from "../../redux/actions/session.actions";

function RegisterForm(props: any) {
    // TODO : crear los types
    const { toastRef, login } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    /**
     * Encargado de realizar la solicitud http al action "login"
     * enviando como parametro email y password
     */
    const submit = () => {
        login({ email, password });
    };

    return (
        <View style={styles.formContainer}>
            <Input
                label="Correo electronico"
                labelStyle={styles.labelInput}
                placeholder="Correo electronico"
                containerStyle={styles.input}
                rightIcon={emailIcon}
                onChange={(event) => setEmail(event.nativeEvent.text)}
            />
            <Input
                label="Nombre"
                labelStyle={styles.labelInput}
                placeholder="Nombre"
                rightIcon={nameIcon}
            />
            <Input
                label="Usuario"
                labelStyle={styles.labelInput}
                placeholder="Usuario"
                rightIcon={userIcon}
            />
            <Input
                label="Contraseña"
                labelStyle={styles.labelInput}
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                rightIcon={passwordIcon(showPassword, setShowPassword)}
                onChange={(event) => setPassword(event.nativeEvent.text)}
            />
            <Button
                onPress={submit}
                title="Registrarse"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 15,
        backgroundColor: "white",
        borderRadius: 30,
    },
    input: {
        width: "100%",
        marginTop: 20,
    },
    labelInput: {
        color: "black",
    },
    btnContainerLogin: {
        marginTop: 20,
        marginBottom: 20,
        width: "95%",
    },
    btnLogin: {
        backgroundColor: colors.principal,
        borderRadius: 100,
    },
});

// conecta el componente con lo que esta en el storage
export default connect(null, { login })(RegisterForm);
