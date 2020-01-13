import React, { Component } from "react";
import MapView from 'react-native-maps';

import {
    Text,
    View,
    Image,
    TextInput,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
    Alert,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { Dimensions } from 'react-native'
const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: {
                latitude: 37.553121,
                longitude: 127.024217,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            data: []
        };
    }

    componentDidMount() {
        axios.get('http://45.119.146.149:5005/store_information')
            .then(response => { this.setState({ data: response.data }) })
        if (Platform.OS == 'ios') {
            this.__reqpermission();
        }
        setTimeout(() => {
            // ios위치 정보 업로드 느림, 어플 권한 설정 페이지 안들어가짐
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    this.setState({
                        mapRegion: {
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: 0.00922,
                            longitudeDelta: 0.00421
                        }
                    })
                }, (error) => {
                    this.setState({
                        latitude: 37.553121,
                        longitude: 127.024217,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    })
                }, { enableHighAccuracy: true, timeout: 50000, maximumAge: 1000 },
            );
        }, 500);
    }

    async __reqpermission() {
        const { status: permissionStatus } = await Permissions.getAsync(Permissions.LOCATION);
        if (permissionStatus == 'denied') {
            Alert.alert(
                '위치 권한을 필요로 합니다.',
                '',
                [
                    { text: '취소', onPress: () => console.log('cancel pressed'), style: 'cancel' },
                    { text: '설정하러 가기', onPress: () => console.log('ok') },
                ],
                { cancelable: false }
            )
        }
        console.log(permissionStatus);
    }

    render() {
        const { navigation } = this.props;
        const screenWidth = Math.round(Dimensions.get('window').width);
        const view = [];
        return (
            <View style={{ flex: 1, }}>
                <MyStatusBar styles={styles.statusBar} />
                <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", }}>
                    <View style={{
                        height: 50, flexDirection: 'row', paddingRight: 10, paddingTop: 5,
                        backgroundColor: "white",
                    }}>
                        <Text style={styles.name}>
                            catshop
                        </Text>
                        <TouchableOpacity style={styles.textinput} onPress={() => navigation.navigate('Profile')}>
                            <TextInput editable={false} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.img} onPress={() => navigation.navigate('Profile')}>
                            <View>
                                <Image source={require('../img/search.png')}
                                    style={{ width: 30, height: 30, }} />
                            </View>
                        </TouchableOpacity>
                        <Text onTouchStart={() => navigation.navigate('Login')} style={styles.mypage}>
                            마이{"\n"}페이지
                        </Text>
                    </View>
                    <ScrollView style={{ flex: 1, }}>
                        <MapView region={this.state.mapRegion} style={{ height: 250, }}>
                            <MapView.Marker
                                coordinate={{
                                    latitude: this.state.mapRegion.latitude,
                                    longitude: this.state.mapRegion.longitude,
                                }}
                                title={"내위치"}
                            />
                            {printmapmarker(this.state.data)}
                        </MapView>
                        <TouchableOpacity style={{ position: 'absolute', }} onPress={() => navigation.navigate('Plus')}>
                            <Image source={require('../img/map.png')}
                                style={{
                                    height: 30, width: 30,
                                    borderRadius: 400 / 2
                                }} />
                        </TouchableOpacity>
                        <View style={styles.container}>
                            {this.state.data.map((value) =>
                                <View key={value.idx} style={{ borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD' }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Shop', { value: value })}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <View style={{ width: screenWidth - 90 }}>
                                                <Text style={{ paddingLeft: 10, fontSize: 20, paddingTop: 7, fontWeight: 'bold' }}>{value.name}</Text>
                                                <Text style={{ paddingLeft: 10, fontSize: 10, paddingTop: 2, }}>{value.location_old_kor}</Text>
                                                <Text style={{ paddingLeft: 10, fontSize: 10, paddingTop: 2, paddingBottom: 7 }}>{value.opening_hours}</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: "row-reverse", paddingTop: 15, paddingLeft: 10 }}>
                                                <Image
                                                    style={{ width: 70, height: 70, }}
                                                    source={{ uri: 'http://45.119.146.149:8008/img_files/pre/' + value.name_nospace + '_1.jpg' }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </ScrollView>
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
                                <Text style={{marginRight:5,}}>내정보</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 5, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <Image source={require('../img/map.png')}
                                    style={{backgroundColor: "white",
                                    height: 20,
                                    width: 20,
                                    marginTop: 7,
                                    marginLeft: 2}} />
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
                for (var i = 0; i < 10; i++) {
                    view.push(
                        <MapView.Marker
                            coordinate={{
                                latitude: Number(shoploc[i].props.data.coordinate_latitude),
                                longitude: Number(shoploc[i].props.data.coordinate_longitude),
                            }}
                            title={shoploc[i].props.data.name}
                        />
                    )
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
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 7,
        paddingLeft: 10,
        color: "#00CC00",
    },
    mypage: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 7,
        paddingLeft: 10,
        color: "#00CC00",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 25,
        marginHorizontal: 16,
        height: 300,
    },
    textinput: {
        flex: 1, height: 40,
        color: "#00CC00",
        fontSize: 18,
        borderBottomWidth: 2,
        borderBottomColor: "#00CC00",
    },
    img: {
        backgroundColor: "white",
        height: 20,
        width: 20,
        marginTop: 7,
        marginLeft: 9,
    },
});