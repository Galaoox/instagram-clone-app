import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Input } from "react-native-elements";
import { emailIcon, passwordIcon, nameIcon, userIcon } from "../../utils/theme";

export default function FormEditProfile() {
    return (
        <KeyboardAwareScrollView>
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
