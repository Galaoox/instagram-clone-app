import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik, FormikConfig } from "formik";
import { Input, Button } from "react-native-elements";
import { emailIcon, passwordIcon } from "../../utils/icons";
import { colors } from "../../utils/theme";

interface IChangeEmailFormProps {
    email: string;
    setShowModal: Function;
}

export default function ChangeEmailForm(props: any) {
    const { email, setShowModal } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Formik
            initialValues={{
                newEmail: email,
                password: "",
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                setFieldTouched,
                touched,
                errors,
                values: { newEmail, password },
            }) => (
                <View style={styles.container}>
                    <Input
                        label="Nuevo electronico"
                        labelStyle={styles.labelInput}
                        placeholder="Correo electronico"
                        rightIcon={emailIcon}
                        onChangeText={handleChange("newEmail")}
                        onBlur={() => setFieldTouched("newEmail")}
                        value={newEmail}
                        errorMessage={
                            touched.newEmail && errors.newEmail
                                ? errors.newEmail
                                : ""
                        }
                    />
                    <Input
                        label="Contraseña"
                        labelStyle={styles.labelInput}
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        rightIcon={passwordIcon(showPassword, setShowPassword)}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password")}
                        value={password}
                        errorMessage={
                            touched.password && errors.password
                                ? errors.password
                                : ""
                        }
                    />

                    <Button
                        containerStyle={styles.btnEditContainer}
                        buttonStyle={styles.btnEdit}
                        title="Editar correo electronico"
                        onPress={() => handleSubmit()}
                        titleStyle={styles.btnTitle}
                    />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        alignItems: "center",
    },
    input: {
        width: "100%",
        marginTop: 20,
    },
    labelInput: {
        color: "black",
    },
    btnEditContainer: {
        marginTop: 20,
        marginBottom: 10,
        width: "95%",
    },
    btnEdit: {
        backgroundColor: colors.principal,
    },
    btnTitle: {
        color: "#ffff",
    },
});
