import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { colors } from "../utils/theme";

interface IFooterListProps {
    isLoading?: boolean;
    text?: string;
    isVisible?: boolean;
}

export default function FooterList(props: IFooterListProps) {
    const { isLoading = false, text = "...", isVisible = true } = props;
    return isVisible ? (
        isLoading ? (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.principal} />
            </View>
        ) : (
            <View style={styles.notFound}>
                <Text>{text}</Text>
            </View>
        )
    ) : null;
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
