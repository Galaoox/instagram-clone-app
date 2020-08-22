import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, ListItem } from "react-native-elements";
// Redux
import { connect } from "react-redux";
import { login, clear } from "../../redux/actions/session.actions";
import { SCREEN, colors } from "../../utils/theme";
import Modal from "../../components/Modal";
import ChangeEmailForm from "../../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../../components/Account/ChangePasswordForm";

function Config(props: any) {
    const { clear } = props;
    const [renderComponent, setRenderComponent] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const deleteSession = () => {
        clear();
    };

    const selectedComponent = (key: string) => {
        switch (key) {
            case "changeEmail":
                setRenderComponent(
                    <ChangeEmailForm
                        email={"pruebas@gmail.com"}
                        setShowModal={setShowModal}
                    />
                );

                break;
            case "changePassword":
                setRenderComponent(
                    <ChangePasswordForm setShowModal={setShowModal} />
                );
                break;

            default:
                setRenderComponent(null);
                break;
        }
        setShowModal(true);
    };
    const menuOptions = generateOptions(selectedComponent);

    return (
        <View style={styles.container}>
            {menuOptions.map((menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}
            <Button
                containerStyle={styles.btnCloseContainer}
                buttonStyle={styles.btnClose}
                title="Cerrar sesión"
                type="clear"
                onPress={() => deleteSession()}
                titleStyle={styles.btnTitle}
            />

            {renderComponent && (
                <Modal
                    isVisible={showModal}
                    setIsVisible={setShowModal}
                    children={renderComponent}
                ></Modal>
            )}
        </View>
    );
}

function generateOptions(selectedComponent: any) {
    return [
        {
            title: "Cambiar Correo Electronico",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: colors.inactive,
            iconNameRight: "chevron-right",
            iconColorRight: colors.inactive,
            onPress: () => selectedComponent("changeEmail"),
        },
        {
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: colors.inactive,
            iconNameRight: "chevron-right",
            iconColorRight: colors.inactive,
            onPress: () => selectedComponent("changePassword"),
        },
    ];
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        flex: 1,
    },
    btnCloseContainer: {
        marginTop: 40,
        marginBottom: 10,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 10,
    },
    btnClose: {
        backgroundColor: "#ffff",

        borderColor: "black",
    },
    btnTitle: {
        color: colors.principal,
        fontSize: 20,
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#3e3e3e",
    },
});
// Adiciona a los props entrantes los elementos del reducer
const mapStateToProps = (state: any) => {
    return {
        user: state.session && state.session.user ? state.session.user : false,
    }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps, { login, clear })(Config);
