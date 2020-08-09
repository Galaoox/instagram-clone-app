import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { openCamara } from "../../utils/common";

interface IInfoFileProps {
    imageUrl: string;
    posts: number;
    followers: number;
    following: number;
    name: string;
    bio: string;
    changeImage: Function;
}

export default function InfoProFile(props: Partial<IInfoFileProps>) {
    const {
        imageUrl,
        posts = 0,
        followers = 0,
        following = 0,
        name = "Anonimo",
        bio = "Nam animi est. Et et assumenda voluptate ea veniam. Qui deleniti non odio quo labore iure fugiat quam eum.",

        changeImage,
    } = props;

    const changeAvatar = async () => {
        if (changeImage) {
            const images = await openCamara();
            changeImage(images);
        }
    };

    return (
        <View>
            <View style={styles.viewContainer}>
                <Avatar
                    rounded
                    size="large"
                    containerStyle={styles.userInfoAvatar}
                    source={
                        imageUrl
                            ? { uri: imageUrl }
                            : require("../../../assets/avatar-default.jpg")
                    }
                    showAccessory={!!changeImage}
                    onAccessoryPress={changeAvatar}
                />
                <View style={styles.textGroup}>
                    <Text>{posts}</Text>
                    <Text>Posts</Text>
                </View>
                <View style={styles.textGroup}>
                    <Text>{followers}</Text>
                    <Text>Seguidores</Text>
                </View>
                <View style={styles.textGroup}>
                    <Text>{following}</Text>
                    <Text>Siguiendo</Text>
                </View>
            </View>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textBio}>{bio}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30,
    },
    userInfoAvatar: {
        marginRight: 20,
    },
    textGroup: {
        alignItems: "center",
    },
    textName: {
        marginTop: 20,
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 17,
    },
    textBio: {
        marginHorizontal: 10,
    },
});
