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
const Movie = ({ navigation, title, movieId, poster_path }) => (
    <View style={styles.item}>
        <div style={styles.divCenter}>
        <Image
                    style={styles.imageItem}
                    source={{ uri: `https://image.tmdb.org/t/p/original${poster_path}`,}}
                />
        <Text
            onPress={() =>
                navigation.navigate("Details", {
                    movieId,
                })
            }
            style={styles.title} >
            {title}
        </Text>
        </div>
        
    </View>
);

//Stylesheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#305177",
    },
    item: {
        backgroundColor: "#5DACBD",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: "25px",
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
        width: "50px",
        height: "100px",
        display: "inline-block",
        borderRadius: "25px",
    },
    divInline: {
        display: "flex",
        backgroundColor: "#305177",
    },
    divCenter: {
        display: "flex",
    }
});