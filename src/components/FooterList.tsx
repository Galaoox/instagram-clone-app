import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export default function FooterList(props: {
    isLoading?: boolean;
    text?: string;
}) {
    const { isLoading = false, text = "..." } = props;
    return isLoading ? (
        <View style={styles.loader}>
            <ActivityIndicator size="large" />
        </View>
    ) : (
        <View style={styles.notFound}>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loader: {
        marginVertical: 10,
        alignItems: "center",
    },
    notFound: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    },
});
