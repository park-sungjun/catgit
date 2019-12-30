import React, { Component } from "react";
import {
    StyleSheet,
    StatusBar,
    View,
    SafeAreaView,
    Text,
    Image,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

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
        const name = navigation.getParam("name");
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
                                style={{ width: 30, height: 30, marginLeft: 10, marginRight: 20, marginTop: 10,}} />
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={styles.name}>
                                    {name}
                                </Text>
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
});