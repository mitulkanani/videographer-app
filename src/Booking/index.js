import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Text, Input, Icon, Select, Layout, Button, CheckBox, Modal, Calendar } from 'react-native-ui-kitten'
import Axios from 'axios'
import moment from 'moment';

import Header from '../helper/Header';
import { host } from '../helper/Constants';

const maxWidth = 280;

const currentDate = new Date().getDate() + 1;
const { width } = Dimensions.get('window');

const data = [
    { text: 'Photoshoot' },
    { text: 'Videoshoot' }
];

class index extends Component {

    state = {
        role: '',
        name: '',
        time: 2,
        date: moment(new Date()).format('MM-DD-YYYY'),
        calanderDate: moment(new Date()).add('MM-DD-YYYY').format('MM-DD-YYYY'),
        selectedOption: [

        ],
        video: 0,
        photo: 0,

        photoshoot_price: 50,
        videoshoot_price: 60,
        checked: false,
        isDisable: true,
        isBooked: false,
        isDate: false
    }

    componentDidMount() {
        this.getCurrentPrice();
    }

    getCurrentPrice = () => {
        Axios.get(`${host}pricing`)
            .then((result) => {
                if (result.status == 200) {
                    console.log(result.data.data);

                    const { kvp_studio_ps, kvp_studio_vs } = result.data.data;
                    this.setState({ photoshoot_price: kvp_studio_ps, videoshoot_price: kvp_studio_vs });
                }
            }).catch((e) => {
                console.log(e);
            });
    }

    addBooking = (hours, date, photo, video) => {
        const amount = photo + video;
        const services = { studio_ps: photo !== 0, studio_vs: video !== 0 }
        const obj = { hours, date, services, amount }

        console.log(obj);

        Axios.post(`${host}booking`, obj)
            .then((result) => {
                console.log(result.data);
                if (result.status == 200) {
                    Alert.alert('Booking request has been added, we will get back to you soon')
                    this.setState({ isBooked: true })

                }
            }).catch((e) => {
                console.log(e);
            });
    }

    navigation = () => {
        this.props.navigation.navigate('MemberChart');
    }

    onCheckedChange = (checked) => {
        this.setState({ checked, isDisable: !checked });
    };

    onTimeChange = (value) => {
        const { selectedOption, photoshoot_price, videoshoot_price } = this.state;
        this.setState({ time: value });
        if (selectedOption && selectedOption.length > 0) {
            if (selectedOption[0].text === 'Photoshoot' || selectedOption[selectedOption.length - 1].text === 'Photoshoot') {
                this.setState({ photo: photoshoot_price * value })
            } else {
                this.setState({ photo: 0 })
            }

            if (selectedOption[0].text === 'Videoshoot' || selectedOption[selectedOption.length - 1].text === 'Videoshoot') {
                this.setState({ video: videoshoot_price * value })
            } else {
                this.setState({ video: 0 })
            }
        } else {
            this.setState({ video: 0, photo: 0 })
        }
    }

    onTypeSelect = (selectedOption: []) => {
        const { photoshoot_price, videoshoot_price, time } = this.state;
        console.log(selectedOption);
        this.setState({ selectedOption });

        if (selectedOption && selectedOption.length > 0) {
            if (selectedOption[0].text === 'Photoshoot' || selectedOption[selectedOption.length - 1].text === 'Photoshoot') {
                this.setState({ photo: photoshoot_price * time })
            } else {
                this.setState({ photo: 0 })
            }

            if (selectedOption[0].text === 'Videoshoot' || selectedOption[selectedOption.length - 1].text === 'Videoshoot') {
                this.setState({ video: videoshoot_price * time })
            } else {
                this.setState({ video: 0 })
            }
        } else {
            this.setState({ video: 0, photo: 0 })
        }
    };

    extractKey = (item) => {
        return item.text;
    };

    onBookingPress = () => {
        const { time, date, selectedOption, photo, video } = this.state;
        if (!!time && !!date && !!selectedOption && selectedOption.length > 0) {
            this.addBooking(time, date, photo, video);
        } else {
            Alert.alert('Please select each field')
        }

    }

    onPlusPress = () => {
        const { time } = this.state;
        this.setState({ time: time + 1 })
    }

    onMinusPress = () => {
        const { time } = this.state;
        if (time > 2) {
            this.setState({ time: time - 1 })
        }
    }

    onSelect = (date) => {
        if (date >= new Date()) {
            this.setState({ calanderDate: moment(date).format('MM-DD-YYYY'), date: moment(date).format('MM-DD-YYYY'), isDate: false });
        } else {
            Alert.alert('Please select future date')
        }
    };

    renderCalanderIcon = (style) => {
        return (
            <Icon {...style} name={'calendar-outline'} />
        );
    };

    onTermPress = () => {
        this.props.navigation.navigate('Terms')
    }

    renderTerm = () => (
        <Text style={styles.term}>Are you agree with our
            <Text onPress={this.onTermPress} style={styles.term1}> Term & Condition</Text>
        </Text>
    )

    render() {
        const { time, calanderDate, video, photo, checked, isDisable, isBooked } = this.state;
        const total = photo + video;
        return (
            <Layout style={{ flex: 1 }}>
                <Header title="Studio Booking" navigation={this.props.navigation} hide={true} isAdd={false} />
                <ScrollView style={styles.container}>
                    <Text style={styles.txtBook}>Book studio time
                        <Text style={styles.txt}> *(Minimum 2 hour)</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Button onPress={this.onMinusPress} style={styles.btnAuto}>-</Button>
                        <Input
                            textStyle={{ fontSize: 20, fontWeight: '800' }}
                            editable={false}
                            textAlign={'center'}
                            style={[styles.input, { width: 100 }]}
                            value={time.toString()}
                            keyboardType='number-pad'
                            onChangeText={(value) => this.onTimeChange(value)}
                        />
                        <Button onPress={this.onPlusPress} style={styles.btnAuto}>+</Button>
                    </View>
                    <Text style={styles.txtBook}>On which date?</Text>
                    <Input
                        style={styles.input}
                        value={calanderDate.toString()}
                        keyboardType='number-pad'
                        icon={this.renderCalanderIcon}
                        onIconPress={() => this.setState({ isDate: true })}
                    />
                    <Text style={styles.txtBook}>How we can help you?</Text>
                    <Select
                        style={{ marginVertical: 14 }}
                        data={data}
                        multiSelect={true}
                        selectedOption={this.state.selectedOption}
                        keyExtractor={this.extractKey}
                        onSelect={this.onTypeSelect}
                    />
                    <Text style={styles.txtBook}>Pricing</Text>
                    <View style={styles.row}>
                        <View style={styles.card}>
                            <Text>Photo</Text>
                            <Text style={styles.price}>{photo} $</Text>
                        </View>

                        <View style={styles.card}>
                            <Text>Video</Text>
                            <Text style={styles.price}>{video} $</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={this.navigation}>
                        <Text style={styles.note}>Want discount in pricing,</Text>
                        <Text style={styles.note2}> Become a member</Text>
                    </TouchableOpacity>

                    <Text></Text>
                    {!isBooked && (<Button onPress={this.onBookingPress} disabled={isDisable} style={styles.btn}>Book 25$</Button>)}
                    {/* <Button onPress={this.onBookAllPress} disabled={isDisable} status='warning' style={styles.btn}>Pay all {total}$</Button> */}

                    <View style={styles.terms}>
                        <CheckBox
                            status='info'
                            style={styles.checkbox}
                            checked={checked}
                            onChange={this.onCheckedChange}
                        />
                        {this.renderTerm()}
                    </View>

                    <Modal
                        transparent={true}
                        style={styles.modalContainer}
                        visible={this.state.isDate}>
                        <TouchableOpacity onPress={() => this.setState({ isDate: false })} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ width: width - 50, backgroundColor: 'white'  }}>
                                <Calendar onSelect={this.onSelect} />
                            </View>
                        </TouchableOpacity>

                    </Modal>

                </ScrollView>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        flex: 1,
        padding: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    txtBook: {
        fontSize: 17,
        fontWeight: '600'
    },
    input: {
        width: width - 50,
        marginVertical: 14
    },
    card: {
        marginVertical: 20,
        backgroundColor: '#FFF',
        height: 90,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10
    },
    note: {
        textAlign: 'center',
        fontSize: 13,
        color: '#666'
    },
    note2: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: '#005ff6',
        fontSize: 14,
        fontWeight: '500'
    },
    btn1: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    btn: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    terms: {
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 50, flexDirection: 'row'
    },
    term: {
        fontSize: 14,
        color: '#666',
        marginLeft: 10
    },
    term1: {
        textDecorationLine: 'underline',
        color: '#005ff6',
        fontSize: 14
    },
    btnAuto: {
        height: 45,
        marginVertical: 14
    }
})

export default index;
