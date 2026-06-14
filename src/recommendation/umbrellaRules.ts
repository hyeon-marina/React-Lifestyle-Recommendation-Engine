import type { RecommendationResult, WeatherData } from '../types/weather';

export function recommendUmbrella(weather: WeatherData): RecommendationResult {
    const { precipitationProbability, condition } = weather;

    if (condition === 'RAIN') {
        return {
            title: '준비물 추천',
            message: '현재 비 예보가 있습니다. 외출 시 우산을 챙기는 것이 좋습니다.',
            level: 'WARNING',
        };
    }

    if (precipitationProbability >= 70) {
        return {
            title: '준비물 추천',
            message: '강수 확률이 높습니다. 우산을 챙기는 것을 추천합니다.',
            level: 'WARNING',
        };
    }

    if (precipitationProbability >= 40) {
        return {
            title: '준비물 추천',
            message:
                '비가 올 가능성이 있습니다. 장시간 외출한다면 우산을 준비하는 것이 좋습니다.',
            level: 'CAUTION',
        };
    }

    return {
        title: '준비물 추천',
        message: '강수 가능성이 낮습니다. 우산 없이 외출해도 괜찮을 가능성이 높습니다.',
        level: 'INFO',
    };
}