import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
    return (
        <SafeAreaView>
            <View>
                <LinearGradient
                    colors={["#A42C76", "#9E4CD8"]}
                    style={styles.gradient}
                >
                    <Text>Hello</Text>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    gradient: {
        height: 300,
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
        position: "absolute",
    },
});
