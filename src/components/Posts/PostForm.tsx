import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Input, Button } from "react-native-elements";
import { descriptionIcon } from "../../utils/icons";
import { colors } from "../../utils/theme";

export default function PostForm(props: any) {
    const {
        formik: {
            initialValues,
            handleSubmit,
            handleChange,
            touched,
            errors,
            setFieldTouched,
            isValid,
            values: { description },
        },
    } = props;
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <View style={styles.container}>
                <Input
                    label="Descripción"
                    labelStyle={styles.labelInput}
                    placeholder="Descripción"
                    rightIcon={descriptionIcon}
                    onChangeText={handleChange("description")}
                    onBlur={() => setFieldTouched("description")}
                    value={description}
                    multiline
                    errorMessage={
                        touched.description && errors.description
                            ? errors.description
                            : null
                    }
                />
                <Button
                    containerStyle={styles.btnEditContainer}
                    buttonStyle={styles.btnEdit}
                    title="Publicar"
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                    titleStyle={styles.btnTitle}
                />
            </View>
        </Formik>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 30,
        width: "95%",
    },
    btnEdit: {
        backgroundColor: colors.principal,
    },
    btnTitle: {
        color: "#ffff",
    },
});
