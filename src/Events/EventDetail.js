import React, { Component } from 'react'
import { View, Image, Dimensions, Text } from 'react-native';
import Header from '../helper/Header';

const { width } = Dimensions.get('window');

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export default class EventDetail extends Component {

    render() {
        const { item } = this.props;
        return (
            <View style={styles.container}>
                <Header hide title='Event Detail' navigation={this.props.navigation} />
                <View style={styles.container2}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://picsum.photos/500/300' }}
                    />
                    <View style={[styles.row, { marginVertical: 10 }]}>
                        <Text style={styles.title}>Title</Text>
                        <Text style={styles.date}>14-10-2019</Text>
                    </View>
                    <View>
                        <Text render style={styles.description}>{lorem}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        backgroundColor: '#FFF',
    },
    container2: {
        borderRadius: 20, 
        padding: 10,
        marginHorizontal: 10,
    },
    image: {
        width: width - 40,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    date: {
        color: '#777',
        fontSize: 14
    },
    description: {
        fontSize: 15,
        color: '#4555',
    },
    title: {
        fontSize: 17,
        fontWeight: '600'
    },
    read: {
        color: '#056678',
        // textDecorationLine: 'underline'
    }
}
