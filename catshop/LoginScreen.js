import React, { Component } from "react";
// import { NaverLogin } from 'react-native-naver-login';
import {
    StyleSheet,
    StatusBar,
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.text = '';
        this.state = { text1: '' };
        this.text1 = '';
    }
    _press(op) {
        this.text = this.state.text;
        this.text1 = this.state.text1;
        if (op == 1) {
            alert("네아로그인" + this.text + this.text1);
        } else if (op == 2) {
            alert("cs로그인" + this.text + this.text1);
        } else if (op == 3) {
            alert("cs회원가입" + this.text + this.text1);
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, }}>
                <MyStatusBar styles={styles.statusBar} />
                <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            height: 50, flexDirection: 'row', paddingRight: 10, paddingTop: 5,
                            backgroundColor: "white", borderBottomWidth: 0.3, borderBottomColor: '#DDDDDD',
                        }}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={styles.name}>
                                    마이페이지
                        </Text>
                            </View>
                        </View>
                        <View style={{
                            height: 50, flexDirection: 'row', paddingRight: 10, paddingTop: 5,
                            backgroundColor: "white",
                        }}>
                            <View style={{ width: 100 }}>
                                <Text style={{ paddingLeft: 20, fontSize: 18, paddingTop: 10, }}>
                                    아이디
                        </Text>
                            </View>
                            <TextInput
                                style={{
                                    flex: 1, height: 40, color: "black", borderColor: "white", backgroundColor: "white",
                                    fontSize: 18, borderBottomWidth: 2, borderBottomColor: '#00CC00', marginLeft: 10, marginRight: 30,
                                }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />
                        </View>
                        <View style={{
                            height: 70, flexDirection: 'row', paddingRight: 10, paddingTop: 5,
                            backgroundColor: "white",
                        }}>
                            <View style={{ width: 100 }}>
                                <Text style={{ paddingLeft: 20, fontSize: 18, paddingTop: 10, }}>
                                    비밀번호
                        </Text>
                            </View>
                            <TextInput secureTextEntry={true}
                                style={{
                                    flex: 1, height: 40, color: "black", borderColor: "white", backgroundColor: "white",
                                    fontSize: 18, borderBottomWidth: 2, borderBottomColor: '#00CC00', marginLeft: 10, marginRight: 30,
                                }}
                                onChangeText={(text1) => this.setState({ text1 })}
                                value={this.state.text1}
                            />
                        </View>
                        <View style={{
                            height: 50, flexDirection: 'row', backgroundColor: "white",
                        }}>
                            <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center", 
                                borderWidth: 0.7, borderColor: '#00CC00' }}>
                                <TouchableOpacity onPress={() => this._press(1)}>
                                    <Text style={{ fontSize: 13, paddingTop: 7 }}>
                                        네이버아이디로{"\n\t\t\t\t\t\t"}로그인
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center", 
                                borderWidth: 0.7, borderColor: '#00CC00' }}>
                                <TouchableOpacity onPress={() => this._press(2)}>
                                    <Text style={{ fontSize: 13, paddingTop: 7 }}>
                                        catshop으로{"\n\t\t\t\t\t\t"}로그인
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center", 
                                borderWidth: 0.7, borderColor: '#00CC00' }}>
                                <TouchableOpacity onPress={() => this._press(3)}>
                                    <Text style={{ fontSize: 13, paddingTop: 7 }}>
                                        catshop으로{"\n\t\t\t\t"}회원가입
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        height: 50, flexDirection: 'row', backgroundColor: "white",
                        borderTopWidth: 0.7, borderTopColor: '#00CC00',
                    }}>
                        <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <Image source={require('./img/map.png')}
                                    style={styles.img} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image source={require('./img/home.png')}
                                    style={styles.img} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 / 3, flexDirection: 'column', alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                                <Image source={require('./img/plus.png')}
                                    style={styles.img} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}
// // TODO: 로그인처리 (이미 로그인되어있어도 창 강제로 띠웁니다)
// NaverLogin.login()
//     .then(res => {
//         alert("Signed Successful\n" + res.accessToken);
//     }).catch(e => {
//         alert("Signed Failure");
//     });

// // TODO: 로그아웃처리 
// NaverLogin.logout();

// // TODO: 토큰가져오기 (로그인안되어있음 안가져옴)
// NaverLogin.getAccessToken()
//     .then(res => {
//         alert("Signed Successful\n" + res.accessToken);
//     }).catch(e => {
//         alert("Signed Failure");
//     });

const height = getStatusBarHeight(); ``
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
    img: {
        backgroundColor: "white",
        height: 30,
        width: 30,
        marginTop: 10,
    },
});