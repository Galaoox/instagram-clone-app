import React from "react";
import ViewMoreText from "react-native-view-more-text";
import { StyleSheet, Text } from "react-native";
import { colors } from "../utils/theme";

export default function ViewMoreTextCustom(props: { children: any }) {
    const { children } = props;
    const renderViewMore = (onPress: any) => {
        return (
            <Text onPress={onPress} style={styles.text}>
                Ver mas
            </Text>
        );
    };
    const renderViewLess = (onPress: any) => {
        return (
            <Text onPress={onPress} style={styles.text}>
                Ver menos
            </Text>
        );
    };
    return (
        <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            textStyle={{ textAlign: "left" }}
        >
            {children}
        </ViewMoreText>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.principal,
    },
});
