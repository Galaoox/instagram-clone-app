import React from "react";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
} from "react-native";
import { ListItem } from "react-native-elements";
import { IRequest } from "../../models/request";
import ButtonRequest from "./ButtonsRequest";
import FooterList from "../FooterList";
import ListEmptyView from "../ListEmptyView";
import { colors } from "../../utils/theme";

interface IListRequestProps {
    requests: IRequest[];
    cancelRequest: Function;
    acceptRequest: Function;
    loading: boolean;
    handleLoadMore: any;
    loadingMoreRequest: boolean;
}

export default function ListRequest(props: IListRequestProps) {
    const {
        requests,
        cancelRequest,
        acceptRequest,
        loading,
        handleLoadMore,
        loadingMoreRequest,
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
                rightElement={
                    <ButtonRequest
                        cancelRequest={cancelRequest}
                        acceptRequest={acceptRequest}
                        id={item.id}
                    />
                }
            />
        );
    };
    return (
        <View>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.principal} />
                    <Text>Cargando restaurantes</Text>
                </View>
            ) : (
                <FlatList
                    data={requests}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.2}
                    onEndReached={handleLoadMore}
                    ListEmptyComponent={
                        <ListEmptyView
                            icon={{
                                name: "heart-off",
                                type: "material-community",
                                color: colors.principal,
                            }}
                            text="No hay solicitudes"
                        />
                    }
                    ListFooterComponent={
                        <FooterList
                            isLoading={loadingMoreRequest}
                            isVisible={requests.length > 0}
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
