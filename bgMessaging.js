// @flow
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    // handle your message
    console.log(message);
    return Promise.resolve(message);
}
