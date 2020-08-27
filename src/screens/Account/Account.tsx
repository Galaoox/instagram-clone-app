import React from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
// Components
import Profile from "../../components/Account/Profile";
import { UserContext } from "../../components/context";

interface IAccountProps {
    navigation: NavigationProp<ParamListBase>;
    route: Object;
}

export default function Account(props: IAccountProps) {
    const { navigation } = props;

    return (
        <UserContext.Consumer>
            {({ name, userName }) => (
                <Profile name={name} userName={userName} />
            )}
        </UserContext.Consumer>
    );
}
