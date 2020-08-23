import React, { useState } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

// Redux
import { connect } from "react-redux";
// Components
import Profile from "../../components/Account/Profile";

interface IAccountProps {
    navigation: NavigationProp<ParamListBase>;
    dispatch: Function;
    route: Object;
    user: Object;
}

function Account(props: IAccountProps) {
    console.log(props);
    const { dispatch, navigation, route, user } = props;
    navigation.setOptions({
        title: "usuariopersona", // TODO: CAMBIAR ESTE "USUARIO" POR EL "USUARIO" DE LA PERSONA QUE INICIO SESIÓN
    });
    return <Profile />;
}

// Adiciona a los props entrantes los elementos del reducer
const mapStateToProps = (state: any) => {
    return {
        user: state.session && state.session.user ? state.session.user : false,
    }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps)(Account);
