import React, { Ref, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, IconProps, Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { passwordIcon, emailIcon, colors } from "../../utils/theme";

interface ILoginFormProps {
    toastRef: any;
}

export default function LoginForm(props: ILoginFormProps) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);

    const submit = () => {
        console.log("pruebas");
    };

    return (
        <View style={styles.formContainer}>
            <Input
                label="Correo electronico"
                labelStyle={styles.labelInput}
                placeholder="Correo electronico"
                containerStyle={styles.input}
                rightIcon={emailIcon}
            />
            <Input
                label="Contraseña"
                labelStyle={styles.labelInput}
                placeholder="Contraseña"
                rightIcon={passwordIcon(showPassword, setShowPassword)}
            />
            <Button
                onPress={submit}
                title="Iniciar sesión"
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
        marginTop: 30,
        shadowColor: "#585858",
        shadowOffset: { width: 20, height: 20 },
        shadowRadius: 10,
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
