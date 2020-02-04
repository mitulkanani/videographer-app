/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import * as React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
} from 'react-native-ui-kitten';
import {
  mapping, light, dark
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createAppContainer } from 'react-navigation';

// Relative paths
import mainNavigator from './Router';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

const AppNavigation = createAppContainer(mainNavigator);

const themes = { light, dark };

const App = () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={themes[theme]}>
        <AppNavigation />
      </ApplicationProvider>
    </React.Fragment>
  );
};


export default App;
