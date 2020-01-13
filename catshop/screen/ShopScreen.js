import React, { Component } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    View,
    SafeAreaView,
    Text,
    Image,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from 'react-native'
import Swiper from 'react-native-swiper';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class ShopScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { navigation } = this.props;
        const value = navigation.getParam("value");
        function printimg() {
            const img = [];
            if (value.imgs_count == 0) {
                img.push(
                    <Image style={{ height: 250, width: Dimensions.get('window').width, }}
                        source={require('../img/noimg.png')}>
                    </Image>
                )
            }
            else {
                for (let i = 1; i < value.imgs_count; i++) {
                    img.push(
                        <Image style={{ height: 250, width: Dimensions.get('window').width, }}
                            source={{ uri: 'http://45.119.146.149:8008/img_files/original/' + value.name_nospace + '_' + i + '.png' }}>
                        </Image>
                    );
                }
            }
            return img;
        }
        return (
            <View style={{ flex: 1, }}>
                <MyStatusBar styles={styles.statusBar} />
                <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            height: 50, flexDirection: 'row', paddingRight: 10, paddingTop: 5,
                            backgroundColor: "white", borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD',
                        }}>
                            <Image source={require('../img/backicon.png')} onTouchStart={() => navigation.goBack()}
                                style={{ width: 30, height: 30, marginLeft: 10, marginRight: 20, marginTop: 5, }} />
                            <View style={{ flex: 1, alignItems: "center", marginRight: 40 }}>
                                <Text style={styles.name}>
                                    {value.name}
                                </Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{ height: 250, }}>
                                <Swiper style={styles.wrapper} showsButtons={true}>
                                    {printimg()}
                                </Swiper>
                            </View>
                            <Text style={styles.inform}>{value.call_num}</Text>
                            <Text style={styles.inform}>{value.location_old_kor}</Text>
                            <Text style={styles.inform}>{value.opening_hours}</Text>
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
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}


const height = getStatusBarHeight();
const styles = StyleSheet.create({
    statusBar: {
        height: height,
        backgroundColor: "white",
    },
    name: {
        fontSize: 17,
        paddingTop: 10,
        color: "#00CC00",
    },
    inform: {
        fontSize: 15,
        paddingTop: 10,
        paddingLeft: 10,
        color: "black",
    },
    wrapper: {
    },
    img: {
        backgroundColor: "white",
        height: 20,
        width: 20,
        marginTop: 7,
        marginLeft: 9,
    }
});