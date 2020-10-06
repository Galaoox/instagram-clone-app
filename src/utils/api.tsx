import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import global from "../global";

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
    callback: Function
) {
    const header = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
        },
    };
    await request(endPoint, header, callback);
}

async function request(endPoint: string, header: any, callback: Function) {
    try {
        const token = await AsyncStorage.getItem("token");
        header.headers.Authorization = `Bearer ${token}`;
        const response = await fetch(global.api + endPoint, header);
        const responseJson = await response.json();
        responseJson.msg && Alert.alert("", responseJson.msg);
        await callback(responseJson);
    } catch (error) {
        throw new Error("Request");
    }
}
