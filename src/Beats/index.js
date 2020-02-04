import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-ui-kitten'

import Header from '../helper/Header';

class index extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
               <Header title="Beats" navigation={this.props.navigation} isAdd={true} />
                <View style={styles.container}>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        flex: 1,
    }
})

export default index;
