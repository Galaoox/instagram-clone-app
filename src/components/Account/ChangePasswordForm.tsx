import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Input, Button } from "react-native-elements";
import {  passwordIcon } from "../../utils/icons";
import { colors } from "../../utils/theme";
import * as yup from "yup";
import customMessage from "../../utils/customMessage";
import { putRequest } from "../../utils/api";

interface IChangePasswordFormProps {
    setShowModal: Function;
}

export default function ChangePasswordForm(props: IChangePasswordFormProps) {
    const { setShowModal } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const submit = (values: { newPassword: string; password: string, confirmPassword: string }) => {
        setLoading(true);
        putRequest('user/updatePassword', values, ()=>{
            setLoading(false);
            setShowModal(false);
        });
    }

    return (
        <Formik
            initialValues={{
                password: "",
                newPassword: "",
                confirmPassword: "",
            }}
            onSubmit={(values) => {
                submit(values);
            }}
            validationSchema={validatorSchema()}
        >
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                setFieldTouched,
                touched,
                errors,
                values: { newPassword, confirmPassword, password },
            }) => (
                <View style={styles.container}>
                    {/* ACTUAL CONTRASEÑA */}
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
                    {/* NUEVA CONTRASEÑA */}
                    <Input
                        label="Nueva contraseña"
                        labelStyle={styles.labelInput}
                        placeholder="Nueva contraseña"
                        secureTextEntry={!showNewPassword}
                        rightIcon={passwordIcon(
                            showNewPassword,
                            setShowNewPassword
                        )}
                        onChangeText={handleChange("newPassword")}
                        onBlur={() => setFieldTouched("newPassword")}
                        value={newPassword}
                        errorMessage={
                            touched.newPassword && errors.newPassword
                                ? errors.newPassword
                                : ""
                        }
                    />
                    {/* CONFIRMAR CONTRASEÑA */}
                    <Input
                        label="Confirmar contraseña"
                        labelStyle={styles.labelInput}
                        placeholder="Confirmar contraseña"
                        secureTextEntry={!showConfirmPassword}
                        rightIcon={passwordIcon(
                            showConfirmPassword,
                            setShowConfirmPassword
                        )}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={() => setFieldTouched("confirmPassword")}
                        value={confirmPassword}
                        errorMessage={
                            touched.confirmPassword && errors.confirmPassword
                                ? errors.confirmPassword
                                : ""
                        }
                    />
                    <Button
                        containerStyle={styles.btnEditContainer}
                        buttonStyle={styles.btnEdit}
                        title="Editar contraseña"
                        onPress={() => handleSubmit()}
                        titleStyle={styles.btnTitle}
                        loading={loading}
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
function validatorSchema() {
    const { required, min, max } = customMessage;
    return yup.object().shape({
        password: yup.string().required(required),
        newPassword: yup
            .string()
            .min(6, min + 6)
            .max(15, max + 15)
            .required(required),
        confirmPassword: yup
            .string()
            .min(6, min + 6)
            .max(15, max + 15)
            .required(required)
            .test("passwords-match", "Las contraseñas no coinciden", function (
                value
            ) {
                return this.parent.newPassword === value;
            }),
    });
}
