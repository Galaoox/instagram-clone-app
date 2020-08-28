import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Icon, Image, ListItem} from 'react-native-elements';
import {SCREEN} from "../../utils/theme";
import IPost from "../../models/post";

export default function Post(props: Partial<IPost>) {
    const {likes, description, id, userName, date, imageUrl, avatarUrl} = props;
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View>
                <ListItem leftAvatar={{
                    rounded: true,
                    size: "medium",
                    source: avatarUrl
                        ? {uri: avatarUrl}
                        : require("../../../assets/avatar-default.jpg")
                }}
                          title={userName ? userName : 'anonimo'}
                          titleStyle={{fontWeight: 'bold'}}
                          rightIcon={
                              <TouchableOpacity>
                                  <Icon name='dots-vertical'
                                        type="material-community"
                                        size={30}
                                        color='#000000'/>
                              </TouchableOpacity>
                          }
                />

            </View>
            {/* IMAGE  */}

            <Image
                source={
                    imageUrl
                        ? {uri: imageUrl}
                        : require("../../../assets/no-image.png")
                }
                resizeMode="cover"
                style={{width: SCREEN.WIDTH, height: 350}}
            />

            {/* BUTTONS ACTION  */}
            <ButtonBar likes={likes} />

            {/* FOOTER  */}

        </View>
    );
}

function ButtonBar(props: any){
    const { id , likes} = props;
    const [like, setLike] =useState(false);
    const onPress = ()=>{
        setLike(!like);
    }
    
    return (
        <View style={styles.containerButtonBar}>
            <TouchableOpacity onPress={onPress} style={[styles.like, styles.buttonsBarMargin]}>
                <Icon name={like ? 'heart' : 'heart-outline'} color={like ? '#F34423': '#000000'} type="material-community" size={40} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsBarMargin}>
                <Icon name='comment-outline' color="#000000" type="material-community" size={40} />
            </TouchableOpacity>
            <View style={styles.containerCountLikes}>
                <Icon name="heart" color="#000000"  type="material-community" size={20} />
                <Text>{likes}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
    containerButtonBar:{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'space-around', 
        alignItems: 'center'
    },
    containerCountLikes:{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    like:{
        marginLeft: '6%'
    },
    buttonsBarMargin:{
        marginRight: 10
    }
});
