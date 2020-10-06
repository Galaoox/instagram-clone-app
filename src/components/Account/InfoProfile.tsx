import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconProps } from "react-native-elements";
import global from "../../global";
import { openCamara } from "../../utils/common";
import { colors } from "../../utils/theme";
import ViewMoreTextCustom from "../ViewMoreTextCustom";
import * as WebBrowser from "expo-web-browser";

interface IInfoFileProps {
    imageUrl: string;
    posts: number;
    followers: number;
    following: number;
    name: string;
    biography: string;
    changeImage: Function;
    userId: number;
    webSite: string;
}

export default function InfoProFile(props: Partial<IInfoFileProps>) {
    const {
        imageUrl,
        posts = 0,
        followers = 0,
        following = 0,
        name = "Anonimo",
        biography = "Nam animi est. Et et assumenda voluptate ea veniam. Qui deleniti non odio quo labore iure fugiat quam eum.",
        userId,
        changeImage,
        webSite,
    } = props;

    /**
     * Encargado de ejecutar la accion de seleccionar una imagen y enviar los datos de la imagen
     * seleccionada al metodo changeImage
     */
    const changeAvatar = async () => {
        if (changeImage) {
            const images = await openCamara();
            changeImage(images);
        }
    };

    const openLink = async () => {
        const result = await WebBrowser.openBrowserAsync(
            "https://www.google.com"
        );
        console.log(result);
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
                            ? { uri: global.api + imageUrl }
                            : require("../../../assets/avatar-default.jpg")
                    }
                    showAccessory={userId === 0}
                    onAccessoryPress={changeAvatar}
                    accessory={{
                        type: "material-community",
                        name: "plus",
                        containerStyle: styles.containerAccesory,
                    }}
                />
                <View style={styles.textGroup}>
                    <Text>{posts}</Text>
                    <Text>Publicaciones</Text>
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
            <View style={styles.textBio}>
                <ViewMoreTextCustom>
                    <Text>{biography}</Text>
                    <Text
                        style={styles.webSite}
                        onPress={() => {
                            openLink();
                        }}
                    >
                        {webSite}
                    </Text>
                </ViewMoreTextCustom>
            </View>
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
    containerAccesory: {
        borderWidth: 2,
        borderColor: "#ffff",
        backgroundColor: colors.principal,
        borderRadius: 100,
    },
    webSite: {
        color: colors.principal,
        fontWeight: "bold",
        fontSize: 18,
    },
});
