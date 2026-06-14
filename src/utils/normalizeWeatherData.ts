import type { RawWeatherApiResponse } from '../api/weatherApi';
import type {
    AirQualityGrade,
    WeatherCondition,
    WeatherData,
} from '../types/weather';

function normalizeCondition(condition: string): WeatherCondition {
    switch (condition.toLowerCase()) {
        case 'clear':
            return 'CLEAR';
        case 'clouds':
            return 'CLOUDS';
        case 'rain':
            return 'RAIN';
        case 'snow':
            return 'SNOW';
        default:
            return 'UNKNOWN';
    }
}

function getAirQualityGrade(pm10?: number): AirQualityGrade {
    if (pm10 === undefined) {
        return 'UNKNOWN';
    }

    if (pm10 <= 30) {
        return 'GOOD';
    }

    if (pm10 <= 80) {
        return 'NORMAL';
    }

    if (pm10 <= 150) {
        return 'BAD';
    }

    return 'VERY_BAD';
}

export function normalizeWeatherData(raw: RawWeatherApiResponse): WeatherData {
    return {
        temperature: raw.main.temp,
        feelsLike: raw.main.feels_like,
        precipitationProbability: raw.rain?.probability ?? 0,
        condition: normalizeCondition(raw.weather[0]?.main ?? ''),
        airQualityGrade: getAirQualityGrade(raw.airQuality?.pm10),
    };
}