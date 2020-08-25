import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    NavigationProp,
    ParamListBase,
    useFocusEffect,
} from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import {} from "react-native-gesture-handler";
import { IUser } from "../models/user";
import ListSearch from "../components/Search/ListSearch";
import { colors } from "../utils/theme";

interface ISearchProps {
    navigation: NavigationProp<ParamListBase>;
}
export default function Search(props: ISearchProps) {
    const { navigation } = props;
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [reload, setReload] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startUser, setStartUser] = useState<IUser | null>(null);

    /**
     * Encargado de obtener las solicitudes
     *
     */
    const loadUsers = async () => {
        // TODO: QUITAR ESE PARAMETRO "RECARGANDO"
        setLoading(true);
        setTimeout(() => {
            setUsers(mockData());
            setLoading(false);
        }, 5000);
    };

    /**
     * Obtiene las solicitudes pendientes del usuario
     *
     */
    const getUsers = async () => {
        //setLoading(true);
        // ejecuta una peticion a la api y me las solicitudes de ese usuario
        //await loadRequest();
        //setLoading(false);
        console.log("OBTENIENDO SOLICITUDES");
    };

    /**
     * recarga las solicitudes pendientes del usuario
     *
     */
    const reloadList = async () => {
        setReload(true);
        // ejecuta una peticion a la api y me las solicitudes de ese usuario
        await loadUsers();
        setReload(false);
        console.log("RELOAD");
    };
    /**
     * Obtiene la cantidad total de solicitudes que tiene el usuario
     */
    const getTotalUsers = () => {
        console.log("obteniendo cantidad total de solicitudes");
        setTotalUsers(50);
    };

    /**
     * Obtiene progresivamente las solicitudes
     */
    const handleLoadMore = async () => {
        if (users.length < totalUsers) {
            setLoadingMore(true);
            console.log("OBTENIENDO MAS SOLICITUDES");
            const data = await mockData();
            data.length > 0
                ? setStartUser(data[data.length - 1])
                : setLoadingMore(false);

            setUsers([...users, ...data]);
        } else {
            setLoadingMore(false);
        }
    };

    const onChangeSearch = (value: string) => {
        setSearch(value);
        console.log(value);
        loadUsers();
    };

    useFocusEffect(
        useCallback(() => {
            //getUsers();
            getTotalUsers();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <ListSearch
                users={users}
                handleLoadMore={handleLoadMore}
                loadingMore={loadingMore}
                refreshing={reload}
                reload={reloadList}
            >
                <SearchBar
                    placeholder="Buscar"
                    onChangeText={onChangeSearch}
                    platform="android"
                    lightTheme={true}
                    showLoading={loading}
                    containerStyle={styles.containerSearch}
                    value={search}
                    searchIcon={{
                        name: "magnify",
                        color: colors.principal,
                        type: "material-community",
                        iconStyle: styles.iconSearch,
                    }}
                    cancelIcon={{
                        name: "arrow-left",
                        color: colors.inactive,
                        type: "material-community",
                        iconStyle: styles.iconSearch,
                    }}
                    loadingProps={{
                        color: colors.principal,
                    }}
                />
            </ListSearch>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ffff" },
    containerSearch: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 15,
        marginBottom: 15,
    },
    iconSearch: {
        fontSize: 40,
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
