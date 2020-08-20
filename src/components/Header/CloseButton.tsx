import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../../utils/theme";

interface IHeaderButtonProps {
    name: string;
    color?: string;
    onPress: Function;
    disabled?: boolean;
}

export default function HeaderButton(props: IHeaderButtonProps) {
    const { name, color, onPress, disabled = false } = props;

    return (
        <TouchableOpacity onPress={() => onPress()} disabled={disabled}>
            <Icon
                name={name}
                type="material-community"
                color={disabled ? colors.iconDisable : color}
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
