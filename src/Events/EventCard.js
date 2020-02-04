import React, { Component } from 'react'
import { View, Image, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

const lorem = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
 
export default class EventCard extends Component {

    onReadMorePress = () => {
        this.props.navigation.navigate('EventDetail');
    }
 
    render() {
        const { item } = this.props;
        return (
            <View style={styles.container}>
                <Image 
                    style={styles.image}
                    source={{ uri: 'https://picsum.photos/500/300'}}
                 />
                <View style={[styles.row, {marginVertical: 10}]}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.event_date}</Text>
                </View>
                <View>
                   {lorem.length <= 120 ? <Text numberOfLines={3} render style={styles.description}>{lorem}</Text> : 
                   <Text style={styles.description}>{lorem.substring(0, 120)}<Text onPress={this.onReadMorePress} style={styles.read}> ...Read More</Text></Text>}
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        backgroundColor: '#FFF',
        borderRadius: 20, 
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10
    },
    image: {
        width: width - 40,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 20
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
