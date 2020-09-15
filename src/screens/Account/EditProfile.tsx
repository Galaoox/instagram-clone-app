import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { colors } from "../../utils/theme";
import HeaderButton from "../../components/Header/CloseButton";
import FormEditProfile from "../../components/Account/FormEditProfile";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as yup from "yup";
import customMessage from "../../utils/customMessage";
import { getRequest, putRequest } from "../../utils/api";
import Loading from "../../components/Loading";

interface IEditProfileProps {
    navigation: NavigationProp<ParamListBase>;
}

export default function EditProfile(props: IEditProfileProps) {
    const { navigation } = props;
    const [loading, setLooading] = useState(false);
    const [valuesForm, setValuesForm] = useState({
        name: "",
        username: "",
        biography: "",
        webSite: "",
        imageUrl: "",
    });
    const [imageSelected, setImageSelected] = useState<any>(null);

    /**
     *  Encargado de recibir las imagenes que el usuario selecciono y
     *  realizar la solicitud http para cambiar el avatar del usuario
     * @param images
     */
    const changeImage = (image: string) => {
        setImageSelected(image);
    };

    /**
     * encargado de obtener los valores del formulario y enviar la informacion a la api
     * @param values valor de formulario
     */
    const submit = async (values: {
        name: string;
        username: string;
        biography: string;
        webSite: string;
        imageUrl: string;
    }) => {
        console.log(values, "THIS IS VALUES");
        setLooading(true);
        const image = (await prepareUploadImage()) as Blob;
        let formData = new FormData();

        formData.append("image", image);
        const data = {
            name: values.name,
            username: values.username,
            biography: values.biography,
            webSite: values.webSite,
        };
        formData.append("data", JSON.stringify(data));
        putRequest(
            "user/editProfile",
            formData,
            (res: any) => {
                console.log(res);
                setLooading(false);
            },
            true
        );
    };
    const prepareUploadImage = async () => {
        if (imageSelected && imageSelected.uri) {
            const response = await fetch(imageSelected.uri);
            const blob = await response.blob();
            return blob;
            // return {
            //     filename: "image",
            //     type: blob.type,
            //     uri: imageSelected.uri,
            // };
        }
    };

    // Se uso el hook de formik para poder obtener los valores del formulario desde afuera
    const formik = useFormik({
        initialValues: valuesForm,
        onSubmit: submit,
        validationSchema: validatorSchema(),
        enableReinitialize: true,
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

    useEffect(() => {
        setLooading(true);
        getRequest("user/showDataEdit", async (res: any) => {
            setLooading(false);
            const { biography, imageUrl, name, username, webSite } = res;
            console.log(res);
            setValuesForm({
                biography,
                name,
                username,
                webSite,
                imageUrl,
            });
        });
    }, []);
    console.log(formik.errors);
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <FormEditProfile
                formik={formik}
                imageSelected={imageSelected}
                changeImage={changeImage}
            />
            <Loading isVisible={loading} />
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
            .max(150, max + 150)
            .required(required),
        username: yup
            .string()
            .min(4, min + 4)
            .max(45, max + 45)
            .required(required),
        biography: yup
            .string()
            .max(250, max + 250)
            .required(required),
        webSite: yup
            .string()
            .max(150, max + 150)
            .required(required),
    });
}
