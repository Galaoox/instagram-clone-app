import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoProFile(props: any) {
    const changeAvatar = async () => {
        const resultsPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        const resultsPermissionsCamera =
            resultsPermissions.permissions.cameraRoll.status;

        if (resultsPermissionsCamera === "denied") {
            // toastRef.current.show(
            //     "Es necesario aceptar los permisos de la galeria"
            // );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (result.cancelled) {
                // toastRef.current.show("Has cerrado la selección de imagenes");
            } else {
                // SI HAY PERMISOS EJECUTA ESTO
            }
        }
    };

    const uploadImage = async (uri: string) => {
        // setLoading(true);
        //setlLoadingText("Actualizando avatar");
        const response = await fetch(uri);
        const blob = await response.blob();
        // TODO: FALTA USAR EL SERVICIO DE SUBIR IMAGENES
    };

    const updatePhotoUrl = () => {
        // TODO ACTUALIZAR FOTO DEL USUARIO
    };

    return (
        <View>
            <Text>InfoProfile...</Text>
            <Avatar
                rounded
                size="large"
                containerStyle={styles.userInfoAvatar}
                source={
                    false
                        ? { uri: "pruebas.png" }
                        : require("../../../assets/avatar-default.jpg")
                }
                showAccessory
                onAccessoryPress={changeAvatar}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingBottom: 30,
        paddingTop: 30,
    },
    userInfoAvatar: {
        marginRight: 20,
    },
});
