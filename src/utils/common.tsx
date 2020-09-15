import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function openCamara() {
    try {
        const resultsPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        const resultsPermissionsCamera =
            resultsPermissions.permissions.cameraRoll.status;

        if (resultsPermissionsCamera === "denied") {
            // toastRef.current.show(
            //     "Es necesario aceptar los permisos de la galeria"
            // );
            Alert.alert(
                "",
                "Es necesario aceptar los permisos de la galeria",
                [{ text: "OK" }],
                { cancelable: false }
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
            if (result.cancelled) {
                Alert.alert(
                    "",
                    "Has cerrado la selección de imagenes",
                    [{ text: "OK" }],
                    { cancelable: false }
                );
            } else {
                // SI HAY PERMISOS EJECUTA ESTO
                return await result;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export function notEqual(value1: string | number, value2: string | number) {
    return value1 !== value2;
}
