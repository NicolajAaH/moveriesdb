import { Text, StyleSheet, Image, View } from "react-native";

//Topbar contains image and function to return to homepage once clicked, and displays the user in the top
export default function Topbar({ name, navigation }) {
    return (
        <View style={styles.viewInline}>
            <Image style={styles.image} source={require('./assets/logo.png')} alt="Logo" onClick={() => navigation.navigate("Home")} />
            <Text style={styles.text}>Current user: {name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
    viewInline: {
        display: "flex",
        paddingBottom: "10px",
        backgroundColor: "#305177",
        flexDirection: "row",
    }
});