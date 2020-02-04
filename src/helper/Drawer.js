import React from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Drawer, Icon, DrawerHeaderFooter } from 'react-native-ui-kitten';

// Firebase
import firebase from 'react-native-firebase';
import { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';

// Screens
import Contact from '../Contact';
import About from '../About';
import { BottomTabNavigator } from './BottomTabs';
import Promises from './Promises';
import axios from 'axios';

const OS = Platform.OS;

class DrawerNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.drawerData = props.items.map(this.createDrawerItem);
  }

  componentDidMount = async () => {
    const token = await Promises.getUserToken();
    console.log(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    this.requestFirebase();
    this.getNotification();
  }

  requestFirebase = () => {
    firebase.messaging().hasPermission().then((enabled) => {
      if (enabled) {
        // user has permissions
        this.getTokens();
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh((fcmTokens) => {
          global.fcmToken = fcmTokens;
          axios.post(`${host}fcm_update`, { fcm_token: fcmTokens, device_type: OS })
        });
      } else {
        try {
          firebase.messaging().requestPermission().then(() => {
            this.getTokens();
          });
        } catch (error) {
          // User has rejected permissions
        }
      }
    });
  }

  getNotification = () => {
    // Handle notification
    this.messageListeners = firebase.messaging().onMessage((message: RemoteMessage) => {
      console.log(message);

      const newNotification = new firebase.notifications.Notification()
        .android.setChannelId('test-channel')
        .setNotificationId(message.messageId)
        .setTitle(message.data.title)
        .setBody(message.data.body)
        .setSound('default')
        .setData(message.data)
        .android.setAutoCancel(true)
        .android.setCategory(firebase.notifications.Android.Category.Alarm);

      // Build a channel
      const channel = new firebase.notifications.Android.Channel('test-channel', 'test', firebase.notifications.Android.Importance.Max)
        .setDescription('Hello');

      // Create the channel
      firebase.notifications().android.createChannel(channel);
      firebase.notifications().displayNotification(newNotification);
    });

    firebase.notifications().onNotification(notification => {
      console.log(notification);

      const newNotification = new firebase.notifications.Notification()
        .android.setChannelId('test-channel')
        .android.setSmallIcon('ic_notification')
        .setNotificationId(notification.notificationId)
        .setTitle(notification.data.title)
        .setBody(notification.data.body)
        .setSound('default')
        .setData(notification.data)
        .android.setAutoCancel(true)
        .android.setCategory(firebase.notifications.Android.Category.Alarm);

      // Build a channel
      const channel = new firebase.notifications.Android.Channel('test-channel', 'test', firebase.notifications.Android.Importance.Max)
        .setDescription('Hello');

      // Create the channel
      firebase.notifications().android.createChannel(channel);
      firebase.notifications().displayNotification(newNotification);
    });
  }

  async getTokens() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      global.fcmToken = fcmToken;
    }
  }

  onRouteSelect = (index) => {
    const { [index]: route } = this.drawerData;
    this.props.navigation.navigate(route.title);
  };

  createDrawerItem = ({ routeName }) => ({
    title: routeName,
  });

  ProfileHeader = (props) => (
    <DrawerHeaderFooter title='John Doe' description='Platinum Member' />
  );

  ProfileIcon = (style) => (
    <Icon {...style} name='color-palette-outline' />
  );

  // FooterHeader = (props) => (
  //   <DrawerHeaderFooter title='Developed by' description='www.pixeldart.com' icon={this.ProfileIcon} />
  // );

  render() {
    return (
      <SafeAreaView>
        <Drawer data={this.drawerData} onSelect={this.onRouteSelect} header={this.ProfileHeader} />
      </SafeAreaView>
    );
  }
}

export const DrawerNavigator = createDrawerNavigator({
  Dashboard: BottomTabNavigator,
  Contact: Contact,
  About: About,
}, {
  contentComponent: DrawerNavigation,
});