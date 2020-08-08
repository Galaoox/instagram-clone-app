import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../../components/Account/LoginForm";
import { Image } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { SCREEN, colors } from "../../utils/theme";

export default function Login() {
    const toastRef = useRef();
    return (
        <ScrollView>
            <View style={styles.viewBackground} />
            <View style={styles.containerLogo}>
                <Image
                    source={require("../../../assets/logo-Instagram.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>

            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBackground: {
        width: SCREEN.WIDTH,
        height: 0,
        borderTopColor: colors.principal,
        borderTopWidth: SCREEN.HEIGHY / 1.5,
        borderRightWidth: SCREEN.WIDTH + 500,
        borderRightColor: "transparent",
        position: "absolute",
    },
    containerLogo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 300,
        marginTop: 70,
        height: 150,
    },
    viewContainer: {
        marginHorizontal: 20,
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold",
    },
});
