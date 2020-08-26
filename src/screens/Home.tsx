import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../components/context";

export default function Home(props: any) {
    return (
        <AuthContext.Consumer>
            {(value) => {
                console.log(value);
                return (
                    <View>
                        <Text>HOme....</Text>
                    </View>
                );
            }}
        </AuthContext.Consumer>
    );
}

const styles = StyleSheet.create({});
