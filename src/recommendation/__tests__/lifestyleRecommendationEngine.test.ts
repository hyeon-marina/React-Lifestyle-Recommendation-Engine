import { describe, expect, it } from 'vitest';
import { createLifestyleRecommendations } from '../lifestyleRecommendationEngine';
import type { WeatherData } from '../../types/weather';

describe('createLifestyleRecommendations', () => {
    it('옷차림, 우산, 미세먼지 추천 결과를 순서대로 반환한다', () => {
        const weather: WeatherData = {
            temperature: 5,
            feelsLike: 2,
            precipitationProbability: 70,
            condition: 'RAIN',
            airQualityGrade: 'BAD',
        };

        const results = createLifestyleRecommendations(weather);

        expect(results).toHaveLength(3);

        expect(results[0]).toEqual({
            title: '옷차림 추천',
            message: '쌀쌀한 날씨입니다. 두꺼운 외투나 코트를 추천합니다.',
            level: 'CAUTION',
        });

        expect(results[1]).toEqual({
            title: '준비물 추천',
            message: '현재 비 예보가 있습니다. 외출 시 우산을 챙기는 것이 좋습니다.',
            level: 'WARNING',
        });

        expect(results[2]).toEqual({
            title: '미세먼지 대응',
            message:
                '미세먼지 농도가 나쁩니다. 장시간 야외활동을 줄이고 마스크 착용을 권장합니다.',
            level: 'CAUTION',
        });
    });
});