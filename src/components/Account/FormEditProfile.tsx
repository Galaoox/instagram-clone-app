import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Input } from "react-native-elements";
import * as yup from "yup";
import { Formik } from "formik";
import { nameIcon, userIcon, bioIcon, webIcon } from "../../utils/icons";

export default function FormEditProfile() {
    const onSubmit = () => {
        console.log("onSubmit");
    };

    return (
        <KeyboardAwareScrollView>
            <Formik
                initialValues={{
                    name: "",
                    user: "",
                    biography: "",
                    webSite: "",
                }}
                onSubmit={onSubmit}
            >
                {(props) => {
                    console.log(props);
                    return (
                        <View>
                            <Input
                                label="Nombre"
                                labelStyle={styles.labelInput}
                                placeholder="Nombre"
                                rightIcon={nameIcon}
                                onChangeText={props.handleChange("name")}
                            />
                            <Input
                                label="Usuario"
                                labelStyle={styles.labelInput}
                                placeholder="Usuario"
                                rightIcon={userIcon}
                            />
                            {/* TODO: CAMBIAR ICONO DEL MOCKUP */}
                            <Input
                                label="Biografia"
                                labelStyle={styles.labelInput}
                                placeholder="Biografia"
                                rightIcon={bioIcon}
                            />
                            <Input
                                label="Sitio web"
                                labelStyle={styles.labelInput}
                                placeholder="Sitio web"
                                rightIcon={webIcon}
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
