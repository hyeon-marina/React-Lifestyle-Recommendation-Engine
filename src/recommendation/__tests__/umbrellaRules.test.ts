import { describe, expect, it } from 'vitest';
import { recommendUmbrella } from '../umbrellaRules';
import type { WeatherData } from '../../types/weather';

function createWeatherData(overrides: Partial<WeatherData> = {}): WeatherData {
    return {
        temperature: 20,
        feelsLike: 20,
        precipitationProbability: 0,
        condition: 'CLEAR',
        airQualityGrade: 'GOOD',
        ...overrides,
    };
}

describe('recommendUmbrella', () => {
    it('현재 날씨 상태가 RAIN이면 강수 확률과 관계없이 우산을 WARNING으로 추천한다', () => {
        const weather = createWeatherData({
            condition: 'RAIN',
            precipitationProbability: 10,
        });

        const result = recommendUmbrella(weather);

        expect(result).toEqual({
            title: '준비물 추천',
            message: '현재 비 예보가 있습니다. 외출 시 우산을 챙기는 것이 좋습니다.',
            level: 'WARNING',
        });
    });

    it('강수 확률이 70% 이상이면 우산을 WARNING으로 추천한다', () => {
        const weather = createWeatherData({
            condition: 'CLOUDS',
            precipitationProbability: 70,
        });

        const result = recommendUmbrella(weather);

        expect(result).toEqual({
            title: '준비물 추천',
            message: '강수 확률이 높습니다. 우산을 챙기는 것을 추천합니다.',
            level: 'WARNING',
        });
    });

    it('강수 확률이 40% 이상 70% 미만이면 장시간 외출 시 우산 준비를 CAUTION으로 추천한다', () => {
        const weather = createWeatherData({
            condition: 'CLOUDS',
            precipitationProbability: 40,
        });

        const result = recommendUmbrella(weather);

        expect(result).toEqual({
            title: '준비물 추천',
            message:
                '비가 올 가능성이 있습니다. 장시간 외출한다면 우산을 준비하는 것이 좋습니다.',
            level: 'CAUTION',
        });
    });

    it('강수 확률이 40% 미만이고 비 예보가 없으면 우산 없이 외출 가능하다고 INFO로 안내한다', () => {
        const weather = createWeatherData({
            condition: 'CLEAR',
            precipitationProbability: 20,
        });

        const result = recommendUmbrella(weather);

        expect(result).toEqual({
            title: '준비물 추천',
            message: '강수 가능성이 낮습니다. 우산 없이 외출해도 괜찮을 가능성이 높습니다.',
            level: 'INFO',
        });
    });
});