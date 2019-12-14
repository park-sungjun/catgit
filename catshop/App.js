import { createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import MapScreen from "./MapScreen";
import LoginScreen from "./LoginScreen";
import PlusScreen from "./PlusScreen";

const App = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
    Map: {screen: MapScreen},
    Login: {screen: LoginScreen},
    Plus: {screen: PlusScreen},
  },{ initialRouteName: "Home", headerMode: "none"}
);

export default createAppContainer(App);