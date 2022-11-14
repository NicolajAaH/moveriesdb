import { Text, StyleSheet, Image } from "react-native";

//Topbar contains image and function to return to homepage once clicked, and displays the user in the top
export default function Topbar({ name, navigation }) {
    return (
        <div style={styles.divInline}>
            <Image style={styles.image} source={require('./assets/logo.png')} alt="Logo" onClick={() => navigation.navigate("Home")} />
            <Text style={styles.text}>Current user: {name}</Text>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: "300px",
    },
    text: {
        fontSize: 75,
        color: '#5DACBD'
    },
    image: {
        width: "90px",
        height: "90px"
    },
    divInline: {
        display: "flex",
        paddingBottom: "10px",
        backgroundColor: "#305177",
    }
});