import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

class GoogleService {
    constructor() {
        GoogleSignin.configure();
    }

    async handleGoogleLogin() {
        const loggedInUser = await GoogleSignin.signIn();
        return new Promise((resolve, reject) => {
            resolve(loggedInUser)
        });
    }

    handleGoogleLogout = async () => {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    }

    getGooglePlayServices = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });
            // google services are available
        } catch (err) {
            console.log('play services are not available');
            
        }
    };

    handleSignInError = async error => {
        if (error.code) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                this.showSignInError('Sign in is in progress.');
                console.log('Sign in is in progress.'); 
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                await this.getGooglePlayServices();
            } else {
                console.log(JSON.stringify(error));
            }
        } else {
            console.log(JSON.stringify(error));
        }
    };

}

export const googleService = new GoogleService()