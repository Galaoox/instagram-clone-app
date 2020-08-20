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
