import AsyncStorage from "@react-native-community/async-storage";
const apiUrl = "https://4421833597a8.ngrok.io/";

/**
 *  Metodo usado para hacer peticiones get
 * @param endPoint ruta a la cual apuntar
 * @param callback funcion a ejecutar despues de que termine la peticion
 */
export async function getRequest(endPoint: string, callback: Function) {
    const header: any = {
        method: "GET",
        headers: {},
    };
    await request(endPoint, header, callback);
}

export async function postRequest(
    endPoint: string,
    data: any,
    callback: Function
) {
    const header = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    };
    await request(endPoint, header, callback);
}

export async function putRequest(
    endPoint: string,
    data: any,
    callback: Function,
    sendFormData = false
) {
    const header = {
        method: "PUT",
        body: sendFormData ? data : JSON.stringify(data),
        headers: {
            "Content-Type": sendFormData
                ? "application/x-www-form-urlencoded"
                : "application/json; charset=utf-8",
        },
    };
    await request(endPoint, header, callback);
}

async function request(endPoint: string, header: any, callback: Function) {
    const token = await AsyncStorage.getItem("token");
    header.headers.Authorization = `Bearer ${token}`;
    fetch(apiUrl + endPoint, header)
        .then((response) => response.json())
        .then((res: any) => {
            callback(res);
        })
        .catch(function (error) {
            console.log(error, "pruebas");
        });
}
