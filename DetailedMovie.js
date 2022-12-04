import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Topbar from "./Topbar";
import UserContext from "./UserContext";

export default function DetailedMovie({ route, navigation }) {
    //Receive the UserContext
    const { name, setName } = useContext(UserContext);

    // State holding the data of the selected movie.
    const [movie, setMovie] = useState({});

    // Get ID of movie from the navigator function
    const { movieId } = route.params;

    // When this component is mounted call the getDatails method
    useEffect(() => {
        getDetails();
    }, []);

    // Get details based on movieID, using api_key
    function getDetails() {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`)
            .then((response) => response.json())
            .then((data) => setMovie(data));
    }

    return (
        <div style={styles.colorForDiv}>
            <Topbar name={name} navigation={navigation}></Topbar>
            <div style={styles.divInline}>
                <Image style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
                />
                <View style={styles.container}>
                    <Text style={styles.text}>{movie.title}</Text>
                    <ScrollView>
                        <Text style={styles.data}>{movie.overview}</Text>
                        <Text style={styles.data}>Popularity: {movie.popularity}</Text>
                        <Text style={styles.data}>Status: {movie.status}</Text>
                        <Text style={styles.data}>Runtime: {movie.runtime} minutes</Text>
                        <Text style={styles.data}>Original language: {movie.original_language} </Text>
                        <Text style={styles.data}>Budget: {movie.budget}</Text>
                    </ScrollView>
                </View>
            </div>
        </div>


    );
}

//Styles
const styles = StyleSheet.create({
    colorForDiv: {
        backgroundColor: "#305177",
        minHeight: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: "#305177",
        justifyContent: "center",
    },
    text: {
        fontSize: 75,
        color: '#5DACBD'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        maxHeight: "30%",
        maxWidth: "40%"
    },
    divInline: {
        display: "flex",
        backgroundColor: "#305177",
    },
    data: {
        marginBottom: 5,
        color: '#5DACBD',
        fontSize: 35
    },
});