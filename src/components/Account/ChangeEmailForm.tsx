import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik, FormikConfig } from "formik";
import { Input, Button } from "react-native-elements";
import { emailIcon, passwordIcon } from "../../utils/icons";
import { colors } from "../../utils/theme";
import * as yup from "yup";
import customMessage from "../../utils/customMessage";
import { notEqual } from "../../utils/common";

interface IChangeEmailFormProps {
    email: string;
    setShowModal: Function;
}

export default function ChangeEmailForm(props: any) {
    const { email, setShowModal } = props;
    const [showPassword, setShowPassword] = useState(false);

    /**
     * envia los datos al backend para cambiar el correo electronico
     * @param values valores del formulario que se devuelven en un json
     */
    const submit = (values: { newEmail: string; password: string }) => {
        setShowModal(false);
    };

    return (
        <Formik
            initialValues={{
                newEmail: "",
                password: "",
            }}
            onSubmit={(values) => {
                setShowModal(false);
            }}
            validationSchema={validatorSchema(email)}
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
                    {/* NUEVO CORREO ELECTRONICO */}
                    <Input
                        label="Nuevo correo electronico"
                        labelStyle={styles.labelInput}
                        placeholder="Nuevo correo electronico"
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
                    {/* CONTRASEÑA */}
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

/**
 * Retorna el esquema de validaciones del formulario
 */
function validatorSchema(emailValue: string) {
    const { required, email, notEqualEmail } = customMessage;
    return yup.object().shape({
        newEmail: yup
            .string()
            .email(email)
            .test("not-equal", notEqualEmail, (newEmail: any) =>
                notEqual(newEmail, emailValue)
            )
            .required(required),
        password: yup.string().required(required),
    });
}
