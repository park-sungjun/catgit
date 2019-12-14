import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.text = '';
    }
    _press() {
        this.text = this.state.text;
        alert(this.text);
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, }}>
                <MyStatusBar styles={styles.statusBar} />
                <SafeAreaView style={{ flex: 1, }}>
                    <View style={{ flex: 1, flexDirection: 'column', }}>
                        <View style={{ height:50, flexDirection: 'row', backgroundColor: "white", 
                        paddingRight: 10, borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD', paddingTop: 5,}}>
                            <Image source={require('./img/backicon.png')} onTouchStart={() => navigation.goBack()}
                                style={{ width: 30, height: 30, marginLeft: 10, marginRight: 20, marginTop: 10,}} />
                            <TextInput
                                style={{
                                    flex: 1, height: 40, color: "black", borderColor: "white", backgroundColor: "white",
                                    fontSize: 18, borderBottomWidth: 2, borderBottomColor: '#00CC00',
                                }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />
                            <View style={{ flexDirection: 'row-reverse', backgroundColor: "white", }}>
                                <Image source={require('./img/search.png')} 
                                onTouchStart={() => this._press()} style={ styles.img }/>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD', }}>
                            <Text style={{ padding: 10, fontSize: 20 }}>
                                인기검색어
                            </Text>
                            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5, }}>
                                1.
                            </Text>
                            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5, }}>
                                2.
                            </Text>
                            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5, }}>
                                3.
                            </Text>
                            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5, }}>
                                4.
                            </Text>
                            <Text style={{ fontSize: 20, paddingLeft: 10, paddingTop: 5, paddingBottom: 10, }}>
                                5.
                            </Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={{ padding: 10, fontSize: 20 }}>
                                추천검색어
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        height: 50, flexDirection: 'row', backgroundColor: "white",
                        borderTopWidth: 0.7, borderTopColor: '#00CC00',
                    }}>
                        <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <Image source={require('./img/map.png')}
                                    style={ styles.img } />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image source={require('./img/home.png')}
                                    style={ styles.img } />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <Image source={require('./img/plus.png')}
                                    style={ styles.img } />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const height = getStatusBarHeight();
const styles = StyleSheet.create({
    statusBar: {
        height: height,
        backgroundColor:"white",
    },
    img: {
        backgroundColor: "white",
        height: 30,
        width: 30,
        marginTop: 10,
    },
});