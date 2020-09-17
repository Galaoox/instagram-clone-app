import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Avatar } from "react-native-elements";
import { Formik, FormikConfig } from "formik";
import { nameIcon, userIcon, bioIcon, webIcon } from "../../utils/icons";
import { colors } from "../../utils/theme";
import { openCamara } from "../../utils/common";
import global from "../../global";
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
        changeImage,
        imageSelected,
        formik: {
            initialValues,
            handleSubmit,
            handleChange,
            touched,
            errors,
            setFieldTouched,
            values: { name, username, biography, webSite, imageUrl },
        },
    } = props;

    /**
     * Encargado de ejecutar la accion de seleccionar una imagen y enviar los datos de la imagen
     * seleccionada al metodo changeImage
     */
    const changeAvatar = async () => {
        if (changeImage) {
            const images = await openCamara();
            changeImage(images);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <View>
                <View style={styles.containerAvatar}>
                    {/* TODO: AÑADIR FUNCIONALIDAD DE AGREGAR IMAGENES A EL ICONO DEL AVATAR Y EL TEXTO */}
                    <Avatar
                        rounded
                        size="xlarge"
                        containerStyle={styles.avatar}
                        source={
                            imageSelected || imageUrl
                                ? {
                                      uri:
                                          imageSelected && imageSelected.uri
                                              ? imageSelected.uri
                                              : global.api + imageUrl,
                                  }
                                : require("../../../assets/avatar-default.jpg")
                        }
                        onPress={changeAvatar}
                    />
                    <Text style={styles.textAvatar} onPress={changeAvatar}>
                        Cambiar foto de perfil
                    </Text>
                </View>
                <Input
                    label="Nombre"
                    labelStyle={styles.labelInput}
                    placeholder="Nombre"
                    rightIcon={nameIcon}
                    onChangeText={handleChange("name")}
                    onBlur={() => setFieldTouched("name")}
                    value={name}
                    errorMessage={
                        touched.name && errors.name ? errors.name : null
                    }
                />
                <Input
                    label="Usuario"
                    labelStyle={styles.labelInput}
                    placeholder="Usuario"
                    rightIcon={userIcon}
                    value={username}
                    onChangeText={handleChange("username")}
                    onBlur={() => setFieldTouched("username")}
                    errorMessage={
                        touched.username && errors.username
                            ? errors.username
                            : null
                    }
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
                    onBlur={() => setFieldTouched("biography")}
                    errorMessage={
                        touched.biography && errors.biography
                            ? errors.biography
                            : null
                    }
                />
                <Input
                    label="Sitio web"
                    labelStyle={styles.labelInput}
                    placeholder="Sitio web"
                    rightIcon={webIcon}
                    value={webSite}
                    onChangeText={handleChange("webSite")}
                    onBlur={() => setFieldTouched("webSite")}
                    errorMessage={
                        touched.webSite && errors.webSite
                            ? errors.webSite
                            : null
                    }
                />
            </View>
        </Formik>
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
    containerAvatar: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    avatar: {
        marginRight: 20,
    },
    textAvatar: {
        color: colors.principal,
        fontSize: 18,
        marginTop: 10,
    },
});
