import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import ListRequest from "../components/Activity/ListRequests";
import { IRequest } from "../models/user";
import { useFocusEffect } from "@react-navigation/native";

export default function Activity() {
    const [requests, setRequests] = useState<IRequest[]>([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingMoreRequest, setLoadingMoreRequest] = useState(true);
    const [reload, setReload] = useState(false);

    const [startRequest, setStartRequest] = useState<IRequest | null>(null); // paginacion de las solicitudes

    const userId = 1; // TODO: USAR REDUX PARA OBTENER LA INFO DEL USUARIO Y ASI SABER EL ID DEL USER
    /**
     * Encargado de obtener las solicitudes
     *
     */
    const loadRequest = async (recargando = false) => {
        // TODO: QUITAR ESE PARAMETRO "RECARGANDO"
        setTimeout(() => {
            setRequests(mockData(recargando));
        }, 5000);
    };

    /**
     * Obtiene las solicitudes pendientes del usuario
     *
     */
    const getRequest = async () => {
        setLoading(true);
        // ejecuta una peticion a la api y me las solicitudes de ese usuario
        await loadRequest();
        setLoading(false);
        console.log("OBTENIENDO SOLICITUDES");
    };

    /**
     * recarga las solicitudes pendientes del usuario
     *
     */
    const reloadList = async () => {
        setReload(true);
        // ejecuta una peticion a la api y me las solicitudes de ese usuario
        await loadRequest(true);
        setReload(false);
        console.log("RELOAD");
    };
    /**
     * Obtiene la cantidad total de solicitudes que tiene el usuario
     */
    const getTotalRequest = () => {
        console.log("obteniendo cantidad total de solicitudes");
        setTotalRequest(50);
    };

    /**
     * Obtiene progresivamente las solicitudes
     */
    const handleLoadMore = async () => {
        if (requests.length < totalRequest) {
            setLoadingMoreRequest(true);
            console.log("OBTENIENDO MAS SOLICITUDES");
            const data = await mockData();
            data.length > 0
                ? setStartRequest(data[data.length - 1])
                : setLoadingMoreRequest(false);

            setRequests([...requests, ...data]);
        } else {
            setLoadingMoreRequest(false);
        }
    };

    /**
     *  rechaza la solicitud de seguimiento de un usuario
     * @param idRequest id de la solicitud
     */
    const cancelRequest = (idRequest: number) => {
        setLoading(true);
        setRequests(requests.filter((request) => request.id != idRequest));
        setLoading(false);
    };
    /**
     *  acepta la solicitud de seguimiento de un usuario
     * @param idRequest id de la solicitud
     */
    const acceptRequest = (idRequest: number) => {
        setLoading(true);
        setRequests(requests.filter((request) => request.id != idRequest));
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            getRequest();
            getTotalRequest();
        }, [])
    );

    return (
        <View style={styles.container}>
            <ListRequest
                cancelRequest={cancelRequest}
                acceptRequest={acceptRequest}
                requests={requests}
                loading={loading}
                loadingMoreRequest={loadingMoreRequest}
                handleLoadMore={handleLoadMore}
                reload={reloadList}
                refreshing={reload}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
});

function mockData(recargando = false) {
    const data = [];
    for (let index = 0; index < 6; index++) {
        data.push({
            username: recargando ? "galaoox" : "ernestheaney",
            avatarUrl: `https://picsum.photos/id/${index + 1}/200/300`,
            name: "Sheila Reinger",
            id: index + 1,
        });
    }
    return data;
}
