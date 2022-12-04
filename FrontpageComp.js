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
        // Get popular movies with API key injected
        async function fetchMovies() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const json = await response.json();
            setData(json.results);
        }
        fetchMovies();
    }, []);


    // Render function which returns the Movie component
    const renderMovie = ({ item }) => (
        <Movie navigation={navigation} poster_path={item.poster_path} movieId={item.id} title={item.title + " (" + item.release_date.substring(0, 4) + ")"} />
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
        <View>
            <View style={styles.viewInline}>
                <Image style={styles.image} source={require('./assets/logo.png')} alt="Logo" />
                <View>
                    <Text style={styles.text}>Welcome to MoveriesDB</Text>
                    <Text style={styles.title}>Your name: {name}</Text>
                    <Button style={styles.button} variant="outlined" onClick={changeName}>Click to change your name</Button>
                </View>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderMovie}
                    keyExtractor={(movie) => movie.id}
                />
            </View>
        </View>
    );
}

//Handle clicks on movie; it navigates to details page of movie
const Movie = ({ navigation, title, movieId, poster_path }) => (
    <View style={styles.item}>
        <Image style={styles.imageItem}
            source={{ uri: `https://image.tmdb.org/t/p/original${poster_path}` }}
        />
        <Text onPress={() => navigation.navigate("Details", { movieId: movieId, posterPath: poster_path })}
            style={styles.title}>
            {title}
        </Text>
    </View>
);

//Stylesheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#305177",
        marginTop: "20px",
    },
    item: {
        backgroundColor: "#5DACBD",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: "25px",
        display: "flex",
        flexDirection: "row",

    },
    button: {
        backgroundColor: "#5DACBD",
        color: '#305177'
    },
    title: {
        fontSize: 50,
        marginLeft: "10px",
        marginVertical: "auto",
    },
    text: {
        fontSize: 75,
        color: '#5DACBD'
    },
    image: {
        width: "300px",
        height: "300px",
    },
    imageItem: {
        width: "80px",
        height: "100px",
        display: "inline-block",
        borderRadius: "25px",
    },
    viewInline: {
        flexDirection: "row",
        backgroundColor: "#305177",
    },
});