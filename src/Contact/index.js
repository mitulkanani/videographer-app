import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-ui-kitten'

import Header from '../helper/Header';

class index extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Contact" navigation={this.props.navigation} />
                <View style={styles.container}>
                    <Text style={styles.text}>Get in <Text style={[styles.text, { color: '#0080ff' }]}>Touch!</Text></Text>
                    <Text style={styles.text2}>Feel free to fill in the form any question or suggestion you have!</Text>
                    <Text style={styles.text3}>We will get back to you as soon as possible!</Text>

                    <View style={styles.card}>
                        <Input
                            style={{ marginBottom: 15 }}
                            placeholder='Name'
                        />

                        <Input
                            style={{ marginBottom: 15 }}
                            placeholder='Email'
                            autoCapitalize="none"
                        />

                        <Input
                            multiline={true}
                            maxLength={200}
                            size="large"
                            style={{ marginBottom: 15 }}
                            placeholder='Message'
                            autoCapitalize="none"
                        />

                        <Button>SEND</Button>
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
        padding: 20
    },
    text: {
        marginTop: 20,
        fontSize: 21,
        fontWeight: '500',
        textAlign: 'center'
    },
    text2: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: '500',
        textAlign: 'center'
    },
    text3: {
        fontSize: 12,
        marginTop: 20,
        color: '#777',
        textAlign: 'center'
    },
    card: {
        marginTop: 20,
        backgroundColor: '#FFF',
        padding: 20,
    }
})

export default index;
