export type WeatherCondition = 'CLEAR' | 'CLOUDS' | 'RAIN' | 'SNOW' | 'UNKNOWN';

export type AirQualityGrade = 'GOOD' | 'NORMAL' | 'BAD' | 'VERY_BAD' | 'UNKNOWN';

export interface WeatherData {
    temperature: number;
    feelsLike: number;
    precipitationProbability: number;
    condition: WeatherCondition;
    airQualityGrade: AirQualityGrade;
}

export interface RecommendationResult {
    title: string;
    message: string;
    level: 'INFO' | 'CAUTION' | 'WARNING';
}