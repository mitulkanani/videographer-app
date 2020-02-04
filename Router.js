import { createStackNavigator } from 'react-navigation-stack';

// Pages
import Login from './src/Auth/Login';
import Register from './src/Auth/Register';
import Forget from './src/Auth/ForgetPassword'

import MemberChart from './src/MemberChart';
import Purchase from './src/Purchase';
import Booking from './src/Booking';
import EventDetail from './src/Events/EventDetail';

import { DrawerNavigator } from './src/helper/Drawer';

const mainNavigator = createStackNavigator(
    {
      Dashboard: { screen: DrawerNavigator },
      MemberChart: { screen: MemberChart },
      Login: { screen: Login },
      Register: { screen: Register },
      Forget: { screen: Forget},
      Purchase: { screen: Purchase},
      Booking: { screen: Booking},
      EventDetail: { screen: EventDetail}
    },
    {
      initialRouteName: 'Dashboard',
      headerMode: 'none',
      navigationOptions: {
        header: false,
      },
    });

export default mainNavigator;    