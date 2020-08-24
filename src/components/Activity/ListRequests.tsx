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

interface IListRequestProps {
    requests: IRequest[];
    cancelRequest: Function;
    acceptRequest: Function;
    loading: boolean;
    handleLoadMore: any;
}

export default function ListRequest(props: IListRequestProps) {
    const {
        requests,
        cancelRequest,
        acceptRequest,
        loading,
        handleLoadMore,
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
            {requests.length > 0 ? (
                <FlatList
                    data={requests}
                    renderItem={renderItem}
                    initialNumToRender={7}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={<FooterList isLoading={loading} />}
                />
            ) : (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando restaurantes</Text>
                </View>
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
