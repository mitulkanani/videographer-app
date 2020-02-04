import React, { Component } from 'react'
import { ImageBackground, StyleSheet, Dimensions, View, Alert, Linking, TouchableOpacity, Platform } from 'react-native'
import { Layout, Input, Icon, Button, Text } from 'react-native-ui-kitten'

import { StackActions, NavigationActions } from 'react-navigation';

// Device Size
const { width, height } = Dimensions.get('screen');

// Images
import { Splash, Facebook, Google, ArrowRight, host } from '../../helper/Constants';
import Axios from 'axios';

import Promises from '../../helper/Promises';
import { facebookService } from '../../helper/FacebookService';
import { googleService } from '../../helper/GoogleService';
// Icons

const url = 'http://kilovision.localhost/wp-login.php?action=lostpassword';

const OS = Platform.OS;

class index extends Component {

    state = {
        emailValue: '',
        passwordValue: '',
        secureTextEntry: true,
    };

    onInputEmailChange = (value) => {
        this.setState({ emailValue: value });
    };

    onInputPasswordChange = (value) => {
        this.setState({ passwordValue: value });
    };

    onIconPress = () => {
        const secureTextEntry = !this.state.secureTextEntry;
        this.setState({ secureTextEntry });
    };

    onForget = () => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            } else {
              Alert.alert('This url cannot be open');
            }
          });
    }

    onFacebookLogin = () => {
        facebookService.handleFacebookLogin()
        .then((result) => {
                console.log(result)
                const { email, name, id, picture } = result;  
                const { url } = picture.data;
                const param = { email, name, avatar: url, social_id: id,
                     login_type: 'facebook', fcm_token: global.fcmToken, device_type: OS};
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                  }; 
                Axios.post(`${host}social_login`, param, axiosConfig)
                .then((result) => {
                    console.log(result);
                    const { message, success, token } = result.data;
                    if (success) {
                        Promises.setUserToken(token);
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    } else {
                        Alert.alert(message);
                    }
                }).catch((e) => {
                    console.log(e);
                })
        }).catch((e) => {
            console.log(e);
        })
    }

    onGoogleLogin = () => {
        googleService.handleGoogleLogin()
        .then((result) => {
                console.log(result);
                
                const { email, name, id, photo } = result.user;  
                const param = { email, name, avatar: photo, social_id: id,
                     login_type: 'google', fcm_token: global.fcmToken, device_type: OS};
                Axios.post(`${host}social_login`, param)
                .then((result) => {
                    console.log(result);
                    const { message, success, token } = result.data;
                    if (success) {
                        Promises.setUserToken(token);
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                        });
                        this.props.navigation.dispatch(resetAction);
                    } else {
                        Alert.alert(message);
                    }
                }).catch((e) => {
                    console.log(e);
                })
        }).catch((e) => {
            console.log(e)
        })
    }

    gotoDashBoard = () => {
        const { emailValue, passwordValue } = this.state;
        const param = { email:emailValue, password:passwordValue, fcm_token: global.fcmToken, device_type: OS }
        Axios.post(`${host}login`, param)
        .then((result) => {
            console.log(result);
            const { message, success, token } = result.data;
            if (success) {
                Promises.setUserToken(token);
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                Alert.alert(message);
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    renderIcon = (style) => {
        const iconName = this.state.secureTextEntry ? 'eye' : 'eye-off';
        return (
            <Icon {...style} name={iconName} />
        );
    };

    renderInputs = () => (
        <View style={{ flex: 4, justifyContent: 'center' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 30 }}>
                <Text style={styles.txtLogin}>Login</Text>
                <Text style={styles.txtSignup} onPress={() => this.props.navigation.navigate('Register')}>
                    Sign up {ArrowRight}
                </Text>
            </View>

            <Input
                autoCapitalize="none"
                placeholder='Email'
                value={this.state.emailValue}
                onChangeText={this.onInputEmailChange}
            />
            <Input
                style={{ marginVertical: 15 }}
                placeholder='Password'
                value={this.state.passwordValue}
                icon={this.renderIcon}
                secureTextEntry={this.state.secureTextEntry}
                onIconPress={this.onIconPress}
                onChangeText={this.onInputPasswordChange}
            />

            <Button
                style={{ marginVertical: 15 }}
                onPress={() => this.gotoDashBoard()}
            >
                Login
            </Button>
            <Text
                style={{ textAlign: 'right', fontWeight: '600', color: '#FFF' }}
                onPress={this.onForget}
            >
                Forget Password?</Text>
        </View>
    );

    renderSocial = () => (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.txtSocial}>Login with social account</Text>
            <View style={styles.iconsView}>
                <TouchableOpacity onPress={this.onGoogleLogin}>
                    {Google}
                </TouchableOpacity>

                <View style={{ width: 70 }} />

                <TouchableOpacity onPress={this.onFacebookLogin}>
                {Facebook}
                </TouchableOpacity>
            </View>
        </View>
    )

    render() {
        return (
            <Layout style={styles.container}>
                <ImageBackground source={Splash} style={styles.background}>
                    {this.renderInputs()}
                    {this.renderSocial()}
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
    txtSocial: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF'
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

    iconsView: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default index;