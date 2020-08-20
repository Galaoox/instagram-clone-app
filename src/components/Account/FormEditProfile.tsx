import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Input, Button } from "react-native-elements";
import * as yup from "yup";
import { Formik, FormikProps, FormikConfig } from "formik";
import { nameIcon, userIcon, bioIcon, webIcon } from "../../utils/icons";

interface IFormEditProfileProps {
    formik: FormikConfig<{
        name: string;
        user: string;
        biography: string;
        webSite: string;
    }>;
}

export default function FormEditProfile(props: any) {
    const {
        formik: { initialValues, handleSubmit },
    } = props;
    return (
        <KeyboardAwareScrollView>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {(props) => {
                    const {
                        handleChange,
                        values: { name, user, biography, webSite },
                    } = props;
                    return (
                        <View>
                            <Input
                                label="Nombre"
                                labelStyle={styles.labelInput}
                                placeholder="Nombre"
                                rightIcon={nameIcon}
                                onChangeText={handleChange("name")}
                                value={name}
                            />
                            <Input
                                label="Usuario"
                                labelStyle={styles.labelInput}
                                placeholder="Usuario"
                                rightIcon={userIcon}
                                value={user}
                                onChangeText={handleChange("user")}
                            />
                            {/* TODO: CAMBIAR ICONO DEL MOCKUP */}
                            <Input
                                label="Biografia"
                                labelStyle={styles.labelInput}
                                placeholder="Biografia"
                                rightIcon={bioIcon}
                                value={biography}
                                multiline
                                onChangeText={handleChange("biography")}
                            />
                            <Input
                                label="Sitio web"
                                labelStyle={styles.labelInput}
                                placeholder="Sitio web"
                                rightIcon={webIcon}
                                value={webSite}
                                onChangeText={handleChange("webSite")}
                            />
                        </View>
                    );
                }}
            </Formik>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        marginTop: 20,
    },
    labelInput: {
        color: "black",
    },
});
