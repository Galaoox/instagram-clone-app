import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Divider, Icon, Image, ListItem} from 'react-native-elements';
import {colors, SCREEN} from "../../utils/theme";
import IPost from "../../models/post";
import ViewMoreTextCustom from "../ViewMoreTextCustom";

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
                          titleStyle={styles.userName}
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
            <View style={styles.marginBottomElements}>
                <Text style={styles.textDate}>{date}</Text>
                <ViewMoreTextCustom>
                    <Text><Text style={styles.userName}>{userName}</Text> {description}</Text>
                </ViewMoreTextCustom>
            </View>
            
            {/* COMMENT BAR */}
            <View>
                <TouchableOpacity>
                    <ListItem leftAvatar={{
                        rounded: true,
                        size: "medium",
                        source: require("../../../assets/avatar-default.jpg")
                    }}
                              title={
                                  <Text style={{color: colors.inactive,  fontSize: 16}}>Comentar</Text>
                              }
                    />
                </TouchableOpacity>

            </View>
            <Divider />
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
            <TouchableOpacity onPress={onPress} style={[styles.marginBottomElements, styles.buttonsBarMargin]}>
                <Icon name={like ? 'heart' : 'heart-outline'} color={like ? '#F34423': '#000000'} type="material-community" size={35} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsBarMargin}>
                <Icon name='comment-outline' color="#000000" type="material-community" size={35} />
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
    marginBottomElements:{
        marginLeft: '4%'
    },
    buttonsBarMargin:{
        marginRight: 10
    },
    userName:{
        fontWeight: 'bold'
    },
    textDate:{
        color: colors.inactive
    }
});
