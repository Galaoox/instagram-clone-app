import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function openCamara() {
    const resultsPermissions = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
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
        });
        if (result.cancelled) {
            // toastRef.current.show("Has cerrado la selección de imagenes");
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
}

export function notEqual(value1: string | number, value2: string | number) {
    return value1 !== value2;
}
