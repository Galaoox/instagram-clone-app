import React, {useCallback, useState} from "react";
import {StyleSheet, View} from "react-native";
import {UserContext} from "../components/context";
import ListPosts from "../components/Posts/ListPosts";
import IPost from "../models/post";
import {useFocusEffect} from "@react-navigation/native";

export default function Home(props: any) {
    const [posts, setPosts] = useState<IPost[]>(mockData());
    const [totalPosts, setTotalPosts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [startPost, setStartPost] = useState<IPost | null>(null); // paginacion de las publicaciones


    const getPost = (isReload: boolean = false) => {
        const loadingMethod = isReload ? setRefreshing : setLoading;
        loadingMethod(true);
        console.log('recargando o no');
        loadingMethod(false);

    }

    const handleLoadMore = () => {

        if (posts.length < totalPosts) {
            setLoadingMore(true);
            console.log("OBTENIENDO MAS SOLICITUDES");
            const data = mockData();
            data.length > 0
                ? setStartPost(data[data.length - 1])
                : setLoadingMore(false);

            setPosts([...posts, ...data]);
        } else {
            setLoadingMore(false);
        }
    }


    /**
     * Obtiene la cantidad total de publicaciones que puede ver el usuario
     */
    const getTotalRequest = () => {
        setTotalPosts(50);
    };

    useFocusEffect(
        useCallback(() => {
            getPost();
            getTotalRequest();
        }, [])
    );


    return (
        <UserContext.Consumer>
            {({name}) => {
                return (
                    <View style={styles.container}>
                        <ListPosts handleLoadMore={handleLoadMore} loading={loading} loadingMore={loadingMore}
                                   onRefresh={getPost} posts={posts}
                                   refreshing={refreshing}/>
                    </View>
                );
            }}
        </UserContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
});


function mockData() {
    const data:IPost[] = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            userName: 'erickavn1984',
            avatarUrl: `https://picsum.photos/id/${i+1}/200/200.jpg`,
            likes: 2 * i,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            id: i,
            date: '220-262-2',
            imageUrl: `https://picsum.photos/id/${i+1}/300/300.jpg?`
        })
    }

    return data;

}