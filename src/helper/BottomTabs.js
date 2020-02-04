import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from 'react-native-ui-kitten';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { View } from 'react-native';

// Screens
import Events from '../Events';
import Beats from '../Beats';
import Profile from '../Profile';
import { SafeAreaView } from 'react-native';

export const BottomNavigationShowcase = (props) => {

  const onTabSelect = (selectedIndex) => {
    const { [selectedIndex]: selectedRoute } = props.navigation.state.routes;
    props.navigation.navigate(selectedRoute.routeName);
  };

  const EventIcon = (style) => (
    <Icon {...style} name='layout' />
  );

  const BeatIcon = (style) => (
    <Icon {...style} name='music' />
  );

  const ProfileIcon = (style) => (
    <Icon {...style} name='person' />
  );

  return (
      <SafeAreaView style={{ backgroundColor: '#FFF' }}>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={props.navigation.state.index}
        onSelect={onTabSelect}>
        <BottomNavigationTab title='Events' icon={EventIcon} />
        <BottomNavigationTab title='Beats' icon={BeatIcon} />
        <BottomNavigationTab title='Profile' icon={ProfileIcon} />
      </BottomNavigation>
      </SafeAreaView>

  );
}

export const BottomTabNavigator = createBottomTabNavigator({
  Event: Events,
  Beats: Beats,
  Profile: Profile,
}, {
  initialRouteName: 'Event',
  tabBarComponent: BottomNavigationShowcase,
});