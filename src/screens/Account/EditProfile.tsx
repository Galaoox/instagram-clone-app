import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { colors } from "../../utils/theme";
import HeaderButton from "../../components/Header/CloseButton";
import FormEditProfile from "../../components/Account/FormEditProfile";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as yup from "yup";
import customMessage from "../../utils/customMessage";

interface IEditProfileProps {
    navigation: NavigationProp<ParamListBase>;
}

export default function EditProfile(props: IEditProfileProps) {
    const { navigation } = props;
    /**
     * encargado de obtener los valores del formulario y enviar la informacion a la api
     * @param values valor de formulario
     */
    const submit = (values: any) => {
        console.log("on submit test", values);
    };

    // Se uso el hook de formik para poder obtener los valores del formulario desde afuera
    const formik = useFormik({
        initialValues: {
            name: "",
            user: "",
            biography: "",
            webSite: "",
        },
        onSubmit: submit,
        validationSchema: validatorSchema(),
    });
    // configuracion de los iconos del header
    navigation.setOptions({
        title: "Editar perfil",
        headerLeft: () => <HeaderButton name="close" onPress={goBack} />,
        headerLeftContainerStyle: styles.closeHeaderContainer,
        headerRight: () => (
            <HeaderButton
                name="check"
                color={colors.principal}
                onPress={formik.handleSubmit}
                disabled={!formik.isValid}
            />
        ),
        headerRightContainerStyle: styles.checkHeaderContainer,
    });

    const goBack = () => navigation.goBack();
    console.log(formik.touched, formik.errors.user);
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <FormEditProfile formik={formik} />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
    },
    closeHeaderContainer: {
        marginLeft: 10,
    },
    checkHeaderContainer: {
        marginRight: 10,
    },
});

/**
 * Retorna el esquema de validaciones del formulario
 */
function validatorSchema() {
    const { required, max, min } = customMessage;
    return yup.object().shape({
        name: yup
            .string()
            .max(100, max + 100)
            .required(required),
        user: yup
            .string()
            .min(4, min + 4)
            .max(10, max + 10)
            .required(required),
        biography: yup
            .string()
            .max(150, max + 150)
            .required(required),
        webSite: yup
            .string()
            .max(150, max + 150)
            .required(required),
    });
}
