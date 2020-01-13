import React, { Component } from "react";
import MapView from 'react-native-maps';
import {
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Text,
    Platform,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import axios from 'axios';
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
            },
            data: [],
        };
    }
    componentDidMount() {
        axios.get('http://45.119.146.149:5005/store_information')
            .then(response => { this.setState({ data: response.data }) })
        if (Platform.OS == 'ios') {
            this.__reqpermission();
        }
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
        const view = [];
        return (
            <View style={{ flex: 1, }}>
                <MyStatusBar style={styles.statusBar} />
                <SafeAreaView style={{ flex: 1 }}>
                    <MapView region={this.state.mapRegion} style={{ flex: 1, }} >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.mapRegion.latitude,
                                longitude: this.state.mapRegion.longitude,
                            }}
                            title={"내위치"}
                        />
                        {printmapmarker(this.state.data)}
                    </MapView>
                    <TouchableOpacity style={{ position: 'absolute', }} onPress={() => this.componentDidMount()}>
                        <Image source={require('../img/map.png')}
                            style={{
                                height: 30, width: 30,
                                borderRadius: 400 / 2
                            }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ position: 'absolute', marginTop: 50, }} onPress={() => navigation.goBack()}>
                        <Image source={require('../img/plus.png')}
                            style={{
                                height: 30, width: 30,
                                borderRadius: 400 / 2
                            }} />
                    </TouchableOpacity>
                    <View style={{
                        height: 50, flexDirection: 'row', backgroundColor: "white",
                        borderTopWidth: 0.7, borderTopColor: '#00CC00',
                    }}>
                        <View style={{ flex: 1 / 5, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image source={require('../img/home.png')}
                                    style={styles.img} />
                                <Text>Home</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 5, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Image source={require('../img/home.png')}
                                    style={styles.img} />
                                <Text style={{ marginRight: 5, }}>내정보</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 5, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <Image source={require('../img/map.png')}
                                    style={{
                                        backgroundColor: "white",
                                        height: 20,
                                        width: 20,
                                        marginTop: 7,
                                        marginLeft: 2
                                    }} />
                                <Text>지도 </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 5, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Image source={require('../img/plus.png')}
                                    style={styles.img} />
                                <Text>관심샵</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 5, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                <Image source={require('../img/plus.png')}
                                    style={styles.img} />
                                <Text>더보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
        function printmapmarker(data) {
            const shoploc = data.map((value) =>
                <li key={value.idx} data={value} />
            );
            if (shoploc[0] != null) {
                var i = 0;
                while(shoploc[i]!=null){
                    view.push(
                        <MapView.Marker
                            coordinate={{
                                latitude: Number(shoploc[i].props.data.coordinate_latitude),
                                longitude: Number(shoploc[i].props.data.coordinate_longitude),
                            }}
                            key={Number(shoploc[i].props.data.idx)}
                            title={shoploc[i].props.data.name}
                        />
                    )
                    i++;
                }
            }
            return view;
        }
    }
}
const height = getStatusBarHeight();
const styles = StyleSheet.create({
    statusBar: {
        height: height,
        backgroundColor: "white",
    },
    img: {
        backgroundColor: "white",
        height: 20,
        width: 20,
        marginTop: 7,
        marginLeft: 9,
    }
});