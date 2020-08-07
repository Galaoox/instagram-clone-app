import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

function Account(props: any) {
    const { user } = props;
    return (
        <View>
            <Text>Nombre usuario: {user.name}</Text>
        </View>
    );
}
const styles = StyleSheet.create({});
// Adiciona a los props entrantes los elementos del reducer
const mapStateToProps = (state: any) => {
    return { user: state.user }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps)(Account);
