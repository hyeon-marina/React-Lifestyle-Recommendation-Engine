import { describe, expect, it } from 'vitest';
import { recommendClothing } from '../clothingRules';
import type { WeatherData } from '../../types/weather';

function createWeatherData(overrides: Partial<WeatherData> = {}): WeatherData {
    return {
        temperature: 5,
        feelsLike: 5,
        precipitationProbability: 0,
        condition: 'CLEAR',
        airQualityGrade: 'GOOD',
        ...overrides,
    };
}

describe('recommendClothing', () => {
    it('체감온도가 0도 이하이면 방한용품 준비를 WARNING으로 추천한다', () => {
        const weather = createWeatherData({
            feelsLike: -3,
        });

        const result = recommendClothing(weather);

        expect(result).toEqual({
            title: '옷차림 추천',
            message:
                '체감온도가 매우 낮습니다. 패딩, 목도리, 장갑 등 방한용품을 준비하는 것이 좋습니다.',
            level: 'WARNING',
        });
    });

    it('체감온도가 8도 이하이면 두꺼운 외투를 CAUTION으로 추천한다', () => {
        const weather = createWeatherData({
            feelsLike: 8,
        });

        const result = recommendClothing(weather);

        expect(result).toEqual({
            title: '옷차림 추천',
            message: '쌀쌀한 날씨입니다. 두꺼운 외투나 코트를 추천합니다.',
            level: 'CAUTION',
        });
    });

    it('체감온도가 16도 이하이면 가벼운 외투를 INFO로 추천한다', () => {
        const weather = createWeatherData({
            feelsLike: 16,
        });

        const result = recommendClothing(weather);

        expect(result).toEqual({
            title: '옷차림 추천',
            message: '가벼운 외투나 니트를 입기 적절한 날씨입니다.',
            level: 'INFO',
        });
    });

    it('체감온도가 23도 이하이면 긴팔이나 얇은 겉옷을 INFO로 추천한다', () => {
        const weather = createWeatherData({
            feelsLike: 23,
        });

        const result = recommendClothing(weather);

        expect(result).toEqual({
            title: '옷차림 추천',
            message: '긴팔이나 얇은 겉옷 정도면 충분한 날씨입니다.',
            level: 'INFO',
        });
    });

    it('체감온도가 23도를 초과하면 얇은 옷차림을 INFO로 추천한다', () => {
        const weather = createWeatherData({
            feelsLike: 28,
        });

        const result = recommendClothing(weather);

        expect(result).toEqual({
            title: '옷차림 추천',
            message: '더운 날씨입니다. 반팔이나 얇은 옷차림을 추천합니다.',
            level: 'INFO',
        });
    });
});