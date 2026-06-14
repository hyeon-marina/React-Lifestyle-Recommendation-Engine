import { describe, expect, it } from 'vitest';
import type { RawWeatherApiResponse } from '../../api/weatherApi';
import { normalizeWeatherData } from '../normalizeWeatherData';

describe('normalizeWeatherData', () => {
    it('Raw Weather API 응답을 서비스 내부 WeatherData 모델로 변환한다', () => {
        const raw: RawWeatherApiResponse = {
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

        const result = normalizeWeatherData(raw);

        expect(result).toEqual({
            temperature: 5,
            feelsLike: 2,
            precipitationProbability: 70,
            condition: 'RAIN',
            airQualityGrade: 'BAD',
        });
    });

    it('날씨 상태가 Clear이면 CLEAR로 정규화한다', () => {
        const raw = createRawWeatherData({
            condition: 'Clear',
        });

        const result = normalizeWeatherData(raw);

        expect(result.condition).toBe('CLEAR');
    });

    it('날씨 상태가 Clouds이면 CLOUDS로 정규화한다', () => {
        const raw = createRawWeatherData({
            condition: 'Clouds',
        });

        const result = normalizeWeatherData(raw);

        expect(result.condition).toBe('CLOUDS');
    });

    it('날씨 상태가 Snow이면 SNOW로 정규화한다', () => {
        const raw = createRawWeatherData({
            condition: 'Snow',
        });

        const result = normalizeWeatherData(raw);

        expect(result.condition).toBe('SNOW');
    });

    it('알 수 없는 날씨 상태이면 UNKNOWN으로 정규화한다', () => {
        const raw = createRawWeatherData({
            condition: 'Mist',
        });

        const result = normalizeWeatherData(raw);

        expect(result.condition).toBe('UNKNOWN');
    });

    it('weather 배열이 비어 있으면 날씨 상태를 UNKNOWN으로 정규화한다', () => {
        const raw: RawWeatherApiResponse = {
            main: {
                temp: 10,
                feels_like: 8,
            },
            weather: [],
            rain: {
                probability: 0,
            },
            airQuality: {
                pm10: 20,
            },
        };

        const result = normalizeWeatherData(raw);

        expect(result.condition).toBe('UNKNOWN');
    });

    it('rain 정보가 없으면 강수 확률을 0으로 정규화한다', () => {
        const raw: RawWeatherApiResponse = {
            main: {
                temp: 10,
                feels_like: 8,
            },
            weather: [
                {
                    main: 'Clear',
                },
            ],
            airQuality: {
                pm10: 20,
            },
        };

        const result = normalizeWeatherData(raw);

        expect(result.precipitationProbability).toBe(0);
    });

    it('rain.probability 정보가 없으면 강수 확률을 0으로 정규화한다', () => {
        const raw: RawWeatherApiResponse = {
            main: {
                temp: 10,
                feels_like: 8,
            },
            weather: [
                {
                    main: 'Clear',
                },
            ],
            rain: {},
            airQuality: {
                pm10: 20,
            },
        };

        const result = normalizeWeatherData(raw);

        expect(result.precipitationProbability).toBe(0);
    });

    it('미세먼지 수치가 30 이하이면 GOOD으로 정규화한다', () => {
        const raw = createRawWeatherData({
            pm10: 30,
        });

        const result = normalizeWeatherData(raw);

        expect(result.airQualityGrade).toBe('GOOD');
    });

    it('미세먼지 수치가 80 이하이면 NORMAL로 정규화한다', () => {
        const raw = createRawWeatherData({
            pm10: 80,
        });

        const result = normalizeWeatherData(raw);

        expect(result.airQualityGrade).toBe('NORMAL');
    });

    it('미세먼지 수치가 150 이하이면 BAD로 정규화한다', () => {
        const raw = createRawWeatherData({
            pm10: 150,
        });

        const result = normalizeWeatherData(raw);

        expect(result.airQualityGrade).toBe('BAD');
    });

    it('미세먼지 수치가 150을 초과하면 VERY_BAD로 정규화한다', () => {
        const raw = createRawWeatherData({
            pm10: 151,
        });

        const result = normalizeWeatherData(raw);

        expect(result.airQualityGrade).toBe('VERY_BAD');
    });

    it('airQuality 정보가 없으면 UNKNOWN으로 정규화한다', () => {
        const raw: RawWeatherApiResponse = {
            main: {
                temp: 10,
                feels_like: 8,
            },
            weather: [
                {
                    main: 'Clear',
                },
            ],
            rain: {
                probability: 0,
            },
        };

        const result = normalizeWeatherData(raw);

        expect(result.airQualityGrade).toBe('UNKNOWN');
    });
});

function createRawWeatherData({
                                  temperature = 10,
                                  feelsLike = 8,
                                  condition = 'Clear',
                                  precipitationProbability = 0,
                                  pm10 = 20,
                              }: {
    temperature?: number;
    feelsLike?: number;
    condition?: string;
    precipitationProbability?: number;
    pm10?: number;
} = {}): RawWeatherApiResponse {
    return {
        main: {
            temp: temperature,
            feels_like: feelsLike,
        },
        weather: [
            {
                main: condition,
            },
        ],
        rain: {
            probability: precipitationProbability,
        },
        airQuality: {
            pm10,
        },
    };
}