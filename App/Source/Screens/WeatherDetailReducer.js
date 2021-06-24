import * as ActionTypes from './ActionTypes';

const initialState = {
  data: '',
  success: false,
  loader: false,
  error: false,
  errorCode: '',
  location: '',
};

const WeatherDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_WEATHER_SUCCESS:
      return {
        ...state,
        success: true,
        loader: false,
        error: false,
        errorCode: '',
        data: action.payload,
      };
    case ActionTypes.GET_WEATHER_LOADER:
      return {
        ...state,
        loader: true,
        error: false,
        errorCode: '',
        success: false,
      };
    case ActionTypes.GET_WEATHER_FAILURE:
      return {
        ...state,
        error: true,
        errorCode: action.payload,
        success: false,
        loader: false,
      };
    case ActionTypes.GET_LOCATION_SUCCESS:
      return {
        ...state,
        success: true,
        loader: false,
        error: false,
        errorCode: '',
        location: action.payload,
      };
    case ActionTypes.GET_LOCATION_FAILURE:
      return {
        ...state,
        error: true,
        errorCode: action.payload,
        success: false,
        loader: false,
      };
    default:
      return state;
  }
};

export default WeatherDetailReducer;
