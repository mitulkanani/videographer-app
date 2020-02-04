import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Button, Layout, Avatar } from 'react-native-ui-kitten'
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../helper/Header';

import Promises from '../helper/Promises';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';
import { host } from '../helper/Constants';

class index extends Component {

    state = {
        isLogin: false,
        name: '',
        role: '',
        total_beats: 0,
        total_booking: 0,
        total_events: 0,
        total_tracks: 0,
        avatar: ''
    }
    
    async componentDidMount() {
        this.getCurrentUser(); 
    }

    getCurrentUser = () => {        
        Axios.get(`${host}current_user`)
        .then((result) => {
            console.log(result);
            const { success } = result.data;
            if (success) {
                const { display_username, role, total_beats, total_booking, total_events, total_tracks, avatar } = result.data.data;
                this.setState({ isLogin: true, name: display_username, role, total_beats, total_booking, total_events, total_tracks, avatar });
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    goToLogin = () => {
        const { navigation } = this.props;
        navigation.navigate('Login')
    }

    onLogout = () => {
        AsyncStorage.clear();
        const { navigation } = this.props;
        navigation.navigate('Login');
    }

    showLoginButton = () => (
        <View style={styles.center}>
            <Text>Not Login yet!</Text>
            <Button
                style={{ marginVertical: 20 }}
                onPress={() => this.goToLogin()}
            >
                Login here
            </Button>
        </View>
    )

    showProfile = () => {
        const { role, name, total_beats, total_booking, total_events, total_tracks, avatar } = this.state;
        return (
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <View style={{ alignSelf: 'center', marginTop: 30 }}>
                    <Avatar
                        source={{ uri: avatar ? avatar : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
                        style={{ height: 100, width: 100, marginLeft: 20 }}
                        shape="rounded"
                    />
                    <Text style={styles.txtName}>{name}</Text>
                    <Text style={styles.txtMember}>{role}</Text>
                </View>
                {role === 'None Member'  && this.showMemberCard()}
                <View style={styles.row}>
                    {this.showCard(total_booking, 'My Booking')}
                    {this.showCard(total_tracks, 'Live Project Tracking')}  
                </View>
                <View style={styles.row}>
                    {this.showCard(total_events, 'Events')}
                    {this.showCard(total_beats, 'Beats')}  
                </View>
                <Button 
                    onPress={this.onLogout}
                    style={{ marginTop: 20, marginHorizontal: 20 }}>
                    Log out
                </Button>
                <View style={{ height: 100 }} />
            </ScrollView>
        );
    }

    showMemberCard = () => (
        <TouchableOpacity style={styles.cardMember} onPress={() => this.props.navigation.navigate('MemberChart')}>
            <Text style={styles.txtBecome}>Become a premium member</Text>
            <Text style={styles.txtSee}>See the benefits</Text>
        </TouchableOpacity>
    )

    showCard = (value, title) => {
        return (
            <View style={styles.card}>
                <Text style={styles.num}>{value}</Text>
                <Text style={styles.type}>{title}</Text>
            </View>
        )
    }


    render() {
        const { isLogin } = this.state;
        return (
            <Layout style={{ flex: 1 }}>
                <Header title="Profile" navigation={this.props.navigation} isAdd={true} />
                <View style={styles.container}>
                     {!isLogin ? this.showLoginButton() : this.showProfile()}
                     {/* {this.showProfile()} */}
                     
                </View>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    txtMember: {
        marginTop: 5,
       fontSize: 14,
       fontWeight: '500',
       textAlign: 'center',
       color: '#999'
    },
    txtName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'  
    },
    card: {
        width: 130,
        height: 100,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardMember: {
        width: 280,
        height: 70,
        backgroundColor: '#FFF',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 6
    },
    row: { flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignContent: 'space-around'  },
    num: {
        fontSize: 21,
        fontWeight: '600',
        marginBottom: 5
    },
    type: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#666'
    },
    txtSee: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        color: '#0080ff',
    }
})

export default index;
