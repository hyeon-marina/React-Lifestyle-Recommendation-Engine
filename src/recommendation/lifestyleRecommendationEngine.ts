import type { RecommendationResult, WeatherData } from '../types/weather';
import { recommendAirQualityAction } from './airQualityRules';
import { recommendClothing } from './clothingRules';
import { recommendUmbrella } from './umbrellaRules';

export function createLifestyleRecommendations(
    weather: WeatherData,
): RecommendationResult[] {
    return [
        recommendClothing(weather),
        recommendUmbrella(weather),
        recommendAirQualityAction(weather),
    ];
}