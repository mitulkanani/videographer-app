import FBSDK from 'react-native-fbsdk'

const { GraphRequest, GraphRequestManager, LoginManager, AccessToken } = FBSDK

class FacebookService {
    constructor() {
        this.requestManager = new GraphRequestManager()
    }

    async handleFacebookLogin() {
        return new Promise((resolve, reject) => {
            LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends'])
            .then((result) => {
                if (result.isCancelled) {
                    reject('Login Cancel');
                    console.log('Login cancel');
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        let accessToken = data.accessToken
                        const responseInfoCallback = (error, results) => {
                            if (error) {
                              reject(error)
                              alert('Error fetching data: ' + error.toString());
                            } else {
                                resolve(results);                            }
                            }
                          const infoRequest = new GraphRequest(
                            '/me',
                            {
                              accessToken: accessToken,
                                parameters: {
                                  fields: {
                                  string: 'email,name,first_name,last_name,picture'
                                  }
                                }
                            },
                            responseInfoCallback,
                          );
                          new GraphRequestManager().addRequest(infoRequest).start()
                    })
                }
            },
                (error) => {
                    reject('Login fail with error: ' + error);
                    console.log('Login fail with error: ' + error);
                }
            )
        });
    }

    handleFaceBookLogout() {
     LoginManager.logOut();
    }

    async fetchProfile(callback) {
        return new Promise((resolve, reject) => {
            const request = new GraphRequest(
                '/me',
                null,
                (error, result) => {
                    if (result) {
                        const profile = result
                        profile.avatar = `https://graph.facebook.com/${result.id}/picture?width={200}&height={200}`
                        resolve(profile)
                    } else {
                        reject(error)
                    }
                }
            )
            this.requestManager.addRequest(request).start()
        })
    }
}

export const facebookService = new FacebookService()