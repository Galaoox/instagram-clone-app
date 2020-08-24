import React from "react";
import { Button, Icon } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/theme";

interface IButtonRequestProps {
    cancelRequest: Function;
    acceptRequest: Function;
    id: number;
}

export default function ButtonRequest(props: IButtonRequestProps) {
    const { cancelRequest, acceptRequest, id } = props;
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.btn}
                title="Aceptar"
                titleStyle={styles.btnTitle}
                onPress={() => acceptRequest(id)}
            />
            <TouchableOpacity onPress={() => cancelRequest(id)}>
                <Icon name="close" type="material-community" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },

    btn: {
        backgroundColor: colors.principal,
        paddingVertical: 5,
        borderRadius: 7,
    },
    btnTitle: {
        color: "#ffff",
    },
});
