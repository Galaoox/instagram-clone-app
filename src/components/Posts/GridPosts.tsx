import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image, Button } from "react-native-elements";
import { size } from "lodash";
import { SCREEN } from "../../utils/theme";

interface IPost {
    id: number;
    imageUrl: string;
}

const numColumns = 3;

export default function GridPosts(props: { children: any }) {
    const { children } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<IPost[]>(mockData());

    const navigation = useNavigation();
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

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            ListHeaderComponent={children}
            ListFooterComponent={<FooterList isLoading={loading} />}
        />
    );
}

/**
 *  Componente encargado de mostrar el footer de la lista
 *  mostrara un "spinner" o la frase "No hay mas publicaciones"
 *  dependiendo de isLoading
 * @param props
 */
function FooterList(props: { isLoading: boolean }) {
    const { isLoading } = props;
    return isLoading ? (
        <View style={styles.loaderPosts}>
            <ActivityIndicator size="large" />
        </View>
    ) : (
        <View style={styles.notFoundPosts}>
            <Text>No hay mas publicaciones</Text>
        </View>
    );
}

/**
 * Constante encargada de los estilos del componente
 */
const styles = StyleSheet.create({
    loaderPosts: {
        marginVertical: 10,
        alignItems: "center",
    },
    notFoundPosts: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    },
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
});

function mockData() {
    const data = [];

    for (let index = 0; index < 50; index++) {
        data.push({
            id: index + 1,
            imageUrl: `https://picsum.photos/id/${index + 1}/200/300`,
        });
    }
    return data;
}
