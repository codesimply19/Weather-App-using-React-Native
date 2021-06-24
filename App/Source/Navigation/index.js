import React , { useState, useEffect }  from 'react';
import { StyleSheet, View, SafeAreaProvider } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import ErrorScreen from '../ErrorScreen/index';
import WeatherDetailScreen from '../Screens/WeatherDetailScreen';
import LottieView from 'lottie-react-native';
import RNLocation from 'react-native-location';
import { bindActionCreators } from 'redux';
import * as WeatherDetailActions from '../Screens/WeatherDetailAction';

const AppStack = createStackNavigator();

const header = () => {
  return null;
};

const AppRoute = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name={'WeatherDetailScreen'} component={ WeatherDetailScreen } options={{ header: header }} />
      <AppStack.Screen name={'ErrorScreen'} component={ErrorScreen} options={{ header: header }} />
    </AppStack.Navigator>
  );
};

const AppNavigator = (props) => {
 const[isLoader,setLoader] = useState(true);
 const[location,setLocation] = useState(true);

 useEffect (() => {
    RNLocation.configure({
        distanceFilter: 5.0,
      });
      RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: "coarse",
        },
      }).then(granted => {
        if (granted) {
          startUpdatingLocation();
        }
      });
 },[]);

 const startUpdatingLocation = () => {
    locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
         setLocation(locations[0]);
        props.weatherDetailActions.getLocation(locations[0]);
        setTimeout(() => {
            setLoader(false);
        }, 3000);
      }
    );
  };

if(isLoader){
    return (
        <View style={styles.activityIndicatorView}>
          <LottieView
            source={require('../../Assets/Lottie//6883-loader.json')}
            autoPlay
            loop
          />
        </View>
      );
}
else
{
    return <NavigationContainer>{AppRoute()}</NavigationContainer>;
    }
}

const styles = StyleSheet.create({
    activityIndicatorView: {
      flex: 1,
    },
    activityIndicator: {
      flex: 1,
    },
  });

const mapStateToProps = state => {
  return {
    weatherInfo: state.WeatherDetailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    weatherDetailActions: bindActionCreators({ ...WeatherDetailActions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);