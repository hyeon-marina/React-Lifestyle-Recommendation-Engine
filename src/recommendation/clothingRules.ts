import type { RecommendationResult, WeatherData } from '../types/weather';

export function recommendClothing(weather: WeatherData): RecommendationResult {
    const { feelsLike } = weather;

    if (feelsLike <= 0) {
        return {
            title: '옷차림 추천',
            message:
                '체감온도가 매우 낮습니다. 패딩, 목도리, 장갑 등 방한용품을 준비하는 것이 좋습니다.',
            level: 'WARNING',
        };
    }

    if (feelsLike <= 8) {
        return {
            title: '옷차림 추천',
            message: '쌀쌀한 날씨입니다. 두꺼운 외투나 코트를 추천합니다.',
            level: 'CAUTION',
        };
    }

    if (feelsLike <= 16) {
        return {
            title: '옷차림 추천',
            message: '가벼운 외투나 니트를 입기 적절한 날씨입니다.',
            level: 'INFO',
        };
    }

    if (feelsLike <= 23) {
        return {
            title: '옷차림 추천',
            message: '긴팔이나 얇은 겉옷 정도면 충분한 날씨입니다.',
            level: 'INFO',
        };
    }

    return {
        title: '옷차림 추천',
        message: '더운 날씨입니다. 반팔이나 얇은 옷차림을 추천합니다.',
        level: 'INFO',
    };
}