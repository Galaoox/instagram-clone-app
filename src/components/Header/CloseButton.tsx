import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

interface IHeaderButtonProps {
    name: string;
    color?: string;
    onPress: Function;
}

export default function HeaderButton(props: IHeaderButtonProps) {
    const { name, color, onPress } = props;

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <Icon
                name={name}
                type="material-community"
                color={color}
                iconStyle={styles.closeHeader}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    closeHeaderContainer: {
        marginLeft: 10,
    },
    closeHeader: {
        fontSize: 40,
    },
});
