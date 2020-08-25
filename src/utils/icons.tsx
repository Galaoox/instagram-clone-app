import { IconProps } from "react-native-elements";
import { colors } from "./theme";

export const emailIcon: IconProps = {
    name: "at",
    type: "material-community",
    color: colors.principal,
};

export function passwordIcon(
    showPassword: boolean,
    setShowPassword: Function
): Partial<IconProps> {
    return {
        type: "material-community",
        name: !showPassword ? "eye-off-outline" : "eye-outline",
        color: colors.principal,
        onPress: () => setShowPassword(!showPassword),
    };
}

export const userIcon: IconProps = {
    name: "account",
    color: colors.principal,
    type: "material-community",
};

export const nameIcon: IconProps = {
    name: "card-text-outline",
    color: colors.principal,
    type: "material-community",
};

export const bioIcon: IconProps = {
    name: "account-details",
    color: colors.principal,
    type: "material-community",
};

export const webIcon: IconProps = {
    name: "web",
    color: colors.principal,
    type: "material-community",
};

export const descriptionIcon: IconProps = {
    name: "text",
    color: colors.principal,
    type: "material-community",
};
