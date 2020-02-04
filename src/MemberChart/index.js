import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-ui-kitten'

import Carousel from 'react-native-snap-carousel';

import Header from '../helper/Header';
// 
import { data } from '../helper/chart';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class index extends Component {

    _renderItem = ({ item, index }) => {                
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.slide}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                    
                    <View style={{ backgroundColor: '#DDD', height: 1, width: viewportWidth - 100, marginBottom: 10 }} />
                    <Text style={styles.text}>{item.points}</Text>
                    <Text style={styles.text}>{item.studiorate}</Text>
                    <Text style={styles.text}>{item.offshoot}</Text>
                    <Text style={styles.text}>{item.traking}</Text>
                    {!!item.unlimited && (<Text style={styles.text}>{item.unlimited}</Text>)}
                    {!!item.freeshoot && (<Text style={styles.text}>{item.freeshoot}</Text>)}
                    {!!item.freebeat && (<Text style={styles.text}>{item.freebeat}</Text>)}
                    {!!item.offer && (<Text style={styles.text}>{item.offer}</Text>)}
                    {!!item.drink && (<Text style={styles.text}>{item.drink}</Text>)}
                    {!!item.promo && (<Text style={styles.text}>{item.promo}</Text>)}

                    <Button 
                        onPress={() => this.props.navigation.navigate('Purchase', { title: item.title })}
                        style={{ marginVertical: 10 }}>
                        Purchase
                    </Button>
                </View>
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Membership Plans" navigation={this.props.navigation} hide={true} />
                <View style={styles.container}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={data}
                        keyExtractor={(item) => item.title}
                        renderItem={this._renderItem}
                        sliderWidth={viewportWidth}
                        itemHeight={viewportHeight - 175}
                        itemWidth={viewportWidth - 62}
                        enableMomentum={true}
                        enableSnap={false}
                        snapToInterval={viewportWidth - 62}
                        decelerationRate={0.83}
                        snapToAlignment={"start"}
                        removeClippedSubviews={false}
                    />
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
    viewPager: {
        flex: 1
    },
    slide: {
        backgroundColor: '#FFF',
        marginTop: 20,
        height: viewportHeight - 140,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 18
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 18,
        color: '#0080ff' 
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 12,
        color: '#555',
        textAlign: 'center'
    }
})

export default index;
