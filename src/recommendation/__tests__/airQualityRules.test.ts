import { describe, expect, it } from 'vitest';
import { recommendAirQualityAction } from '../airQualityRules';
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

describe('recommendAirQualityAction', () => {
    it('미세먼지 등급이 GOOD이면 야외활동 가능을 INFO로 안내한다', () => {
        const weather = createWeatherData({
            airQualityGrade: 'GOOD',
        });

        const result = recommendAirQualityAction(weather);

        expect(result).toEqual({
            title: '미세먼지 대응',
            message: '대기 상태가 좋습니다. 야외활동에 큰 무리가 없습니다.',
            level: 'INFO',
        });
    });

    it('미세먼지 등급이 NORMAL이면 민감군 주의를 INFO로 안내한다', () => {
        const weather = createWeatherData({
            airQualityGrade: 'NORMAL',
        });

        const result = recommendAirQualityAction(weather);

        expect(result).toEqual({
            title: '미세먼지 대응',
            message:
                '보통 수준의 대기 상태입니다. 민감군은 장시간 야외활동에 주의하는 것이 좋습니다.',
            level: 'INFO',
        });
    });

    it('미세먼지 등급이 BAD이면 야외활동 자제와 마스크 착용을 CAUTION으로 안내한다', () => {
        const weather = createWeatherData({
            airQualityGrade: 'BAD',
        });

        const result = recommendAirQualityAction(weather);

        expect(result).toEqual({
            title: '미세먼지 대응',
            message:
                '미세먼지 농도가 나쁩니다. 장시간 야외활동을 줄이고 마스크 착용을 권장합니다.',
            level: 'CAUTION',
        });
    });

    it('미세먼지 등급이 VERY_BAD이면 불필요한 외출 자제를 WARNING으로 안내한다', () => {
        const weather = createWeatherData({
            airQualityGrade: 'VERY_BAD',
        });

        const result = recommendAirQualityAction(weather);

        expect(result).toEqual({
            title: '미세먼지 대응',
            message: '미세먼지 농도가 매우 나쁩니다. 불필요한 외출은 줄이는 것이 좋습니다.',
            level: 'WARNING',
        });
    });

    it('미세먼지 등급이 UNKNOWN이면 정보를 확인할 수 없다고 INFO로 안내한다', () => {
        const weather = createWeatherData({
            airQualityGrade: 'UNKNOWN',
        });

        const result = recommendAirQualityAction(weather);

        expect(result).toEqual({
            title: '미세먼지 대응',
            message: '미세먼지 정보를 확인할 수 없습니다.',
            level: 'INFO',
        });
    });
});