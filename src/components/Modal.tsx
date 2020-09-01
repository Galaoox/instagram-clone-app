import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

interface IModalProps {
    isVisible: boolean;
    setIsVisible: Function;
    children: React.ReactElement;
    width?: string | number;
}

export default function Modal(props: IModalProps) {
    const { isVisible, setIsVisible, children, width = "90%" } = props;
    const closeModal = () => setIsVisible(false);
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={[styles.overlay, { width: width }]}
            backdropStyle={styles.overlayBackdrop}
            onBackdropPress={closeModal}
        >
            {children}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    overlayBackdrop: {
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    overlay: {
        height: "auto",
    },
});
