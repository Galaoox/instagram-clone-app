import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../../components/Account/LoginForm";
import { Image } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { SCREEN, colors } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";
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
                <CreateAccount />
            </View>
        </ScrollView>
    );
}

function CreateAccount() {
    const navigation = useNavigation();

    const goToRegister = () => {
        navigation.navigate("register");
    };
    return (
        <Text style={styles.textRegister}>
            ¿Aun no tienes una cuenta?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => {
                    goToRegister();
                }}
            >
                Registrate
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    view: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
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
        textAlign: "center",
        marginTop: "50%",
        marginLeft: 10,
        marginRight: 10,
        bottom: 0,
    },
    btnRegister: {
        color: colors.principal,
        fontWeight: "bold",
    },
});
