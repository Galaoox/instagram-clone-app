import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Loading from "../components/Loading";
import PostForm from "../components/Posts/PostForm";
import { useFormik } from "formik";
import * as yup from "yup";
import ImagePost from "../components/Posts/ImagePost";

export default function PostCreate() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const formik = useFormik({
        initialValues: {
            description: "",
        },
        onSubmit: (values) => {},
        validationSchema: validatorSchema(),
    });
    return (
        <ScrollView style={styles.container}>
            <ImagePost image={image} setImage={setImage} />
            <PostForm setImage={setImage} image={image} formik={formik} />
            <Loading isVisible={loading} text="Creando publicacón" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
});

function validatorSchema() {
    return yup.object().shape({
        description: yup
            .string()
            .max(150, "La descripción no puede tener mas de 150 carateres")
            .required("La descripción es requerida"),
    });
}
