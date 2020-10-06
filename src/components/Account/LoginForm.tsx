import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { passwordIcon, emailIcon } from "../../utils/icons";
import { colors } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";
//CONTEXT
import { AuthContext } from "../../components/context";
interface ILoginFormProps {}

export default function LoginForm(props: ILoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { signIn } = useContext(AuthContext);

    /**
     * Encargado de realizar la peticion http al backend haciendo uso del
     * action "login" enviando como parametro "email" y "password"
     * y si es correcto el inicio de sesion ira a la screen account
     */
    const submit = async () => {
        setLoading(true);
        await signIn(email, password, () => setLoading(false));
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
                label="Contraseña"
                labelStyle={styles.labelInput}
                placeholder="Contraseña"
                secureTextEntry={!showPassword}
                rightIcon={passwordIcon(showPassword, setShowPassword)}
                onChange={(event) => setPassword(event.nativeEvent.text)}
            />
            <Button
                onPress={submit}
                title="Iniciar sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                loading={loading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
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
