import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Toast from "react-native-easy-toast";
import { Image } from "react-native-elements";
import RegisterForm from "../../components/Account/RegisterForm";
import { SCREEN, colors } from "../../utils/theme";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

interface IRegisterProps {
    navigation: any;
}

export default function Register(props: IRegisterProps) {
    const { navigation } = props;
    //navigation.
    const toastRef = useRef();
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={styles.viewBackground} />
            <View style={styles.containerLogo}>
                <Image
                    source={require("../../../assets/logo-Instagram.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <View style={styles.viewForm}>
                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerLogo: {
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 300,
        marginTop: 20,
        height: 150,
    },
    viewForm: {
        marginBottom: 50,
        marginHorizontal: 20,
    },
    viewBackground: {
        width: SCREEN.WIDTH,
        height: 0,
        borderTopColor: colors.principal,
        borderTopWidth: SCREEN.HEIGHY / 1.5,
        borderRightWidth: SCREEN.WIDTH + 500,
        borderRightColor: "transparent",
        position: "absolute",
    },
});
