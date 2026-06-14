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

export async function fetchWeatherData(): Promise<RawWeatherApiResponse> {
    return {
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
}