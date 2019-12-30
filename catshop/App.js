import { createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from "./screen/HomeScreen";
import ProfileScreen from "./screen/ProfileScreen";
import MapScreen from "./screen/MapScreen";
import LoginScreen from "./screen/LoginScreen";
import PlusScreen from "./screen/PlusScreen";
import ShopScreen from "./screen/ShopScreen";

const App = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
    Map: {screen: MapScreen},
    Login: {screen: LoginScreen},
    Plus: {screen: PlusScreen},
    Shop: {screen: ShopScreen},
  },{ initialRouteName: "Home", headerMode: "none"}
);

export default createAppContainer(App);