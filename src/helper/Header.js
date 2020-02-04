import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-ui-kitten'

import { Menu, Back, Add } from './Constants';


class Header extends Component {

    openAddBooking = () => {
        this.props.navigation.navigate('Booking');
    }

    // renderIcon = (style) => {
    //     return (
    //         <Icon {...style} name='menu-2-outline' />
    //     );
    // };

    render() {
        const { title, navigation, hide, isAdd }  = this.props;
        return (
            <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.centerContainer}>
                    <TouchableOpacity onPress={() => !hide ? navigation.toggleDrawer() : navigation.pop()}>
                        {!hide ? Menu : Back}
                    </TouchableOpacity>
                </View>
                <View style={[styles.centerContainer, { flex: 3 }]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.centerContainer}>
                     <TouchableOpacity onPress={this.openAddBooking}>
                        {isAdd && Add}
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        flexDirection: 'row'
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: '600',
        fontSize: 16
    }
})

export default Header;
