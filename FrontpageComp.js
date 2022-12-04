import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { API_KEY } from '@env'
import Button from '@mui/material/Button';
import UserContext from "./UserContext";

// Navigation is added through app.js when using navigation component.
export default function FrontPageComp({ navigation }) {
    const { name, setName } = useContext(UserContext);

    // State holding all movie data.
    const [data, setData] = useState([]);

    // Fetch movie list once component is mounted
    useEffect(() => {
        fetchMovies();
    }, []);

    // Get popular movies with API key injected
    function fetchMovies() {
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        ).then((response) => response.json())
            .then((data) => setData(data.results));
    }

    // Render function which returns the Movie component
    const renderMovie = ({ item }) => (
        <Movie navigation={navigation} movieId={item.id} title={item.title + " (" + item.release_date.substring(0, 4) + ")"} />
    );

    const changeName = () => {
        let name = prompt("Enter your name...");
        if (name !== null && name.trim() !== "") {
            setName(name.trim());
        }
    }

    // Uses a flatlist because we only need to render what the user can see.
    // as it would be too much to load them all.
    return (
        <div>
            <div style={styles.divInline}>
                <Image style={styles.image} source={require('./assets/logo.png')} alt="Logo" />
                <div>
                    <Text style={styles.text}>Welcome to MoveriesDB</Text>
                    <div>
                        <Text style={styles.title}>Your name: {name}</Text>
                    </div>
                    <div>
                        <Button style={styles.button} variant="outlined" onClick={changeName}>Click to change your name</Button>
                    </div>
                </div>
            </div>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderMovie}
                    keyExtractor={(movie) => movie.id}
                />
            </View>
        </div>
    );
}

//Handle clicks on movie; it navigates to details page of movie
const Movie = ({ navigation, title, movieId }) => (
    <View style={styles.item}>
        <Text
            onPress={() =>
                navigation.navigate("Details", {
                    movieId,
                })
            }
            style={styles.title} >
            {title}
        </Text>
    </View>
);

//Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#305177",
        justifyContent: "center",
    },
    item: {
        backgroundColor: "#5DACBD",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: "25px",
    },
    button: {
        backgroundColor: "#5DACBD",
        color: '#305177'
    },
    title: {
        fontSize: 32,
    },
    text: {
        fontSize: 75,
        color: '#5DACBD'
    },
    image: {
        width: "300px",
        height: "300px",
    },
    divInline: {
        display: "flex",
        backgroundColor: "#305177",
    }
});