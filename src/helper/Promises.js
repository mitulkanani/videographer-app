import AsyncStorage from '@react-native-community/async-storage';

export default class Promises {

    static async setUserToken(val) {
        await AsyncStorage.setItem('kilo_token', val)
    }

    static async storeUserData(val) {
        await AsyncStorage.setItem('kilo_user', val)
    }

    static async getUserToken() {
        const value = await AsyncStorage.getItem('kilo_token');
        return value;
    }

    static async getUserData() {
        const value = await AsyncStorage.getItem('kilo_user');
        return value;
    }
}