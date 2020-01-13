import React, { Component } from "react";
import {
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    StatusBar,
    SafeAreaView,
    ListItem,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { TouchableHighlight } from "react-native-gesture-handler";
import Swiper from 'react-native-swiper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions } from 'react-native'
import axios from 'axios';
import { Updates } from "expo";

const MyStatusBar = ({ backgroundColor, ...props }) => (    // statusbar 스타일
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
);

async function getLocationAsync() { // 위치권한
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
        console.log(status);
        // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
        console.log(status);
    }
}

async function getStorageAsync() {  // 파일권한
    const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
        console.log(status);
    } else {
        console.log(status);
    }
}

async function getCallAsync() { // 전화권한
    const { status, permissions } = await andoroid.permissions.PHONE_CALL.askAsync();
    if (status === 'granted') {
        console.log(status);
    } else {
        console.log(status);
    }
}

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        axios.get('http://45.119.146.149:5005/store_information')
            .then(response => { this.setState({ data: response.data }) })
    }
    _onPress(item) {
        if (item.id == 1) {
            getLocationAsync();   // 위치정보 함수 호출
        }
        else if (item.id == 2) {
            getStorageAsync();
        }
        else if (item.id == 3) {
            //getCallAsync();
        }
        else console.log(item.id);
    }
    render() {
        const { navigation } = this.props;  // 화면이동 모듈
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
                        <View style={{ height: 250, }}>
                            <Swiper style={styles.wrapper} showsButtons={true}>
                                <Image source={require('../img/banner1.png')}
                                    style={{ height: 250, width: Dimensions.get('window').width, }} />
                                <View style={styles.slide2}>
                                    <Text style={styles.text}>Beautiful</Text>
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.text}>And simple</Text>
                                </View>
                            </Swiper>
                        </View>
                        <View style={{
                            flexDirection: 'row', height: 44,
                            borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD', backgroundColor: 'white'
                        }}>
                            <Text style={styles.name}>
                                앱의 추천
                            </Text>
                        </View>
                        <View style={styles.container}>
                            {printinform(this.state.data)}
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
        function printinform(data){
            const shopitem = data.map((value) =>
                <li key={value.idx} data={value} />
            );
            if (shopitem[0] != null) {
                view.push(
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Shop', { value: shopitem[0].props.data })}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD' }}>
                                <View style={{ width: screenWidth - 90 }}>
                                    <Text style={{ paddingLeft: 10, fontSize: 20, paddingTop: 7, fontWeight: 'bold' }}>{shopitem[0].props.data.name}</Text>
                                    <Text style={{ paddingLeft: 10, fontSize: 10, paddingTop: 2, }}>{shopitem[0].props.data.location_old_kor}</Text>
                                    <Text style={{ paddingLeft: 10, fontSize: 10, paddingTop: 2, paddingBottom: 7 }}>{shopitem[0].props.data.opening_hours}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row-reverse", paddingTop: 15, paddingLeft: 10 }}>
                                    <Image
                                        style={{ width: 70, height: 70, }}
                                        source={{ uri: 'http://45.119.146.149:8008/img_files/pre/' + shopitem[0].props.data.name_nospace + '_1.jpg' }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Shop', { value: shopitem[1].props.data })}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD' }}>
                                <View style={{ width: screenWidth - 90 }}>
                                    <Text style={{ paddingLeft: 10, fontSize: 20, paddingTop: 7, fontWeight: 'bold' }}>{shopitem[1].props.data.name}</Text>
                                    <Text style={{ paddingLeft: 10, fontSize: 10, paddingTop: 2, }}>{shopitem[1].props.data.location_old_kor}</Text>
                                    <Text style={{ paddingLeft: 10, fontSize: 10, paddingTop: 2, paddingBottom: 7 }}>{shopitem[1].props.data.opening_hours}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row-reverse", paddingTop: 15, paddingLeft: 10 }}>
                                    <Image
                                        style={{ width: 70, height: 70, }}
                                        source={{ uri: 'http://45.119.146.149:8008/img_files/pre/' + shopitem[1].props.data.name_nospace + '_1.jpg' }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                            <View style={{ flex: 1, alignItems: "center", borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD' }}>
                                <Text style={{ fontSize: 20, paddingTop: 7, paddingBottom: 7, fontWeight: 'bold' }}>더보기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )      
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
    title: {
        fontSize: 32,
    },
    separator: {
        flex: 1
    },
    wrapper: {
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});