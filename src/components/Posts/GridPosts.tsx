import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Image, Button } from "react-native-elements";
import { size } from "lodash";
import { SCREEN, colors } from "../../utils/theme";
import FooterList from "../FooterList";
import ListEmptyView from "../ListEmptyView";

interface IPost {
    id: number;
    imageUrl: string;
}

const numColumns = 3;

export default function GridPosts(props: { children: any }) {
    const { children } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMorePosts, setloadingMorePosts] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [startPosts, setStartPosts] = useState<IPost | null>(null); // paginacion de las solicitudes TODO: HACER LA INTERFAZ DE POST
    const navigation = useNavigation();

    const loadPosts = () => {
        setTimeout(() => setPosts(mockData()), 5000);
    };

    /**
     * Obtiene las publicaciones del usuario
     *
     */
    const getPosts = async () => {
        // ejecuta una peticion a la api y me las solicitudes de ese usuario
        console.log("OBTENIENDO SOLICITUDES");
        await setLoading(true);
        loadPosts();
        setLoading(false);
    };

    /**
     * recarga las solicitudes pendientes del usuario
     *
     */
    const reloadList = async () => {
        setRefreshing(true);
        // ejecuta una peticion a la api y me las solicitudes de ese usuario
        await loadPosts();
        setRefreshing(false);
        console.log("RELOAD");
    };

    /**
     * Obtiene la cantidad total de solicitudes que tiene el usuario
     */
    const getTotalPosts = () => {
        console.log("obteniendo cantidad total de publicaciones");
        setTotalPosts(60);
    };

    /**
     * Obtiene progresivamente las solicitudes
     */
    const handleLoadMore = async () => {
        if (posts.length < totalPosts) {
            setloadingMorePosts(true);
            console.log("OBTENIENDO MAS PUBLICACIONES");
            const data = await mockData();
            data.length > 0
                ? setStartPosts(data[data.length - 1])
                : setloadingMorePosts(false);

            setPosts([...posts, ...data]);
        } else {
            setloadingMorePosts(false);
        }
    };

    /**
     * encargado de retornar el componente a mostrar en el flatlist
     * @param param0
     */
    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.touchableOpacityColor}>
                <Image
                    source={
                        item && item.imageUrl
                            ? { uri: item.imageUrl }
                            : require("../../../assets/no-image.png")
                    }
                    style={styles.imagePost}
                />
            </TouchableOpacity>
        );
    };

    useFocusEffect(
        useCallback(() => {
            getPosts();
            getTotalPosts();
        }, [])
    );

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={handleLoadMore}
            refreshing={refreshing}
            onRefresh={reloadList}
            numColumns={numColumns}
            initialNumToRender={6}
            ListHeaderComponent={children}
            ListEmptyComponent={
                loading ? (
                    <View style={styles.loader}>
                        <ActivityIndicator
                            size="large"
                            color={colors.principal}
                        />
                        <Text>Cargando restaurantes</Text>
                    </View>
                ) : (
                    <ListEmptyView text="No hay publicaciones" />
                )
            }
            ListFooterComponent={
                <FooterList
                    isLoading={loadingMorePosts}
                    isVisible={posts.length > 0}
                />
            }
        />
    );
}

/**
 * Constante encargada de los estilos del componente
 */
const styles = StyleSheet.create({
    imagePost: {
        aspectRatio: 1,
        flex: 1 / numColumns,
        width: SCREEN.WIDTH / numColumns,
        height: SCREEN.WIDTH / numColumns,
        borderColor: "#ffff",
        borderWidth: 2,
    },
    touchableOpacityColor: {
        backgroundColor: "#838383",
    },
    loader: {
        marginVertical: 10,
        alignItems: "center",
    },
});

function mockData() {
    const data = [];

    for (let index = 0; index < 15; index++) {
        data.push({
            id: index + 1,
            imageUrl: `https://picsum.photos/id/${index + 1}/200/300`,
        });
    }
    return data;
}
