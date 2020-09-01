import React from 'react';
import {View} from 'react-native';
import {ListItem} from "react-native-elements";

interface IOptionsPost{
    id: number | null;
    setShowModal: Function | null;
}

export default function OptionsPost(props:  any) {
    const {id, setShowModal} = props;
    return (
        <View style={{width: '20%' , backgroundColor: 'grey'}}>
            <ListItem title="Eliminar"  containerStyle={{width:'20%', backgroundColor: 'grey'}} />
            <ListItem title="Editar"  />
        </View>
    )
}
