import { Dimensions } from "react-native";
import { IconProps } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export const SCREEN = {
    WIDTH: width,
    HEIGHY: height,
};

export const colors = {
    principal: "#5851DB",
    inactive: "#646464",
    iconDisable: "#c2c2c2",
};

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
