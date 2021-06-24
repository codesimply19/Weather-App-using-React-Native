import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as WeatherDetailActions from './WeatherDetailAction';
import {FlatList} from 'react-native-gesture-handler';
import ForecastList from '../Components/ForeCastList';
import ErrorScreen from '../ErrorScreen/index';
import moment from 'moment';

const height = Dimensions.get('window').height;

const WeatherDetailScreen = props => {
  const [temperature, setTemp] = useState(0);

  useEffect(() => {
    const {location} = props.weatherInfo;
    const {latitude, longitude} = location;
    console.log(location,'fewefx')
    props.weatherDetailActions.getWeatherDetails(latitude, longitude);
  }, []);

  useEffect(() => {
    const {error, data, success} = props.weatherInfo;
    const { temp } = data;
    if (success) {
      setTemp(temp);
    }
    if (error) {
      setErrMsg('Something went wrong at our end');
    }
  }, [temperature, error]);

  const convertDate = (item, num) => {
    if (num === 1) {
      return moment.unix(item).format('DD MMM');
    } else {
      return moment.unix(item).format('dddd');
    }
  };

  const renderItem = ({item}) => {
    return <ForecastList day={convertDate(item.dt, 2)} temp={item.temp.day} />;
  };

  const {error, loader, data} = props.weatherInfo;
  const {daily, current, timezone} = data;
  const date = current ? current.dt : '';
  const weather = daily?.filter((value, index) => index < 5);
  return error ? (
    <View style={{flex: 1}}>
      <ErrorScreen />
    </View>
  ) : !loader ? (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Assets/Images/manoj-malshan-ZwhhjhJkMQc-unsplash.jpg')}
        style={styles.imageStyle}
      />
      <View style={styles.mainView}>
        <Text style={styles.tempText}>{`${current?.temp}°C`}</Text>
        <Text style={styles.cityText}>{timezone}</Text>
        <Text style={styles.dateText}>{convertDate(date, 1)}</Text>
      </View>
      <View style={styles.listView}>
        <FlatList
          data={weather}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'stretch',
    height: height,
  },
  listView: {
    marginTop: 150,
    marginBottom: 30,
  },
  mainView: {
    marginTop: 120,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  cityText: {
    fontSize: 22,
    color: 'indigo',
    marginTop: 40,
  },
  dateText: {
    fontSize: 30,
    color: 'brown',
    marginTop: 80,
  },
  tempText: {
    fontSize: 80,
    fontFamily: 'Cochin',
    color: 'darkslateblue',
    marginTop: 80,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeatherDetailScreen);
