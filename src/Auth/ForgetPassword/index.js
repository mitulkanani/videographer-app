import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native'
import { Layout, Input, Button, Text } from 'react-native-ui-kitten'

// Device Size
const { width, height } = Dimensions.get('screen');

// Images
import { Splash, ArrowRight } from '../../helper/Constants';

// Icons


class index extends Component {

    state = {
        emailValue: '',
        passwordValue: '',
        secureTextEntry: true,
    };

    onInputEmailChange = (value) => {
        this.setState({ emailValue: value });
    };

    renderInputs = () => (
        <View style={{ flex: 4, justifyContent: 'center' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 30 }}>
                <Text style={styles.txtLogin}>Forget password</Text>
                <Text style={styles.txtSignup} onPress={() => this.props.navigation.navigate('Login')}>
                    Login {ArrowRight}
                </Text>
            </View>    

            <Input
                placeholder='Email'
                value={this.state.emailValue}
                onChangeText={this.onInputEmailChange}
            />
            
            <Button 
                style={{ marginVertical: 15 }}
                onPress={() => this.gotoDashBoard()}
            >
                Submit
            </Button>
        </View>
    );

    render() {
        return (
            <Layout style={styles.container}>
                <ImageBackground source={Splash} style={styles.background}>
                    {this.renderInputs()}
                </ImageBackground>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: width,
        height: height,
        justifyContent: 'center',
        padding: 40
    },
    txtLogin: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600'
    },
    txtSignup: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600'
    },

});

export default index;