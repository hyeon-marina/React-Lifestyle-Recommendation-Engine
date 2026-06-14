import type { RecommendationResult, WeatherData } from '../types/weather';

export function recommendAirQualityAction(
    weather: WeatherData,
): RecommendationResult {
    switch (weather.airQualityGrade) {
        case 'GOOD':
            return {
                title: '미세먼지 대응',
                message: '대기 상태가 좋습니다. 야외활동에 큰 무리가 없습니다.',
                level: 'INFO',
            };

        case 'NORMAL':
            return {
                title: '미세먼지 대응',
                message:
                    '보통 수준의 대기 상태입니다. 민감군은 장시간 야외활동에 주의하는 것이 좋습니다.',
                level: 'INFO',
            };

        case 'BAD':
            return {
                title: '미세먼지 대응',
                message:
                    '미세먼지 농도가 나쁩니다. 장시간 야외활동을 줄이고 마스크 착용을 권장합니다.',
                level: 'CAUTION',
            };

        case 'VERY_BAD':
            return {
                title: '미세먼지 대응',
                message:
                    '미세먼지 농도가 매우 나쁩니다. 불필요한 외출은 줄이는 것이 좋습니다.',
                level: 'WARNING',
            };

        default:
            return {
                title: '미세먼지 대응',
                message: '미세먼지 정보를 확인할 수 없습니다.',
                level: 'INFO',
            };
    }
}