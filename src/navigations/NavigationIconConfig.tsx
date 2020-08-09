import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utils/theme";

export default function NavigationIconConfig(props: any) {
    const navigation = useNavigation();
    const goToConfig = () => {
        navigation.navigate("config");
    };
    return (
        <View>
            <TouchableOpacity onPress={goToConfig}>
                <Icon
                    name="menu"
                    type="material-community"
                    iconStyle={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        color: colors.principal,
        fontSize: 40,
        alignItems: "center",
        marginLeft: 5,
    },
});
