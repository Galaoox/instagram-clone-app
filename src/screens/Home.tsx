import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../components/context";

export default function Home(props: any) {
    return (
        <UserContext.Consumer>
            {(value) => {
                console.log(value, "from home");
                return (
                    <View>
                        <Text>HOme....</Text>
                    </View>
                );
            }}
        </UserContext.Consumer>
    );
}

const styles = StyleSheet.create({});
