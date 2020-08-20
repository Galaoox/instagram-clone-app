import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { colors } from "../../utils/theme";
import HeaderButton from "../../components/Header/CloseButton";
import FormEditProfile from "../../components/Account/FormEditProfile";

interface IEditProfileProps {
    navigation: NavigationProp<ParamListBase>;
}

export default function EditProfile(props: IEditProfileProps) {
    const { navigation } = props;
    navigation.setOptions({
        title: "Editar perfil",
        headerLeft: () => <HeaderButton name="close" onPress={goBack} />,
        headerLeftContainerStyle: styles.closeHeaderContainer,
        headerRight: () => (
            <HeaderButton
                name="check"
                color={colors.principal}
                onPress={onSubmit}
            />
        ),
        headerRightContainerStyle: styles.checkHeaderContainer,
    });

    const onSubmit = () => {
        console.log("on submit");
    };

    const goBack = () => navigation.goBack();

    return (
        <View>
            <FormEditProfile />
        </View>
    );
}

const styles = StyleSheet.create({
    closeHeaderContainer: {
        marginLeft: 10,
    },
    checkHeaderContainer: {
        marginRight: 10,
    },
});
