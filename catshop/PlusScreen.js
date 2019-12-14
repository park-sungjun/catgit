import React, { Component } from "react";
import MapView from 'react-native-maps';
import {
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class PlusScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: {
                latitude: 37.553121,
                longitude: 127.024217,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                this.setState({
                    mapRegion: {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.00822,
                        longitudeDelta: 0.00321
                    }
                })
            }, (error) => {
                this.setState({
                    latitude: 37.553121,
                    longitude: 127.024217,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                })
                console.log(error);
            }, { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 },
        );
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, }}>
                <MyStatusBar style={styles.statusBar} />
                <SafeAreaView style={{ flex: 1 }}>
                    <MapView region={this.state.mapRegion} style={{ flex: 1, }}>
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.mapRegion.latitude,
                                longitude: this.state.mapRegion.longitude,
                            }}
                            title={"marker.title"}
                            description={"desss"}
                        />
                    </MapView>
                    <TouchableOpacity style={{ position: 'absolute', }} onPress={() => this.componentDidMount()}>
                        <Image source={require('./img/map.png')}
                            style={{
                                height: 30, width: 30,
                                borderRadius: 400 / 2
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', marginTop: 50, }} onPress={() => navigation.goBack()}>
                        <Image source={require('./img/plus.png')}
                            style={{
                                height: 30, width: 30,
                                borderRadius: 400 / 2
                            }} />
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    }
}
const height = getStatusBarHeight();
const styles = StyleSheet.create({
    statusBar: {
        height: height,
        backgroundColor: "white",
    }
});