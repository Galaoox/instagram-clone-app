import React from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Post from "./Post";
import IPost from "../../models/post";
import ListEmptyView from "../ListEmptyView";
import { colors } from "../../utils/theme";
import FooterList from "../FooterList";

interface IListPostsProps {
    posts: IPost[];
    loadingMore: boolean;
    handleLoadMore: any;
    refreshing: boolean;
    onRefresh: any;
    loading: boolean;
    openOptions?: Function;
}

export default function ListPosts(props: IListPostsProps) {
    const {
        posts,
        handleLoadMore,
        loadingMore,
        onRefresh,
        refreshing,
        loading,
    } = props;

    const renderItem = ({ item }: any) => {
        return (
            <Post
                date={item.date}
                description={item.description}
                id={item.id}
                avatarUrl={item.avatarUrl}
                imageUrl={item.imageUrl}
                likes={item.likes}
                userName={item.userName}
            />
        );
    };

    return (
        <View>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.principal} />
                    <Text>Cargando publicaciones</Text>
                </View>
            ) : (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.2}
                    onEndReached={handleLoadMore}
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(true)}
                    ListEmptyComponent={
                        <ListEmptyView
                            icon={{
                                name: "heart-off",
                                type: "material-community",
                                color: colors.principal,
                            }}
                            text="No hay publicaciones"
                        />
                    }
                    ListFooterComponent={
                        <FooterList
                            isLoading={loadingMore}
                            isVisible={posts.length > 0}
                        />
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        marginVertical: 10,
        alignItems: "center",
    },
});
