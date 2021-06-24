

import React from 'react';
import {Provider} from 'react-redux';
import store from './App/Source/Redux/Store/index';
import AppNavigator from './App/Source/Navigation/index';
import {StyleSheet, StatusBar, View} from 'react-native';
console.disableYellowBox = true;


const App = () => {

	return (
    <Provider store={store}>
    <View style={styles.container}>
    <StatusBar />
    <AppNavigator/>
    </View>
  </Provider>
	);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

export default App;