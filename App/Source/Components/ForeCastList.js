import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ForecastList = props => {
  return (
    <View style={styles.dataView}>
      <Text style={styles.dayStyle}>{props.day}</Text>
      <Text style={styles.tempStyle}>{`${props.temp}°C`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dataView: {
    height: 60,
    alignContent: 'center',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'yellow',
  },
  dayStyle: {
    fontSize: 30,
    color: 'sandybrown',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  tempStyle: {
    fontSize: 30,
    color: 'sandybrown',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    marginRight: 20,
    marginTop: 10,
  },
});

export default ForecastList;
