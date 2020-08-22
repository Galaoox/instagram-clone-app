import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

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
    } else {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (result.cancelled) {
            // toastRef.current.show("Has cerrado la selección de imagenes");
        } else {
            // SI HAY PERMISOS EJECUTA ESTO
            return result;
        }
    }
}

export function notEqual(value1: string | number, value2: string | number) {
    return value1 !== value2;
}
