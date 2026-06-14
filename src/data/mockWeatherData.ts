import type { RawWeatherApiResponse } from '../api/weatherApi';

export const mockWeatherData: RawWeatherApiResponse = {
    main: {
        temp: 5,
        feels_like: 2,
    },
    weather: [
        {
            main: 'Rain',
        },
    ],
    rain: {
        probability: 70,
    },
    airQuality: {
        pm10: 90,
    },
};