import React, { useState } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
} from "react-native";
import { ListItem } from "react-native-elements";
import FooterList from "../FooterList";
import ListEmptyView from "../ListEmptyView";
import { colors } from "../../utils/theme";

interface IListRequestProps {
    users: any[];
    handleLoadMore: any;
    loadingMore: boolean;
    refreshing: boolean;
    reload: any;
    children: any;
}

export default function ListSearch(props: IListRequestProps) {
    const {
        users,
        handleLoadMore,
        loadingMore,
        reload,
        refreshing = false,
        children,
    } = props;
    const renderItem = ({ item }: any) => {
        return (
            <ListItem
                leftAvatar={{
                    rounded: true,
                    size: "large",
                    source: item.avatarUrl
                        ? { uri: item.avatarUrl }
                        : require("../../../assets/avatar-default.jpg"),
                }}
                title={item.username}
                subtitle={item.name}
            />
        );
    };
    return (
        <View>
            <FlatList
                data={users}
                renderItem={renderItem}
                initialNumToRender={10}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.2}
                onEndReached={handleLoadMore}
                refreshing={refreshing}
                onRefresh={reload}
                ListHeaderComponent={children}
                ListEmptyComponent={
                    <ListEmptyView text="No se encontraron resultados" />
                }
                ListFooterComponent={
                    <FooterList
                        isLoading={loadingMore}
                        isVisible={users.length > 0}
                    />
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    loader: {
        marginVertical: 10,
        alignItems: "center",
    },
});
