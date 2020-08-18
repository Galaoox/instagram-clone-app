import React, { useState } from "react";
// Redux
import { connect } from "react-redux";
import Profile from "../../components/Account/Profile";
// Components

function Account(props: any) {
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
