import React, { useState } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { ListItem, Avatar, Divider } from "react-native-elements";
import ViewMoreTextCustom from "./ViewMoreTextCustom";
import { colors, SCREEN } from "../utils/theme";

export default function ListComments(props: any) {
    const [comments, setComments] = useState(mockData());
    const {
        route: {
            params: { postId },
        },
    } = props;

    const renderItem = ({ item }: any) => {
        return (
            <ListItem
                topDivider
                bottomDivider
                leftAvatar={{
                    rounded: true,
                    size: "medium",

                    source: item.avatarUrl
                        ? { uri: item.avatarUrl }
                        : require("../../assets/avatar-default.jpg"),
                }}
                title={
                    <View>
                        <ViewMoreTextCustom>
                            <Text>
                                <Text style={styles.userName}>
                                    {item.userName}
                                </Text>{" "}
                                {item.description}
                            </Text>
                        </ViewMoreTextCustom>
                    </View>
                }
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                renderItem={renderItem}
                initialNumToRender={10}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.containerInput}>
                <View style={styles.avatar}>
                    <Avatar
                        rounded
                        source={require("../../assets/avatar-default.jpg")}
                    />
                </View>
                <TextInput placeholder="Comentar" style={styles.input} />
                <TouchableOpacity style={styles.avatar}>
                    <Text style={styles.buttonText}>Publicar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
    userName: {
        fontWeight: "bold",
    },
    containerInput: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
    },
    input: {
        flex: 4,
    },
    avatar: {
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: colors.principal,
        fontSize: 15,
        marginRight: 2,
    },
});

function mockData() {
    const data = [];
    for (let index = 0; index < 30; index++) {
        data.push({
            id: index + 2,
            avatarUrl: `https://picsum.photos/id/${index + 1}/200/200.jpg`,
            userName: "anonimo",
            description:
                "Assumenda sed molestias repudiandae possimus ad et. Ipsam illum pariatur. Ut laboriosam sit cumque quidem accusantium. A excepturi magni eligendi voluptate voluptas quo quod dicta. Nulla qui rerum earum dolor eos minus enim molestiae exercitationem.",
        });
    }
    return data;
}
