import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { IconProps, Icon } from "react-native-elements";

interface IListEmptyViewProps {
    text: string;
    icon?: IconProps;
}

export default function ListEmptyView(props: IListEmptyViewProps) {
    const { text, icon } = props;
    return (
        <View style={styles.container}>
            {icon && (
                <Icon
                    name={icon.name}
                    type={icon.type}
                    color={icon.color}
                    iconStyle={styles.icon}
                />
            )}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 60,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
