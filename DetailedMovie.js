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
    const { movieId, posterPath } = route.params;

    // When this component is mounted call the getDetails method
    useEffect(() => {
        // Get details based on movieID, using api_key
        async function getDetails() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`);
            setMovie(await response.json());
        }
        getDetails();
    }, []);

    return (
        <View style={styles.coloredView}>

            <Topbar name={name} navigation={navigation}></Topbar>
            <View style={styles.viewInline}>
                <Image style={styles.image} resizeMode={'contain'}
                    source={{ uri: `https://image.tmdb.org/t/p/original${posterPath}` }}
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
            </View>
        </View>


    );
}

//Styles
const styles = StyleSheet.create({
    coloredView: {
        backgroundColor: "#305177",
        minHeight: "100%",
    },
    container: {
        backgroundColor: "#305177",
        flexDirection: "column",
        flex: 1,
    },
    text: {
        fontSize: 75,
        color: '#5DACBD'
    },
    viewInline: {
        backgroundColor: "#305177",
        flexDirection: 'row',
        flex: 1,
    },
    data: {
        marginBottom: 5,
        color: '#5DACBD',
        fontSize: 35
    },
    image: { 
        width: '40%', 
        height: '100%', 
        flexDirection: 'column', 
        alignSelf: 'flex-start',
    }
});