import React, { useState } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

// Redux
import { connect } from "react-redux";
// Components
import Profile from "../../components/Account/Profile";

interface IAccountProps {
    navigation: NavigationProp<ParamListBase>;
    route: Object;
}

export default function Account(props: IAccountProps) {
    const { navigation } = props;
    navigation.setOptions({
        title: "usuariopersona",
    });
    return <Profile />;
}
