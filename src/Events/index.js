import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Spinner } from 'react-native-ui-kitten'

import Header from '../helper/Header';
import { FlatList } from 'react-native-gesture-handler';
import Axios from 'axios';
import { host } from '../helper/Constants';
import EventCard from './EventCard';

class index extends Component {

    state = {
        events: [],
        currentPage: 1,
        isLoading: false,
        isReachEnd: false
    }

    componentDidMount = () => {
        this.setState({ isLoading: true }, this.getEvents)
    }

    getEvents = () => {
        const { currentPage } = this.state;
        Axios.post(`${host}events?page=${currentPage}`, {})
            .then((result) => {
                console.log(result.data);
                const { success } = result.data;
                if (success) {
                    this.setState({ events: this.state.events.concat(result.data.data), isLoading: false });
                } else {
                    this.setState({ isReachEnd: true });
                }
            }).catch((e) => {
                console.log(e);
                this.setState({ isLoading: false })
            })
    }

    renderItem = ({ item, index }) => {
        return (
            <EventCard item={item} navigation={this.props.navigation} />
        )
    }

    handleLoadMore = () => {
        const { isReachEnd } = this.state;
        if (!isReachEnd) {
            this.setState({ isLoading: true, currentPage: this.state.currentPage + 1 }, this.getEvents)
        }
    }

    renderFooter = () => {
        const { isLoading, isReachEnd } = this.state;
        return isLoading && !isReachEnd ? (<View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <Spinner style={{ alignSelf: 'center' }} status='info' />
        </View>)
            : null
    }

    keyExtractor = (item, index) => `item-${index}`

    render() {
        const { events } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header title="Events" navigation={this.props.navigation} isAdd={true} />
                <View style={styles.container}>
                    <FlatList
                        style={{ height: '100%' }}
                        data={events}
                        renderItem={this.renderItem}
                        initialNumToRender={2}
                        onEndReachedThreshold={0.2}
                        keyExtractor={this.keyExtractor}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.handleLoadMore}
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
    }
})

export default index;
