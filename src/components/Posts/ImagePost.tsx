import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { SCREEN } from "../../utils/theme";
import { openCamara } from "../../utils/common";

interface IImagePostProps {
    image: string | null;
    setImage: Function;
}

export default function ImagePost(props: IImagePostProps) {
    const { image, setImage } = props;
    /**
     * Selecciona la imagen de la galeria y se añade el valor de la uri al state de image
     */
    const selectImage = async () => {
        openCamara().then((imageSelected) => {
            setImage(imageSelected?.uri);
        });
    };

    return (
        <View
            style={{
                alignItems: "center",
                height: 350,
                marginBottom: 20,
            }}
        >
            <TouchableOpacity onLongPress={selectImage}>
                <Image
                    source={
                        image
                            ? { uri: image }
                            : require("../../../assets/no-image.png")
                    }
                    style={{ width: SCREEN.WIDTH, height: 350 }}
                />
            </TouchableOpacity>
        </View>
    );
}
