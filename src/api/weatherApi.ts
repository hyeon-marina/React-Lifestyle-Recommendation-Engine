import { mockWeatherData } from '../data/mockWeatherData';

export interface RawWeatherApiResponse {
    main: {
        temp: number;
        feels_like: number;
    };
    weather: {
        main: string;
    }[];
    rain?: {
        probability?: number;
    };
    airQuality?: {
        pm10: number;
    };
}

interface OpenWeatherMapResponse {
    main: {
        temp: number;
        feels_like: number;
    };
    weather: {
        main: string;
    }[];
    rain?: {
        '1h'?: number;
        '3h'?: number;
    };
}

const OPEN_WEATHER_API_BASE_URL =
    'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherData(): Promise<RawWeatherApiResponse> {
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

    if (!apiKey) {
        return mockWeatherData;
    }

    try {
        const queryParams = new URLSearchParams({
            q: 'Seoul',
            appid: apiKey,
            units: 'metric',
        });

        const response = await fetch(
            `${OPEN_WEATHER_API_BASE_URL}?${queryParams.toString()}`,
        );

        if (!response.ok) {
            console.warn(
                `OpenWeatherMap API 요청 실패: ${response.status}. Mock 데이터를 사용합니다.`,
            );

            return mockWeatherData;
        }

        const data = (await response.json()) as OpenWeatherMapResponse;

        return {
            main: {
                temp: data.main.temp,
                feels_like: data.main.feels_like,
            },
            weather: data.weather,
            rain: {
                probability: estimatePrecipitationProbability(data),
            },
            airQuality: {
                pm10: 90,
            },
        };
    } catch (error) {
        console.warn(
            'OpenWeatherMap API 호출 중 오류가 발생했습니다. Mock 데이터를 사용합니다.',
            error,
        );

        return mockWeatherData;
    }
}

function estimatePrecipitationProbability(
    data: OpenWeatherMapResponse,
): number {
    const hasRainWeather = data.weather.some(
        (weather) => weather.main.toLowerCase() === 'rain',
    );

    if (hasRainWeather) {
        return 70;
    }

    if (data.rain?.['1h'] !== undefined || data.rain?.['3h'] !== undefined) {
        return 70;
    }

    return 0;
}