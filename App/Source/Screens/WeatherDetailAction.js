import * as ActionTypes from './ActionTypes';
import {weatherApiKey} from '../Constants/index';
import {create} from 'apisauce';

export const getWeatherDetails = (latitude, longitude) => {
  return async dispatch => {
    dispatch({type: ActionTypes.GET_WEATHER_LOADER, payload: ''});
    const lat = latitude;
    const lon = longitude;
    const api = create({
      baseURL: 'https://api.openweathermap.org',
    });
    //  API  CALL
    api
      .get(
        `/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${weatherApiKey}`,
      )
      .then(response => {
        if (response.ok) {
          dispatch({
            type: ActionTypes.GET_WEATHER_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({type: ActionTypes.GET_WEATHER_FAILURE, payload: 'error'});
        }
      })
      .then();
  };
};

export const getLocation = value => {
  return dispatch => {
    if (value) {
      dispatch({type: ActionTypes.GET_LOCATION_SUCCESS, payload: value});
    } else {
      dispatch({type: ActionTypes.GET_LOCATION_FAILURE, payload: 'error'});
    }
  };
};
