import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

interface IOptionsPost {
    id: number | null;
    setShowModal: Function | null;
}

export default function OptionsPost(props: any) {
    const { id, setShowModal } = props;
    return (
        <View>
            {options().map((option, index) => {
                return (
                    <TouchableOpacity
                        style={{ backgroundColor: "#838383" }}
                        key={index}
                    >
                        <ListItem
                            title={option.title}
                            onPress={option.action}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

function options() {
    return [
        {
            title: "Eliminar",
            action: () => {
                console.log("eliminar");
            },
        },
        {
            title: "Editar",
            action: () => {
                console.log("editar");
            },
        },
    ];
}
