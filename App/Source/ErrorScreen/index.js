import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as WeatherDetailActions from '../Screens/WeatherDetailAction';

const ErrorScreen = props => {
  const retry = () => {
    const {location} = props.weatherInfo;
    const {latitude, longitude} = location;
    props.weatherDetailActions.getWeatherDetails(latitude, longitude);
  };
  return (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>Something Went Wrong at our end</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={retry}>
          <Text style={styles.retry}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'wheat',
  },
  header: {
    marginTop: 50,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 3,
  },
  retry: {
    fontSize: 20,
    color: 'black',
    fontStyle: 'italic',
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    marginLeft: 2,
    padding: 10,
  },
  errorText: {
    fontSize: 40,
    color: 'red',
    fontWeight: '500',
    marginTop: 100,
    alignSelf: 'center',
  },
});
const mapStateToProps = state => {
  return {
    weatherInfo: state.WeatherDetailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    weatherDetailActions: bindActionCreators(
      {...WeatherDetailActions},
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorScreen);
