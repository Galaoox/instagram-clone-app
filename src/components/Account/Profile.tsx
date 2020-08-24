import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
// Components
import InfoProFile from "../../components/Account/InfoProfile";
import GridPosts from "../../components/Posts/GridPosts";
import { SCREEN, colors } from "../../utils/theme";

export default function Profile(props: any) {
    const navigation = useNavigation();
    const isUser = true; // bandera que indica si es el usuario que inicio sesion

    /**
     *  Encargado de recibir las imagenes que el usuario selecciono y
     *  realizar la solicitud http para cambiar el avatar del usuario
     * @param images
     */
    const changeImage = (images: Object) => {
        console.log(images);
    };

    const goToEdit = () => {
        navigation.navigate("editProfile");
    };

    return (
        <View style={styles.view}>
            <GridPosts>
                {/* 
                SE PASA AL COMPONENTE GRIDPOSTS COMO CHILDREN DEBIDO A LOS PROBLEMAS DE
                EL FLATLIST CON  EL SCROLLVIEW
                */}
                <View>
                    <InfoProFile changeImage={changeImage} />
                    <View style={styles.viewButton}>
                        {isUser ? (
                            <Button
                                containerStyle={styles.btnEditContainer}
                                buttonStyle={styles.btnEdit}
                                title="Editar información"
                                type="clear"
                                onPress={goToEdit}
                                titleStyle={styles.btnTitle}
                            />
                        ) : (
                            <Button
                                containerStyle={styles.btnFollowContainer}
                                buttonStyle={styles.btnFollow}
                                title="Seguir"
                                type="clear"
                                titleStyle={styles.btnTitleFollow}
                            />
                        )}
                        <View>
                            <Icon
                                type="material-community"
                                name="grid"
                                iconStyle={styles.iconGrid}
                            />
                            <Divider style={styles.divider} />
                        </View>
                    </View>
                </View>
            </GridPosts>
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#ffff",
    },
    viewButton: {
        alignItems: "center",
    },
    btnEditContainer: {
        marginTop: 20,
        marginBottom: 10,
        width: "95%",
    },
    btnEdit: {
        backgroundColor: "#ffff",
        borderWidth: 1,
        borderColor: "black",
    },
    btnTitle: {
        color: "black",
    },
    btnFollowContainer: {
        marginTop: 20,
        marginBottom: 10,
        height: 40,
        width: "95%",
    },
    btnFollow: {
        backgroundColor: colors.principal,
    },
    btnTitleFollow: {
        color: "#ffff",
    },
    iconGrid: {
        fontSize: 40,
        marginBottom: 5,
    },
    divider: {
        backgroundColor: "black",
        width: SCREEN.WIDTH,
        height: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 5.3,
        elevation: 3,
    },
});
