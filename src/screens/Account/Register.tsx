import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Toast from "react-native-easy-toast";

export default function Register() {
    const toastRef = useRef();
    return (
        <KeyboardAwareScrollView>
            <View>
                <Text>Pruebas ....</Text>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({});
