import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    NavigationProp,
    ParamListBase,
    useFocusEffect,
} from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import { IUser } from "../models/user";
import ListSearch from "../components/Search/ListSearch";
import { colors } from "../utils/theme";
import { getRequest } from "../utils/api";

interface ISearchProps {
    navigation: NavigationProp<ParamListBase>;
}
export default function Search(props: ISearchProps) {
    const { navigation } = props;
    const [search, setSearch] = useState<string | null>('');
    const [users, setUsers] = useState<IUser[]>([]);
    const [reload, setReload] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [limitsPaginate, setLimitsPaginate] = useState({ initial: 0, final: 0 });

    const loadUsers = async (inicial: number = 0, final: number = 10) => {
        setLoading(true);
        const data: any = await getUsers(inicial, final);
        setUsers(data);
        setLoading(false);
    };

    const changeLimits = (newValue: any) => {
        setLimitsPaginate({ final: newValue?.final, initial: newValue?.initial });
    }

    const reloadList = async () => {
        setReload(true);
        await loadUsers();
        setReload(false);
    };


    /**
     * Obtiene progresivamente las solicitudes
     */
    const handleLoadMore = async () => {
        setLoadingMore(true);
        const data: any = await getUsers(limitsPaginate.initial, limitsPaginate.final);
        setUsers([...users, ...data]);
        setLoadingMore(false);
    };

    const onChangeSearch = (value: string) => {
        setSearch(value);
    };
    const getUsers = async (initial: number = 0, final: number = 10) => {
        let data = null;
        await getRequest(`user/getUsers?initial=${initial}&final=${final}&term=${search}`,
            (res: any) => {
                changeLimits(res.limit);
                data = res.data;
            });
        return data;
    }


    useEffect(() => {
        loadUsers();
    }, [search])

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
                    value={search as string}
                    onClear={() => setSearch('')}
                    onChange={(event) => setSearch(event.nativeEvent.text)}
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


