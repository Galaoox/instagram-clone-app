import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

function Home(props: any) {
    const { user } = props;
    console.log(user);
    return (
        <View>
            <Text>Hello</Text>
            <Text>{JSON.stringify(props.user)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

const mapStateToProps = (state: any) => {
    return {
        user: state.session,
    }; // seleccionamos del reducer la info que llegara al componente
};
// conecta el componente con lo que esta en el storage
export default connect(mapStateToProps)(Home);
