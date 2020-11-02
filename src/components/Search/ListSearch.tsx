import React, { useState } from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import FooterList from "../FooterList";
import ListEmptyView from "../ListEmptyView";
import { useNavigation } from "@react-navigation/native";
import global from "../../global";

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

    const navigation = useNavigation();

    const gotToProfile = (userId: number) => {
        navigation.navigate("profile", { userId: userId });
    };

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity>
                <ListItem
                    leftAvatar={{
                        rounded: true,
                        size: "large",
                        source: item.imageUrl
                            ? { uri: global.api + item.imageUrl }
                            : require("../../../assets/avatar-default.jpg"),
                    }}
                    title={item.username}
                    subtitle={item.name}
                    onPress={() => gotToProfile(item.id)}
                />
            </TouchableOpacity>
        );
    };
    return (
        <View>
            <FlatList
                data={users}
                renderItem={renderItem}
                initialNumToRender={5}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.3}
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
                        isVisible={users.length > 0 && false}
                    />
                }
            />
        </View>
    );
}
