import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontpageComp from "./FrontpageComp";
import DetailedMovie from "./DetailedMovie";
import { UserProvider } from "./UserContext";

const Stack = createNativeStackNavigator();
const MyTheme = {
  colors: {
    background: 'rgb(48, 81, 119)',
  },
};

//Uses a StackNavigator for easy navigation
export default function app() {
  return (
    <NavigationContainer theme={MyTheme}>
      <UserProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={FrontpageComp}></Stack.Screen>
          <Stack.Screen name="Details" component={DetailedMovie}></Stack.Screen>
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}
