import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
// Redux
import { connect } from "react-redux";
import InfoProFile from "../../components/Account/InfoProfile";
import GridPosts from "../../components/Posts/GridPosts";
// Components

function Account(props: any) {
    /**
     *  Encargado de recibir las imagenes que el usuario selecciono y
     *  realizar la solicitud http para cambiar el avatar del usuario
     * @param images
     */
    const changeImage = (images: Object) => {
        console.log(images);
    };

    return (
        <View style={styles.view}>
            <GridPosts>
                {/* SE PASA AL COMPONENTE GRIDPOSTS COMO CHILDREN DEBIDO A LOS PROBLEMAS DE
                EL FLATLIST CON  EL SCROLLVIEW
            */}
                <View>
                    <InfoProFile changeImage={changeImage} />
                    <View style={styles.viewButton}>
                        <Button
                            containerStyle={styles.btnEditContainer}
                            buttonStyle={styles.btnEdit}
                            title="Editar información"
                            type="clear"
                            titleStyle={styles.btnTitle}
                        />
                    </View>
                </View>
            </GridPosts>
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        backgroundColor: "#ffff",
    },
    viewButton: {
        alignItems: "center",
    },
    btnEditContainer: {
        marginVertical: 20,
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
});
// Adiciona a los props entrantes los elementos del reducer
const mapStateToProps = (state: any) => {
    return {
        user: state.session && state.session.user ? state.session.user : false,
    }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps)(Account);
