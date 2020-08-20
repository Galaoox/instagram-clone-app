import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { colors } from "../../utils/theme";
import HeaderButton from "../../components/Header/CloseButton";
import FormEditProfile from "../../components/Account/FormEditProfile";
import { useFormik } from "formik";

interface IEditProfileProps {
    navigation: NavigationProp<ParamListBase>;
}

export default function EditProfile(props: IEditProfileProps) {
    const { navigation } = props;
    const submit = (values: any) => {
        console.log("on submit test", values);
    };
    // Se uso el hook de formik para poder obtener los valores del formulario desde afuera
    const formik = useFormik({
        initialValues: {
            name: "pruebas",
            user: "pruebas",
            biography: "pruebas",
            webSite: "pruebas",
        },
        onSubmit: submit,
    });

    navigation.setOptions({
        title: "Editar perfil",
        headerLeft: () => <HeaderButton name="close" onPress={goBack} />,
        headerLeftContainerStyle: styles.closeHeaderContainer,
        headerRight: () => (
            <HeaderButton
                name="check"
                color={colors.principal}
                onPress={formik.handleSubmit}
            />
        ),
        headerRightContainerStyle: styles.checkHeaderContainer,
    });

    const goBack = () => navigation.goBack();

    return (
        <View>
            <FormEditProfile formik={formik} />
        </View>
    );
}

const styles = StyleSheet.create({
    closeHeaderContainer: {
        marginLeft: 10,
    },
    checkHeaderContainer: {
        marginRight: 10,
    },
});
