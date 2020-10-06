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
            {({ name, username, biography, imageUrl, webSite }) => (
                <Profile
                    name={name}
                    userId="0"
                    username={username}
                    biography={biography}
                    imageUrl={imageUrl}
                    webSite={webSite}
                />
            )}
        </UserContext.Consumer>
    );
}
