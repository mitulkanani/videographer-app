import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from 'react-native-ui-kitten'

import { Kilo, Instagram, Twitter } from '../helper/Constants';

import Header from '../helper/Header';

class index extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
               <Header title="About us" navigation={this.props.navigation} />
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Image source={Kilo} style={styles.icon}  />
                        <Text style={styles.text}>Wecolme to Kilo Vision</Text>
                        <Text style={styles.text2}>Checkout our pages</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                            {Instagram}
                            {Twitter}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        flex: 1,
    },
    card: {
        margin: 20,
        backgroundColor: '#FFF',
        padding: 20,
        marginTop: 20
    },
    icon: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 20
    },
    text2: { color: '#888', fontSize: 16, textAlign: 'center', marginTop: 20 }
})

export default index;
