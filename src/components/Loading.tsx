import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
// El overlay es un modal
import { Overlay } from "react-native-elements";
import { colors } from "../utils/theme";

interface ILoadingProps {
    isVisible: boolean;
    text: string;
}

export default function Loading(props: Partial<ILoadingProps>) {
    const { isVisible = false, text = "Cargando" } = props;

    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            backdropStyle={styles.overlayBackdrop}
        >
            <View style={styles.view}>
                <ActivityIndicator size="large" color={colors.principal} />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        borderColor: colors.principal,
        borderWidth: 2,
        borderRadius: 10,
    },
    overlayBackdrop: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: colors.principal,
        textTransform: "uppercase",
        marginTop: 10,
    },
});
