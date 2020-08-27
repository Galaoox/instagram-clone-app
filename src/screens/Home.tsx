import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../components/context";

export default function Home(props: any) {
    return (
        <UserContext.Consumer>
            {({ name }) => {
                return (
                    <View>
                        <Text>Bienvenido {name}</Text>
                    </View>
                );
            }}
        </UserContext.Consumer>
    );
}

const styles = StyleSheet.create({});
